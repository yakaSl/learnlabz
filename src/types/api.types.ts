/**
 * Backend API Types
 * Type definitions matching the backend API responses
 */

// =============================================================================
// STANDARD API RESPONSE WRAPPER
// =============================================================================

export interface ApiResponseMetadata {
  requestId: string;
  version: string;
  processingTime: number;
  timestamp?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  totalCount?: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;
  timestamp: string;
  metadata: ApiResponseMetadata;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    field?: string;
  };
  timestamp: string;
  metadata?: ApiResponseMetadata;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// =============================================================================
// AUTHENTICATION API TYPES
// =============================================================================

/**
 * Backend Login Request
 * Matches: POST /user/auth/login
 */
export interface BackendLoginRequest {
  data: {
    username: string; // Can be username or email
    password: string;
  };
}

/**
 * Backend User Response
 */
export interface BackendUser {
  id: string;
  username: string;
  personId: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  email?: string;
  phone?: string;
}

/**
 * Primary Role Information
 */
export interface PrimaryRole {
  category_code: 'SUPER_ADMIN' | 'INSTITUTE' | 'TEACHER' | 'PARENT' | 'STUDENT';
  category_name: string;
  is_global: boolean;
}

/**
 * Institute Type Metadata
 */
export interface MetaInstituteType {
  id: string;
  name: string;
  code: 'INSTITUTE' | 'INDIVIDUAL';
  description: string;
}

/**
 * Available Institute Information
 */
export interface AvailableInstitute {
  institute_id: string;
  institute_name: string;
  institute_code: string;
  role_codes: string[];
  meta_institute_type: MetaInstituteType;
}

/**
 * Backend Login Response
 * Matches the NEW API response structure with primary_role
 */
export interface BackendLoginResponse {
  user: BackendUser;
  primary_role: PrimaryRole;
  available_institutes: AvailableInstitute[] | null;
  has_global_access: boolean;
  access_token: string;
  refresh_token: string;
  expires_in: number; // in seconds
  token_type: 'Bearer';
}

/**
 * Token Refresh Request
 */
export interface BackendRefreshTokenRequest {
  data: {
    refresh_token: string;
  };
}

/**
 * Token Refresh Response
 */
export interface BackendRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

/**
 * Logout Request
 */
export interface BackendLogoutRequest {
  data: {
    refresh_token: string;
  };
}

// =============================================================================
// ERROR CODES
// =============================================================================

export enum ApiErrorCode {
  // Authentication Errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Authorization Errors
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // User Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_DISABLED = 'USER_DISABLED',
  USER_BLOCKED = 'USER_BLOCKED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',

  // 2FA Errors
  REQUIRES_2FA = 'REQUIRES_2FA',
  INVALID_2FA_CODE = 'INVALID_2FA_CODE',

  // Network Errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',

  // Server Errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  BAD_GATEWAY = 'BAD_GATEWAY',

  // Unknown
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// =============================================================================
// REQUEST/RESPONSE HELPERS
// =============================================================================

/**
 * Type guard for API success response
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * Type guard for API error response
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiErrorResponse {
  return response.success === false;
}

/**
 * Extract error message from API response
 */
export function getErrorMessage(response: ApiErrorResponse): string {
  return response.error.message || 'An unexpected error occurred';
}

/**
 * Extract error code from API response
 */
export function getErrorCode(response: ApiErrorResponse): string {
  return response.error.code || ApiErrorCode.UNKNOWN_ERROR;
}
