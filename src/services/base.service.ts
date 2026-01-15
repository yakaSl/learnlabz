/**
 * Base API Service
 * Provides common API methods with error handling and logging
 */

import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';

export interface ApiServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class BaseApiService {
  /**
   * Generic GET request
   */
  protected static async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    context?: string
  ): Promise<ApiServiceResponse<T>> {
    try {
      const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : '';

      logger.debug(`API GET: ${endpoint}`, { params, context });

      const response = await apiClient.get<T>(`${endpoint}${queryString}`);

      if (!response.success) {
        logger.error(`API GET failed: ${endpoint}`, { error: response.error, context });
        return {
          success: false,
          error: response.error?.message || 'Request failed',
        };
      }

      logger.debug(`API GET success: ${endpoint}`, { context });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error(`API GET error: ${endpoint}`, { error, context });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
      };
    }
  }

  /**
   * Generic POST request
   */
  protected static async post<T>(
    endpoint: string,
    data?: any,
    options?: { skipAuth?: boolean },
    context?: string
  ): Promise<ApiServiceResponse<T>> {
    try {
      logger.debug(`API POST: ${endpoint}`, { context });

      const response = await apiClient.post<T>(endpoint, data, options);

      if (!response.success) {
        logger.error(`API POST failed: ${endpoint}`, { error: response.error, context });
        return {
          success: false,
          error: response.error?.message || 'Request failed',
        };
      }

      logger.debug(`API POST success: ${endpoint}`, { context });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error(`API POST error: ${endpoint}`, { error, context });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
      };
    }
  }

  /**
   * Generic PUT request
   */
  protected static async put<T>(
    endpoint: string,
    data?: any,
    context?: string
  ): Promise<ApiServiceResponse<T>> {
    try {
      logger.debug(`API PUT: ${endpoint}`, { context });

      const response = await apiClient.put<T>(endpoint, data);

      if (!response.success) {
        logger.error(`API PUT failed: ${endpoint}`, { error: response.error, context });
        return {
          success: false,
          error: response.error?.message || 'Request failed',
        };
      }

      logger.debug(`API PUT success: ${endpoint}`, { context });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error(`API PUT error: ${endpoint}`, { error, context });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
      };
    }
  }

  /**
   * Generic DELETE request
   */
  protected static async delete<T>(
    endpoint: string,
    context?: string
  ): Promise<ApiServiceResponse<T>> {
    try {
      logger.debug(`API DELETE: ${endpoint}`, { context });

      const response = await apiClient.delete<T>(endpoint);

      if (!response.success) {
        logger.error(`API DELETE failed: ${endpoint}`, { error: response.error, context });
        return {
          success: false,
          error: response.error?.message || 'Request failed',
        };
      }

      logger.debug(`API DELETE success: ${endpoint}`, { context });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      logger.error(`API DELETE error: ${endpoint}`, { error, context });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request failed',
      };
    }
  }
}
