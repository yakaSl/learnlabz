/**
 * Routes Configuration
 * Centralized route paths and role-based dashboard mapping
 */

import { UserRole } from '@/types/auth.types';

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

/**
 * Routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/about',
  '/contact',
  '/pricing',
  '/terms',
  '/privacy',
  '/ui',
] as const;

// ============================================================================
// AUTH ROUTES
// ============================================================================

/**
 * Authentication related routes
 * Authenticated users should not access these
 */
export const AUTH_ROUTES = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  twoFactor: '/2fa-verify',
} as const;

// ============================================================================
// ROLE-BASED DASHBOARD ROUTES
// ============================================================================

/**
 * Dashboard routes for each user role (5 Main Categories)
 */
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: '/super-admin',
  [UserRole.INSTITUTE]: '/institute',
  [UserRole.TEACHER]: '/teacher',
  [UserRole.STUDENT]: '/student',
  [UserRole.PARENT]: '/parent',
} as const;

/**
 * Role-based route access control (5 Main Categories)
 * Maps route patterns to allowed roles
 */
export const ROLE_ROUTE_ACCESS: Record<string, UserRole[]> = {
  '/super-admin': [UserRole.SUPER_ADMIN],
  '/institute': [UserRole.INSTITUTE],
  '/teacher': [UserRole.TEACHER],
  '/student': [UserRole.STUDENT],
  '/parent': [UserRole.PARENT],
} as const;

// ============================================================================
// ERROR ROUTES
// ============================================================================

export const ERROR_ROUTES = {
  unauthorized: '/unauthorized',
  notFound: '/404',
  serverError: '/500',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname as any);
}

/**
 * Check if a route is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return Object.values(AUTH_ROUTES).includes(pathname as any);
}

/**
 * Get dashboard URL for a specific role
 */
export function getDashboardRoute(role: UserRole): string {
  return DASHBOARD_ROUTES[role] || '/';
}

/**
 * Get allowed roles for a route
 */
export function getAllowedRolesForRoute(pathname: string): UserRole[] {
  // Find matching route pattern
  for (const [pattern, roles] of Object.entries(ROLE_ROUTE_ACCESS)) {
    if (pathname.startsWith(pattern)) {
      return roles;
    }
  }
  return [];
}

/**
 * Check if a role has access to a route
 */
export function hasRouteAccess(pathname: string, userRole: UserRole): boolean {
  // Public routes are accessible to everyone
  if (isPublicRoute(pathname)) {
    return true;
  }

  // Get allowed roles for the route
  const allowedRoles = getAllowedRolesForRoute(pathname);
  
  // If no specific roles are defined, assume it's accessible
  if (allowedRoles.length === 0) {
    return true;
  }

  // Check if user's role is in the allowed roles
  return allowedRoles.includes(userRole);
}