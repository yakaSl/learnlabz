/**
 * Authentication Middleware for Next.js
 * Protects routes based on authentication status and user role.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, AUTH_CONFIG } from '@/app/lib/auth';
import { UserRole, Permission, ROLE_PERMISSIONS } from '@/types/auth.types';

// ============================================================================
// ROUTE CONFIGURATION
// ============================================================================

/**
 * Define public routes that don't require authentication.
 * All other routes are considered protected.
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
  '/unauthorized',
  '/ui',
];

/**
 * Define role-based dashboard paths.
 */
const getDashboardUrlForRole = (role: UserRole): string => {
    const roleDashboardPaths: Record<UserRole, string> = {
        [UserRole.SUPER_ADMIN]: '/super-admin',
        [UserRole.INSTITUTE_ADMIN]: '/institute-admin',
        [UserRole.TEACHER]: '/tutor',
        [UserRole.TEACHER_ASSISTANT]: '/tutor-assistant',
        [UserRole.STUDENT]: '/student',
        [UserRole.PARENT]: '/parent',
        [UserRole.BRANCH_MANAGER]: '/branch-manager',
        [UserRole.ACCOUNTANT]: '/accountant',
        [UserRole.COORDINATOR]: '/coordinator',
    };
    return roleDashboardPaths[role] || '/';
};


// These would ideally be in a more sophisticated RBAC config file
function getRequiredRoles(pathname: string): UserRole[] {
    if (pathname.startsWith('/super-admin')) return [UserRole.SUPER_ADMIN];
    if (pathname.startsWith('/institute-admin')) return [UserRole.INSTITUTE_ADMIN];
    if (pathname.startsWith('/tutor')) return [UserRole.TEACHER];
    if (pathname.startsWith('/tutor-assistant')) return [UserRole.TEACHER_ASSISTANT];
    if (pathname.startsWith('/student')) return [UserRole.STUDENT];
    if (pathname.startsWith('/parent')) return [UserRole.PARENT];
    return [];
}

function getRequiredPermissions(pathname: string): Permission[] {
    // Example of permission-based route protection
    // if (pathname === '/super-admin/settings') {
    //     return [Permission.SETTINGS_UPDATE];
    // }
    return [];
}


// ============================================================================
// MIDDLEWARE FUNCTION
// ============================================================================
export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files, fonts, and images
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/logo') ||
    pathname.includes('/api/health') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json)$/)
  ) {
    return NextResponse.next();
  }
  // Allow auth API routes
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || (route !== '/' && pathname.startsWith(route + '/')));

  const accessToken = request.cookies.get(AUTH_CONFIG.cookies.accessToken)?.value;
  // CRITICAL: No token + protected route = immediate redirect to login
  if (!accessToken && !isPublicRoute) {
    const url = new URL(AUTH_CONFIG.paths.login, request.url);
    url.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(url);
    
    // Clear any potentially stale cookies
    response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
    response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
    
    return response;
  }
  // If token exists, verify it
  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken);
      
      // Check role-based access
      const requiredRoles = getRequiredRoles(pathname);
      if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
        const unauthorizedUrl = new URL('/unauthorized', request.url);
        unauthorizedUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(unauthorizedUrl);
      }
      
      // Check permission-based access
      const requiredPermissions = getRequiredPermissions(pathname);
      if (requiredPermissions.length > 0) {
        const hasRequiredPermissions = requiredPermissions.every(permission =>
          (payload.permissions || []).includes(permission)
        );
        
        if (!hasRequiredPermissions) {
          const unauthorizedUrl = new URL('/unauthorized', request.url);
          unauthorizedUrl.searchParams.set('from', pathname);
          return NextResponse.redirect(unauthorizedUrl);
        }
      }
      
      // Add user info to headers
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
      
      // Redirect authenticated users away from public auth pages
      const authOnlyRoutes = ['/login', '/register', '/forgot-password'];
      if (authOnlyRoutes.includes(pathname)) {
        const dashboardUrl = getDashboardUrlForRole(payload.role);
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      
    } catch (error) {
      console.error('Token verification failed:', error);
      
      // Clear invalid tokens
      const loginUrl = new URL(AUTH_CONFIG.paths.login, request.url);
      if (!isPublicRoute) {
        loginUrl.searchParams.set('redirect', pathname);
      }
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
      response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
      
      return response;
    }
  }
  return NextResponse.next();
}


// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - and files with extensions (e.g. .png, .jpg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
