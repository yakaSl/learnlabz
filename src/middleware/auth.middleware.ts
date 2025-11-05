/**
 * Authentication Middleware for Next.js
 * Protects routes based on authentication status, roles, and permissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, AUTH_CONFIG } from '@/app/lib/auth';
import { UserRole, Permission } from '@/types/auth.types';

// ============================================================================
// ROUTE CONFIGURATION
// ============================================================================

/**
 * Define public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
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
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
];

/**
 * Define role-based route access
 * Map route patterns to required roles
 */
const ROLE_ROUTES: Record<string, UserRole[]> = {
  '/super-admin': [UserRole.SUPER_ADMIN],
  '/institute-admin': [UserRole.INSTITUTE_ADMIN],
  '/teacher': [UserRole.TEACHER],
  '/branch-manager': [UserRole.BRANCH_MANAGER],
  '/accountant': [UserRole.ACCOUNTANT],
  '/coordinator': [UserRole.COORDINATOR],
  '/student': [UserRole.STUDENT],
  '/parent': [UserRole.PARENT],
};

/**
 * Define API routes that require specific permissions
 */
const PERMISSION_ROUTES: Record<string, Permission[]> = {
  '/api/institutes': [Permission.INSTITUTE_READ],
  '/api/institutes/create': [Permission.INSTITUTE_CREATE],
  '/api/institutes/update': [Permission.INSTITUTE_UPDATE],
  '/api/institutes/delete': [Permission.INSTITUTE_DELETE],
  '/api/users': [Permission.USER_READ],
  '/api/users/create': [Permission.USER_CREATE],
  '/api/classes': [Permission.CLASS_READ],
  '/api/payments': [Permission.PAYMENT_VIEW],
  '/api/analytics': [Permission.ANALYTICS_VIEW],
  '/api/settings': [Permission.SETTINGS_VIEW],
};

// ============================================================================
// MIDDLEWARE FUNCTION
// ============================================================================

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, images, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/api/health') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json)$/)
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Get access token from cookies
  const accessToken = request.cookies.get(AUTH_CONFIG.cookies.accessToken)?.value;

  // If no token and route is not public, redirect to login
  if (!accessToken && !isPublicRoute) {
    const url = new URL(AUTH_CONFIG.paths.login, request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If token exists, verify it
  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken);
      
      // Check if user is blocked or inactive
      // This would typically involve a database check
      // For now, we trust the token
      
      // Check role-based access for dashboard routes
      const requiredRoles = getRequiredRoles(pathname);
      if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
        // User doesn't have required role
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      
      // Check permission-based access for API routes
      const requiredPermissions = getRequiredPermissions(pathname);
      if (requiredPermissions.length > 0) {
        const hasRequiredPermissions = requiredPermissions.every(permission =>
          payload.permissions.includes(permission)
        );
        
        if (!hasRequiredPermissions) {
          if (pathname.startsWith('/api/')) {
            return NextResponse.json(
              { success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
              { status: 403 }
            );
          }
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
      
      // Add user info to request headers for use in API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId);
      requestHeaders.set('x-user-role', payload.role);
      requestHeaders.set('x-user-email', payload.email);
      if (payload.instituteId) {
        requestHeaders.set('x-institute-id', payload.instituteId);
      }
      if (payload.branchId) {
        requestHeaders.set('x-branch-id', payload.branchId);
      }
      
      // If logged in and trying to access auth pages, redirect to appropriate dashboard
      if (PUBLIC_ROUTES.includes(pathname) && !pathname.startsWith('/api/')) {
        const dashboardUrl = getDashboardUrlForRole(payload.role);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      
    } catch (error) {
      // Token is invalid or expired
      console.error('Token verification failed:', error);
      
      // Clear invalid cookies
      const response = NextResponse.redirect(new URL(AUTH_CONFIG.paths.login, request.url));
      response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
      response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
      
      return response;
    }
  }

  // Public route with no token - allow access
  return NextResponse.next();
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get required roles for a given pathname
 */
function getRequiredRoles(pathname: string): UserRole[] {
  for (const [route, roles] of Object.entries(ROLE_ROUTES)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }
  return [];
}

/**
 * Get required permissions for a given pathname
 */
function getRequiredPermissions(pathname: string): Permission[] {
  for (const [route, permissions] of Object.entries(PERMISSION_ROUTES)) {
    if (pathname.startsWith(route)) {
      return permissions;
    }
  }
  return [];
}

/**
 * Get appropriate dashboard URL based on user role
 */
function getDashboardUrlForRole(role: UserRole): string {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return '/super-admin/dashboard';
    case UserRole.INSTITUTE_ADMIN:
      return '/institute-admin/dashboard';
    case UserRole.TEACHER:
      return '/teacher/dashboard';
    case UserRole.BRANCH_MANAGER:
      return '/branch-manager/dashboard';
    case UserRole.ACCOUNTANT:
      return '/accountant/dashboard';
    case UserRole.COORDINATOR:
      return '/coordinator/dashboard';
    case UserRole.STUDENT:
      return '/student/dashboard';
    case UserRole.PARENT:
      return '/parent/dashboard';
    default:
      return '/';
  }
}

// ============================================================================
// UTILITY FUNCTIONS FOR USE IN COMPONENTS/API ROUTES
// ============================================================================

/**
 * Check if user has required role (for use in components)
 */
export function requireRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Check if user has required permission (for use in components)
 */
export function requirePermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the required permissions
 */
export function requireAnyPermission(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
}

/**
 * Check if user has all required permissions
 */
export function requireAllPermissions(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
