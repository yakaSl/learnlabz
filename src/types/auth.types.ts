
/**
 * Authentication Types for LearnLabz Platform
 * Comprehensive type definitions for JWT, users, roles, and permissions
 */

// ============================================================================
// USER ROLES (Based on FRD and Use Cases)
// ============================================================================

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  INSTITUTE_ADMIN = 'INSTITUTE_ADMIN',
  TEACHER = 'TEACHER',
  TEACHER_ASSISTANT = 'TEACHER_ASSISTANT',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  COORDINATOR = 'COORDINATOR',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

// ============================================================================
// PERMISSION SYSTEM
// ============================================================================

export enum Permission {
  // Institute Management
  INSTITUTE_CREATE = 'institute:create',
  INSTITUTE_READ = 'institute:read',
  INSTITUTE_UPDATE = 'institute:update',
  INSTITUTE_DELETE = 'institute:delete',
  INSTITUTE_APPROVE = 'institute:approve',
  
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_IMPERSONATE = 'user:impersonate',
  
  // Class Management
  CLASS_CREATE = 'class:create',
  CLASS_READ = 'class:read',
  CLASS_UPDATE = 'class:update',
  CLASS_DELETE = 'class:delete',
  CLASS_ENROLL = 'class:enroll',
  
  // Financial Operations
  PAYMENT_VIEW = 'payment:view',
  PAYMENT_PROCESS = 'payment:process',
  PAYMENT_REFUND = 'payment:refund',
  INVOICE_GENERATE = 'invoice:generate',
  FINANCIAL_REPORTS = 'financial:reports',
  
  // Content Management
  CONTENT_CREATE = 'content:create',
  CONTENT_UPDATE = 'content:update',
  CONTENT_DELETE = 'content:delete',
  
  // Analytics & Reports
  ANALYTICS_VIEW = 'analytics:view',
  REPORTS_GENERATE = 'reports:generate',
  
  // Communication
  MESSAGE_SEND = 'message:send',
  ANNOUNCEMENT_CREATE = 'announcement:create',
  
  // System Settings
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_UPDATE = 'settings:update',
  WHITE_LABEL_MANAGE = 'whitelabel:manage',
  
  // AI Features
  AI_CONFIGURE = 'ai:configure',
  AI_USE = 'ai:use',
}

// Role-Permission Mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
  
  [UserRole.INSTITUTE_ADMIN]: [
    Permission.INSTITUTE_READ,
    Permission.INSTITUTE_UPDATE,
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.CLASS_CREATE,
    Permission.CLASS_READ,
    Permission.CLASS_UPDATE,
    Permission.CLASS_DELETE,
    Permission.CLASS_ENROLL,
    Permission.PAYMENT_VIEW,
    Permission.PAYMENT_PROCESS,
    Permission.INVOICE_GENERATE,
    Permission.FINANCIAL_REPORTS,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_UPDATE,
    Permission.CONTENT_DELETE,
    Permission.ANALYTICS_VIEW,
    Permission.REPORTS_GENERATE,
    Permission.MESSAGE_SEND,
    Permission.ANNOUNCEMENT_CREATE,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_UPDATE,
    Permission.WHITE_LABEL_MANAGE,
    Permission.AI_CONFIGURE,
    Permission.AI_USE,
  ],
  
  [UserRole.TEACHER]: [
    Permission.CLASS_READ,
    Permission.CLASS_UPDATE,
    Permission.USER_READ,
    Permission.CONTENT_CREATE,
    Permission.CONTENT_UPDATE,
    Permission.MESSAGE_SEND,
    Permission.ANALYTICS_VIEW,
    Permission.AI_USE,
  ],

  [UserRole.TEACHER_ASSISTANT]: [
    Permission.CLASS_READ,
    Permission.USER_READ,
    Permission.CONTENT_UPDATE, // For marking attendance
  ],
  
  [UserRole.BRANCH_MANAGER]: [
    Permission.CLASS_READ,
    Permission.CLASS_CREATE,
    Permission.CLASS_UPDATE,
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.ANALYTICS_VIEW,
    Permission.REPORTS_GENERATE,
    Permission.MESSAGE_SEND,
    Permission.ANNOUNCEMENT_CREATE,
  ],
  
  [UserRole.ACCOUNTANT]: [
    Permission.PAYMENT_VIEW,
    Permission.PAYMENT_PROCESS,
    Permission.PAYMENT_REFUND,
    Permission.INVOICE_GENERATE,
    Permission.FINANCIAL_REPORTS,
    Permission.USER_READ,
  ],
  
  [UserRole.COORDINATOR]: [
    Permission.CLASS_READ,
    Permission.USER_READ,
    Permission.MESSAGE_SEND,
    Permission.ANNOUNCEMENT_CREATE,
    Permission.ANALYTICS_VIEW,
  ],
  
  [UserRole.STUDENT]: [
    Permission.CLASS_READ,
    Permission.CONTENT_UPDATE,
    Permission.MESSAGE_SEND,
    Permission.AI_USE,
  ],
  
  [UserRole.PARENT]: [
    Permission.USER_READ,
    Permission.CLASS_READ,
    Permission.ANALYTICS_VIEW,
    Permission.MESSAGE_SEND,
    Permission.PAYMENT_VIEW,
  ]
};

// ============================================================================
// USER INTERFACE
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  instituteId?: string;
  branchId?: string;
  avatar?: string;
  phone?: string;
  
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  
  isActive: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
  
  createdAt: Date;
  updatedAt: Date;
  
  globalStudentId?: string;
  childrenIds?: string[];
}

// ============================================================================
// JWT TOKEN INTERFACES
// ============================================================================

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  instituteId?: string;
  branchId?: string;
  permissions: Permission[];
  
  iat: number;
  exp: number;
  sessionId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================================================
// AUTHENTICATION REQUEST/RESPONSE TYPES
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
  requiresTwoFactor?: boolean;
  twoFactorSessionId?: string;
}

export interface TwoFactorRequest {
  sessionId: string;
  code: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  instituteId?: string;
}

export interface RegisterResponse {
  user: User;
  tokens: TokenPair;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// ============================================================================
// 2FA TYPES
// ============================================================================

export interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

export interface Session {
  id: string;
  userId: string;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  createdAt: Date;
  lastActivity: Date;
}

// ============================================================================
// AUTH CONTEXT
// ============================================================================

export interface AuthContextType {
  user: User | null;
  isInitialized: boolean;
  
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  
  verifyTwoFactor: (data: TwoFactorRequest) => Promise<LoginResponse>;
  setup2FA: () => Promise<TwoFactorSetupResponse>;
  disable2FA: () => Promise<void>;
  
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (data: ResetPasswordConfirmRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  
  refreshToken: () => Promise<void>;
  getSessions: () => Promise<Session[]>;
  revokeSession: (sessionId: string) => Promise<void>;
  
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AuthError;
}

// ============================================================================
// ROUTE PROTECTION
// ============================================================================

export interface RouteProtection {
  requiresAuth: boolean;
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
  requireAllPermissions?: boolean;
}

// ============================================================================
// PASSWORD VALIDATION
// ============================================================================

export interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}

export const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

    
