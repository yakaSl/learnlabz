/**
 * Authentication Library (Server-Side)
 * Core utilities for JWT handling and server-side cookie management.
 */

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  JWTPayload,
  TokenPair,
  User,
  ROLE_PERMISSIONS,
} from "@/types/auth.types";

// ============================================================================
// CONFIGURATION
// ============================================================================

export const AUTH_CONFIG = {
  accessTokenExpiry: "15m", // 15 minutes
  refreshTokenExpiry: "7d", // 7 days
  rememberMeExpiry: "30d", // 30 days
  twoFactorSessionExpiry: "5m", // 5 minutes for 2FA

  cookies: {
    accessToken: "auth_token",
    refreshToken: "refresh_token",
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
export async function generateTokenPair(
  user: User,
  sessionId: string,
  remember: boolean = false
): Promise<TokenPair> {
  const accessTokenExpiry = AUTH_CONFIG.accessTokenExpiry;
  const refreshTokenExpiry = remember
    ? AUTH_CONFIG.rememberMeExpiry
    : AUTH_CONFIG.refreshTokenExpiry;

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user, sessionId, accessTokenExpiry),
    generateRefreshToken(user.id, sessionId, refreshTokenExpiry),
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

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
);

const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ||
    "your-super-secret-refresh-key-change-in-production"
);

/**
 * Verify Access Token
 */
export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
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
// COOKIE MANAGEMENT (SERVER-SIDE)
// ============================================================================

/**
 * Set authentication cookies
 */
export async function setAuthCookies(tokens: TokenPair) {
  const cookieStore = await cookies();

  // Set access token cookie (httpOnly for security)
  cookieStore.set(AUTH_CONFIG.cookies.accessToken, tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: tokens.expiresIn,
    path: "/",
  });

  // Set refresh token cookie
  cookieStore.set(AUTH_CONFIG.cookies.refreshToken, tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

/**
 * Get access token from cookies
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.cookies.accessToken);
  return token?.value || null;
}

/**
 * Get refresh token from cookies
 */
export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.cookies.refreshToken);
  return token?.value || null;
}

/**
 * Clear authentication cookies
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.cookies.accessToken);
  cookieStore.delete(AUTH_CONFIG.cookies.refreshToken);
}

// ============================================================================
// HELPER FUNCTIONS (SERVER-SIDE)
// ============================================================================

/**
 * Parse expiry string to seconds
 */
function parseExpiryToSeconds(expiry: string): number {
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
    const token = await getAccessToken();
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

/**
 * Generate random session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
