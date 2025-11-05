/**
 * Authentication Library (Client-Side)
 * Contains client-safe utilities for authentication.
 */

import {
  PasswordStrength,
  PasswordRequirements,
  DEFAULT_PASSWORD_REQUIREMENTS,
  Permission,
} from "@/types/auth.types";
import { AUTH_CONFIG as PATH_CONFIG } from "@/config/auth.config";


export const AUTH_CONFIG = {
  paths: {
    ...PATH_CONFIG.paths,
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    twoFactor: "/two-factor",
  },
};

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
