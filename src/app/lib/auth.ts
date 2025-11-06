/**
 * Authentication Library
 * Core utilities for JWT handling, token management, and security
 */

import { SignJWT, jwtVerify } from "jose";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import {
  JWTPayload,
  TokenPair,
  User,
  ROLE_PERMISSIONS,
  Permission,
  PasswordStrength,
  PasswordRequirements,
  DEFAULT_PASSWORD_REQUIREMENTS,
} from "@/types/auth.types";

// ============================================================================
// CONFIGURATION
// ============================================================================

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
);

const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ||
    "your-super-secret-refresh-key-change-in-production"
);

export const AUTH_CONFIG = {
  accessTokenExpiry: "15m", // 15 minutes
  refreshTokenExpiry: "7d", // 7 days
  rememberMeExpiry: "30d", // 30 days
  twoFactorSessionExpiry: "5m", // 5 minutes for 2FA

  cookies: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  },

  paths: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    twoFactor: "/two-factor",
  },
};

// ============================================================================
// JWT TOKEN GENERATION
// ============================================================================

/**
 * Generate Access Token (short-lived)
 */
export async function generateAccessToken(
  user: User,
  sessionId: string,
  expiresIn: string = AUTH_CONFIG.accessTokenExpiry
): Promise<string> {
  const permissions = ROLE_PERMISSIONS[user.role] || [];

  const payload: Omit<JWTPayload, "iat" | "exp"> = {
    userId: user.id,
    email: user.email,
    role: user.role,
    instituteId: user.instituteId,
    branchId: user.branchId,
    permissions,
    sessionId,
  };

  const token = await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Generate Refresh Token (long-lived)
 */
export async function generateRefreshToken(
  userId: string,
  sessionId: string,
  expiresIn: string = AUTH_CONFIG.refreshTokenExpiry
): Promise<string> {
  const token = await new SignJWT({ userId, sessionId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_REFRESH_SECRET);

  return token;
}

/**
 * Generate Token Pair
 */
export async function generateTokenPair(p: {
  user: User;
  sessionId: string;
  remember: boolean;
}): Promise<TokenPair> {
  const accessTokenExpiry = AUTH_CONFIG.accessTokenExpiry;
  const refreshTokenExpiry = p.remember
    ? AUTH_CONFIG.rememberMeExpiry
    : AUTH_CONFIG.refreshTokenExpiry;

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(p.user, p.sessionId, accessTokenExpiry),
    generateRefreshToken(p.user.id, p.sessionId, refreshTokenExpiry),
  ]);

  return {
    accessToken,
    refreshToken,
    expiresIn: parseExpiryToSeconds(accessTokenExpiry),
  };
}

/**
 * Generate temporary 2FA session token
 */
export async function generate2FASessionToken(
  userId: string,
  email: string
): Promise<string> {
  const token = await new SignJWT({ userId, email, purpose: "2fa" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(AUTH_CONFIG.twoFactorSessionExpiry)
    .sign(JWT_SECRET);

  return token;
}

// ============================================================================
// JWT TOKEN VERIFICATION
// ============================================================================

/**
 * Verify Access Token
 */
export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
}

/**
 * Verify Refresh Token
 */
export async function verifyRefreshToken(
  token: string
): Promise<{ userId: string; sessionId: string }> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as { userId: string; sessionId: string };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
}

/**
 * Verify 2FA Session Token
 */
export async function verify2FASessionToken(
  token: string
): Promise<{ userId: string; email: string }> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (payload.purpose !== "2fa") {
      throw new Error("Invalid 2FA token");
    }

    return payload as { userId: string; email: string };
  } catch (error) {
    throw new Error("Invalid or expired 2FA session");
  }
}

// ============================================================================
// COOKIE MANAGEMENT
// ============================================================================

/**
 * Set authentication cookies
 */
export function setAuthCookies(ctx: any, tokens: TokenPair) {
  const accessTokenMaxAge = tokens.expiresIn;
  const refreshTokenMaxAge = parseExpiryToSeconds(
    AUTH_CONFIG.refreshTokenExpiry
  );

  // setCookie(ctx, AUTH_CONFIG.cookies.accessToken, tokens.accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: accessTokenMaxAge,
  //   path: "/",
  // });

  // setCookie(ctx, AUTH_CONFIG.cookies.refreshToken, tokens.refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: refreshTokenMaxAge,
  //   path: "/",
  // });
  ctx.cookies.set({
    name: AUTH_CONFIG.cookies.accessToken,
    value: tokens.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days or 1 day
    path: "/",
  });

  ctx.cookies.set({
    name: AUTH_CONFIG.cookies.refreshToken,
    value: tokens.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
}

/**
 * Get access token from cookies
 */
export function getAccessToken(ctx: any): string | null {
  const cookies = parseCookies(ctx);
  return cookies[AUTH_CONFIG.cookies.accessToken] || null;
}

/**
 * Get refresh token from cookies
 */
export function getRefreshToken(ctx: any): string | null {
  const cookies = parseCookies(ctx);
  return cookies[AUTH_CONFIG.cookies.refreshToken] || null;
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(ctx: any) {
  destroyCookie(ctx, AUTH_CONFIG.cookies.accessToken, { path: "/" });
  destroyCookie(ctx, AUTH_CONFIG.cookies.refreshToken, { path: "/" });
}

// ============================================================================
// PERMISSION HELPERS
// ============================================================================

/**
 * Check if user has specific permission
 */
export function hasPermission(
  userPermissions: Permission[],
  permission: Permission
): boolean {
  return userPermissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(
  userPermissions: Permission[],
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(
  userPermissions: Permission[],
  permissions: Permission[]
): boolean {
  return permissions.every((permission) =>
    userPermissions.includes(permission)
  );
}

// ============================================================================
// PASSWORD UTILITIES
// ============================================================================

/**
 * Validate password strength
 */
export function validatePasswordStrength(
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS
): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < requirements.minLength) {
    feedback.push(
      `Password must be at least ${requirements.minLength} characters long`
    );
  } else {
    score++;
  }

  // Uppercase check
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    feedback.push("Password must contain at least one uppercase letter");
  } else if (requirements.requireUppercase) {
    score++;
  }

  // Lowercase check
  if (requirements.requireLowercase && !/[a-z]/.test(password)) {
    feedback.push("Password must contain at least one lowercase letter");
  } else if (requirements.requireLowercase) {
    score++;
  }

  // Number check
  if (requirements.requireNumbers && !/\d/.test(password)) {
    feedback.push("Password must contain at least one number");
  } else if (requirements.requireNumbers) {
    score++;
  }

  // Special character check
  if (
    requirements.requireSpecialChars &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)
  ) {
    feedback.push("Password must contain at least one special character");
  } else if (requirements.requireSpecialChars) {
    score++;
  }

  // Check for common patterns
  const commonPatterns = ["12345", "password", "qwerty", "abc123", "admin"];
  if (
    commonPatterns.some((pattern) => password.toLowerCase().includes(pattern))
  ) {
    feedback.push("Password contains common patterns and is easily guessable");
    score = Math.max(0, score - 1);
  }

  return {
    score,
    feedback,
    isValid: feedback.length === 0,
  };
}

/**
 * Hash password using bcrypt (to be implemented on backend)
 * This is a placeholder - actual implementation should be on the backend
 */
export async function hashPassword(password: string): Promise<string> {
  // This will be implemented on the backend with bcrypt
  // Frontend should never hash passwords
  throw new Error("Password hashing should be done on the backend");
}

/**
 * Verify password (to be implemented on backend)
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  // This will be implemented on the backend
  throw new Error("Password verification should be done on the backend");
}

// ============================================================================
// SECURITY UTILITIES
// ============================================================================

/**
 * Generate random session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate backup codes for 2FA
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    codes.push(code);
  }
  return codes;
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate verification token
 */
export function generateVerificationToken(): string {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse expiry string to seconds
 */
export function parseExpiryToSeconds(expiry: string): number {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 900; // Default 15 minutes

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 900;
  }
}

/**
 * Get current user from token
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = getAccessToken(null);
    if (!token) return null;

    return await verifyAccessToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Check if request is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
