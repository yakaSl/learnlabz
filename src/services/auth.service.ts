/**
 * Authentication Service (Real Backend Integration)
 * Handles all authentication-related API calls with backend
 */

import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type {
  BackendLoginRequest,
  BackendLoginResponse,
  BackendRefreshTokenRequest,
  BackendRefreshTokenResponse,
  BackendLogoutRequest,
  ApiResponse,
  isApiSuccess,
} from '@/types/api.types';
import type {
  User,
  TokenPair,
  Session,
} from '@/types/auth.types';
import { AUTH_CONFIG } from '@/app/lib/auth';

// =============================================================================
// TYPE CONVERSIONS
// =============================================================================

/**
 * Convert backend login response to frontend user format
 * Handles new backend structure with primary_role and available_institutes
 */
function convertBackendLoginToUser(loginResponse: BackendLoginResponse): User {
  const { user, primary_role, available_institutes, has_global_access } = loginResponse;

  // Map backend role to frontend UserRole
  const role = primary_role.category_code as any;

  // Get first institute ID if available
  const instituteId = available_institutes?.[0]?.institute_id;

  return {
    id: user.id,
    username: user.username,
    personId: user.personId,
    email: user.email || `${user.username}@learnlabz.com`,
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    middleName: user.middle_name || undefined,
    role,

    // Role & Access Information
    primaryRole: {
      categoryCode: role,
      categoryName: primary_role.category_name,
      isGlobal: primary_role.is_global,
    },
    availableInstitutes: available_institutes?.map((inst) => ({
      instituteId: inst.institute_id,
      instituteName: inst.institute_name,
      instituteCode: inst.institute_code,
      roleCodes: inst.role_codes,
    })),
    hasGlobalAccess: has_global_access,

    // Institute & Branch
    instituteId,
    branchId: undefined,

    // Profile
    avatar: undefined,
    phone: user.phone,

    // Status
    emailVerified: false,
    twoFactorEnabled: false,
    isActive: true,
    isBlocked: false,
    lastLogin: undefined,

    // Timestamps
    createdAt: new Date(),
    updatedAt: new Date(),

    // Additional
    globalStudentId: undefined,
    childrenIds: undefined,
  };
}

/**
 * Convert backend tokens to frontend token pair
 */
function convertBackendTokensToTokenPair(backendResponse: BackendLoginResponse): TokenPair {
  return {
    accessToken: backendResponse.access_token,
    refreshToken: backendResponse.refresh_token,
    expiresIn: backendResponse.expires_in,
  };
}

// =============================================================================
// API ENDPOINTS
// =============================================================================

const AUTH_ENDPOINTS = {
  login: '/user/auth/login',
  logout: '/user/auth/logout',
  refreshToken: '/user/auth/refresh',
  me: '/user/auth/me',
  register: '/user/auth/register',
  forgotPassword: '/user/auth/forgot-password',
  resetPassword: '/user/auth/reset-password',
  changePassword: '/user/auth/change-password',
  verifyEmail: '/user/auth/verify-email',
  resendVerification: '/user/auth/resend-verification',

  // 2FA endpoints
  setup2FA: '/user/auth/2fa/setup',
  verify2FA: '/user/auth/2fa/verify',
  disable2FA: '/user/auth/2fa/disable',

  // Session management
  sessions: '/user/auth/sessions',
  revokeSession: '/user/auth/sessions/revoke',
};

// =============================================================================
// COOKIE MANAGEMENT
// =============================================================================

class CookieManager {
  /**
   * Set cookie
   */
  static set(name: string, value: string, maxAge: number) {
    if (typeof window === 'undefined') return;

    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; expires=${expires}; SameSite=Lax`;

    logger.debug(`Cookie set: ${name}`, { maxAge });
  }

  /**
   * Get cookie
   */
  static get(name: string): string | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    return cookies[name] || null;
  }

  /**
   * Delete cookie
   */
  static delete(name: string) {
    if (typeof window === 'undefined') return;

    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`;
    logger.debug(`Cookie deleted: ${name}`);
  }

  /**
   * Get all cookies
   */
  static getAll(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    return document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
  }
}

// =============================================================================
// AUTHENTICATION SERVICE
// =============================================================================

export class AuthService {
  /**
   * Login with username/email and password
   */
  static async login(username: string, password: string): Promise<{
    success: boolean;
    user?: User;
    tokens?: TokenPair;
    error?: string;
  }> {
    try {
      logger.auth('Login attempt', { username });

      const requestBody: BackendLoginRequest = {
        data: {
          username,
          password,
        },
      };

      const response = await apiClient.post<BackendLoginResponse>(
        AUTH_ENDPOINTS.login,
        requestBody,
        { skipAuth: true } // Don't include auth token for login
      );

      if (!response.success) {
        logger.auth('Login failed', { error: response.error });
        return {
          success: false,
          error: response.error?.message || 'Login failed',
        };
      }

      const loginData = response.data;

      // Convert backend response to frontend user
      const user = convertBackendLoginToUser(loginData);
      const tokens = convertBackendTokensToTokenPair(loginData);

      // Store tokens in cookies
      CookieManager.set(AUTH_CONFIG.cookies.accessToken, tokens.accessToken, tokens.expiresIn);
      CookieManager.set(
        AUTH_CONFIG.cookies.refreshToken,
        tokens.refreshToken,
        7 * 24 * 60 * 60 // 7 days
      );

      // Store user role in cookie for middleware routing
      CookieManager.set('userRole', user.role, tokens.expiresIn);

      logger.auth('Login successful', {
        userId: user.id,
        role: user.role,
        primaryRole: user.primaryRole.categoryCode,
        hasGlobalAccess: user.hasGlobalAccess,
      });

      return {
        success: true,
        user,
        tokens,
      };
    } catch (error) {
      logger.error('Login error', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      const refreshToken = CookieManager.get(AUTH_CONFIG.cookies.refreshToken);

      if (refreshToken) {
        const requestBody: BackendLogoutRequest = {
          data: { refresh_token: refreshToken },
        };

        await apiClient.post(AUTH_ENDPOINTS.logout, requestBody);
      }

      this.clearTokens();
      logger.auth('Logout successful');
    } catch (error) {
      logger.error('Logout error', { error });
      this.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<{
    success: boolean;
    tokens?: TokenPair;
    error?: string;
  }> {
    try {
      const refreshToken = CookieManager.get(AUTH_CONFIG.cookies.refreshToken);

      if (!refreshToken) {
        return {
          success: false,
          error: 'No refresh token available',
        };
      }

      const requestBody: BackendRefreshTokenRequest = {
        data: { refresh_token: refreshToken },
      };

      const response = await apiClient.post<BackendRefreshTokenResponse>(
        AUTH_ENDPOINTS.refreshToken,
        requestBody,
        { skipAuth: true }
      );

      if (!response.success) {
        return {
          success: false,
          error: response.error?.message || 'Token refresh failed',
        };
      }

      const tokens: TokenPair = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };

      // Update cookies
      CookieManager.set(AUTH_CONFIG.cookies.accessToken, tokens.accessToken, tokens.expiresIn);
      CookieManager.set(
        AUTH_CONFIG.cookies.refreshToken,
        tokens.refreshToken,
        7 * 24 * 60 * 60
      );

      logger.auth('Token refreshed successfully');

      return {
        success: true,
        tokens,
      };
    } catch (error) {
      logger.error('Token refresh error', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed',
      };
    }
  }

  /**
   * Get current user info
   */
  static async getCurrentUser(): Promise<{
    success: boolean;
    user?: User;
    error?: string;
  }> {
    try {
      const response = await apiClient.get<BackendLoginResponse>(AUTH_ENDPOINTS.me);

      if (!response.success) {
        return {
          success: false,
          error: response.error?.message || 'Failed to get user info',
        };
      }

      // Assuming /me endpoint returns same structure as login
      // If it returns different structure, we'll need to handle it accordingly
      const user = convertBackendLoginToUser(response.data);

      return {
        success: true,
        user,
      };
    } catch (error) {
      logger.error('Get current user error', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user info',
      };
    }
  }

  /**
   * Check if user has auth token
   */
  static hasAuthToken(): boolean {
    const token = CookieManager.get(AUTH_CONFIG.cookies.accessToken);
    logger.debug('Checking auth token', { hasToken: !!token });
    return !!token;
  }

  /**
   * Clear authentication tokens
   */
  static clearTokens(): void {
    CookieManager.delete(AUTH_CONFIG.cookies.accessToken);
    CookieManager.delete(AUTH_CONFIG.cookies.refreshToken);
    CookieManager.delete('userRole');
    logger.auth('Tokens cleared');
  }

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    return CookieManager.get(AUTH_CONFIG.cookies.accessToken);
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    return CookieManager.get(AUTH_CONFIG.cookies.refreshToken);
  }
}

// =============================================================================
// EXPORT
// =============================================================================

export default AuthService;
