/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordConfirmRequest,
  ChangePasswordRequest,
  RefreshTokenRequest,
  VerifyEmailRequest,
  TwoFactorRequest,
  TwoFactorSetupResponse,
  TwoFactorVerifyRequest,
  Session,
  TokenPair,
  User,
  ApiResponse,
} from '@/types/auth.types';

// ============================================================================
// API CONFIGURATION
// ============================================================================

const AUTH_ENDPOINTS = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refreshToken: '/api/auth/refresh',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
  changePassword: '/api/auth/change-password',
  verifyEmail: '/api/auth/verify-email',
  resendVerification: '/api/auth/resend-verification',
  
  // 2FA endpoints
  setup2FA: '/api/auth/2fa/setup',
  verify2FA: '/api/auth/2fa/verify',
  disable2FA: '/api/auth/2fa/disable',
  
  // Session management
  sessions: '/api/auth/sessions',
  revokeSession: '/api/auth/sessions/revoke',
  
  // Social auth
  googleLogin: '/api/auth/google',
  facebookLogin: '/api/auth/facebook',
  
  // User info
  me: '/api/auth/me',
};

// ============================================================================
// API CLIENT
// ============================================================================

class ApiClient {
  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Important for cookies
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
          },
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Failed to connect to the server',
          details: { originalError: error },
        },
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: unknown, headers?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: unknown, headers?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

const apiClient = new ApiClient();

// ============================================================================
// AUTHENTICATION SERVICE
// ============================================================================

export class AuthService {
  /**
   * Login with email and password
   */
  static async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(AUTH_ENDPOINTS.login, credentials);
  }

  /**
   * Login with Google OAuth
   */
  static async loginWithGoogle(): Promise<ApiResponse<LoginResponse>> {
    // Redirect to Google OAuth endpoint
    // The backend will handle the OAuth flow and redirect back
    window.location.href = AUTH_ENDPOINTS.googleLogin;
    
    // Return a pending promise that will never resolve
    // The page will redirect before this matters
    return new Promise(() => {});
  }

  /**
   * Login with Facebook OAuth
   */
  static async loginWithFacebook(): Promise<ApiResponse<LoginResponse>> {
    // Redirect to Facebook OAuth endpoint
    window.location.href = AUTH_ENDPOINTS.facebookLogin;
    
    return new Promise(() => {});
  }

  /**
   * Verify 2FA code
   */
  static async verifyTwoFactor(data: TwoFactorRequest): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(AUTH_ENDPOINTS.verify2FA, data);
  }

  /**
   * Register new user
   */
  static async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<RegisterResponse>(AUTH_ENDPOINTS.register, data);
  }

  /**
   * Logout user
   */
  static async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.logout);
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(): Promise<ApiResponse<TokenPair>> {
    return apiClient.post<TokenPair>(AUTH_ENDPOINTS.refreshToken);
  }

  /**
   * Request password reset
   */
  static async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.forgotPassword, { email });
  }

  /**
   * Reset password with token
   */
  static async resetPassword(data: ResetPasswordConfirmRequest): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.resetPassword, data);
  }

  /**
   * Change password (authenticated user)
   */
  static async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.changePassword, data);
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.verifyEmail, { token });
  }

  /**
   * Resend email verification
   */
  static async resendVerification(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.resendVerification);
  }

  /**
   * Setup 2FA for user account
   */
  static async setup2FA(): Promise<ApiResponse<TwoFactorSetupResponse>> {
    return apiClient.post<TwoFactorSetupResponse>(AUTH_ENDPOINTS.setup2FA);
  }

  /**
   * Verify 2FA setup with code
   */
  static async verify2FASetup(data: TwoFactorVerifyRequest): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${AUTH_ENDPOINTS.setup2FA}/verify`, data);
  }

  /**
   * Disable 2FA
   */
  static async disable2FA(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.disable2FA);
  }

  /**
   * Get current user info
   */
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(AUTH_ENDPOINTS.me);
  }

  /**
   * Get active sessions
   */
  static async getSessions(): Promise<ApiResponse<Session[]>> {
    return apiClient.get<Session[]>(AUTH_ENDPOINTS.sessions);
  }

  /**
   * Revoke a specific session
   */
  static async revokeSession(sessionId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${AUTH_ENDPOINTS.revokeSession}/${sessionId}`);
  }

  /**
   * Check if user is authenticated (client-side check)
   */
  static isAuthenticated(): boolean {
    // Check if access token exists in cookies
    // This is a basic check - full verification happens on the server
    if (typeof document === 'undefined') return false;
    
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith('auth_token='));
  }
}

// ============================================================================
// ERROR HANDLING HELPER
// ============================================================================

export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'No account found with this email',
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
    INVALID_TOKEN: 'Invalid or expired token',
    INVALID_2FA_CODE: 'Invalid authentication code',
    ACCOUNT_BLOCKED: 'Your account has been blocked. Please contact support.',
    EMAIL_NOT_VERIFIED: 'Please verify your email address',
    PASSWORD_TOO_WEAK: 'Password does not meet security requirements',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  };

  return errorMessages[errorCode] || errorMessages.UNKNOWN_ERROR;
}

// ============================================================================
// EXPORT
// ============================================================================

export default AuthService;
