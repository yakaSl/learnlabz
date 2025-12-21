/**
 * API Client
 * Centralized HTTP client with interceptors, error handling, and retry logic
 */

import { config } from '@/config/env.config';
import type {
  ApiResponse,
  ApiErrorResponse,
  ApiErrorCode,
} from '@/types/api.types';

// =============================================================================
// TYPES
// =============================================================================

export interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  skipAuth?: boolean;
}

export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
}

// =============================================================================
// REQUEST/RESPONSE INTERCEPTORS
// =============================================================================

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: Error) => Error | Promise<Error>;

class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  useRequest(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index > -1) this.requestInterceptors.splice(index, 1);
    };
  }

  useResponse(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index > -1) this.responseInterceptors.splice(index, 1);
    };
  }

  useError(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
    return () => {
      const index = this.errorInterceptors.indexOf(interceptor);
      if (index > -1) this.errorInterceptors.splice(index, 1);
    };
  }

  async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let modifiedConfig = config;
    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  async applyResponseInterceptors(response: Response): Promise<Response> {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  async applyErrorInterceptors(error: Error): Promise<Error> {
    let modifiedError = error;
    for (const interceptor of this.errorInterceptors) {
      modifiedError = await interceptor(modifiedError);
    }
    return modifiedError;
  }
}

// =============================================================================
// API CLIENT CLASS
// =============================================================================

export class ApiClient {
  private config: ApiClientConfig;
  private interceptors: InterceptorManager;

  constructor(config?: Partial<ApiClientConfig>) {
    this.config = {
      baseURL: config?.baseURL || '',
      timeout: config?.timeout || 30000,
      retries: config?.retries || 3,
      retryDelay: config?.retryDelay || 1000,
    };

    this.interceptors = new InterceptorManager();
    this.setupDefaultInterceptors();
  }

  /**
   * Setup default interceptors
   */
  private setupDefaultInterceptors() {
    // Add auth token to requests
    this.interceptors.useRequest(async (config) => {
      if (!config.skipAuth) {
        const token = this.getAccessToken();
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
      return config;
    });

    // Add default headers
    this.interceptors.useRequest((config) => {
      config.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config.headers,
      };
      return config;
    });

    // Log requests in development
    if (config.logging.debug) {
      this.interceptors.useRequest((config) => {
        console.log('📤 API Request:', {
          method: config.method,
          url: config.headers instanceof Headers ? 'hidden' : config,
        });
        return config;
      });

      this.interceptors.useResponse((response) => {
        console.log('📥 API Response:', {
          status: response.status,
          url: response.url,
        });
        return response;
      });
    }
  }

  /**
   * Get access token from cookies
   */
  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    return cookies['accessToken'] || null;
  }

  /**
   * Make HTTP request with retry logic
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const maxRetries = config.retries ?? this.config.retries;
    const retryDelay = config.retryDelay ?? this.config.retryDelay;
    const timeout = config.timeout ?? this.config.timeout;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // Apply request interceptors
        const modifiedConfig = await this.interceptors.applyRequestInterceptors(config);

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        // Make the request with CORS configuration
        const response = await fetch(url, {
          ...modifiedConfig,
          signal: controller.signal,
          mode: 'cors', // Enable CORS
          credentials: 'include', // Include cookies for cross-origin requests
        });

        clearTimeout(timeoutId);

        // Apply response interceptors
        const modifiedResponse = await this.interceptors.applyResponseInterceptors(response);

        // Parse response
        const data = await modifiedResponse.json();

        // Handle non-OK responses
        if (!modifiedResponse.ok) {
          const errorResponse: ApiErrorResponse = {
            success: false,
            error: {
              code: data.error?.code || `HTTP_${modifiedResponse.status}`,
              message: data.error?.message || modifiedResponse.statusText,
              details: data.error?.details,
            },
            timestamp: data.timestamp || new Date().toISOString(),
            metadata: data.metadata,
          };
          return errorResponse;
        }

        // Return successful response
        return data as ApiResponse<T>;
      } catch (error) {
        lastError = error as Error;

        // Apply error interceptors
        const modifiedError = await this.interceptors.applyErrorInterceptors(lastError);

        // Don't retry on certain errors
        if (modifiedError.name === 'AbortError') {
          return this.createErrorResponse('TIMEOUT', 'Request timeout');
        }

        // Retry logic
        if (attempt < maxRetries) {
          console.warn(`🔄 Retry attempt ${attempt + 1}/${maxRetries} for ${endpoint}`);
          await this.delay(retryDelay * (attempt + 1)); // Exponential backoff
          continue;
        }

        // Max retries exceeded
        return this.createErrorResponse(
          'NETWORK_ERROR',
          modifiedError.message || 'Failed to connect to the server'
        );
      }
    }

    // This should never be reached, but TypeScript needs it
    return this.createErrorResponse(
      'UNKNOWN_ERROR',
      lastError?.message || 'An unexpected error occurred'
    );
  }

  /**
   * Create error response
   */
  private createErrorResponse(code: string, message: string): ApiErrorResponse {
    return {
      success: false,
      error: {
        code,
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'DELETE',
    });
  }

  /**
   * Expose interceptors for external use
   */
  get interceptor() {
    return {
      request: this.interceptors.useRequest.bind(this.interceptors),
      response: this.interceptors.useResponse.bind(this.interceptors),
      error: this.interceptors.useError.bind(this.interceptors),
    };
  }
}

// =============================================================================
// DEFAULT CLIENT INSTANCE
// =============================================================================

export const apiClient = new ApiClient({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  retries: config.api.retryAttempts,
});

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) => apiClient.get<T>(endpoint, config),
  post: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiClient.post<T>(endpoint, data, config),
  put: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiClient.put<T>(endpoint, data, config),
  patch: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiClient.patch<T>(endpoint, data, config),
  delete: <T>(endpoint: string, config?: RequestConfig) => apiClient.delete<T>(endpoint, config),
};

export default apiClient;
