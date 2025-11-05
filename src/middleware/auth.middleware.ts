/**
 * Authentication Middleware for Next.js
 * Protects routes based on authentication status and user role.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, AUTH_CONFIG } from '@/app/lib/auth';
import { UserRole } from '@/types/auth.types';

// ============================================================================
// ROUTE CONFIGURATION
// ============================================================================

/**
 * Define public routes that don't require authentication.
 * All other routes are considered protected.
 */
const publicPaths = [
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
];

/**
 * Define prefixes for public API routes.
 */
const publicApiPrefixes = [
    '/api/auth/login'
];

/**
 * Define role-based dashboard paths.
 */
const roleDashboardPaths: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: '/super-admin',
    [UserRole.INSTITUTE_ADMIN]: '/institute-admin',
    [UserRole.TEACHER]: '/tutor',
    [UserRole.STUDENT]: '/student',
    [UserRole.PARENT]: '/parent',
    [UserRole.BRANCH_MANAGER]: '/branch-manager',
    [UserRole.ACCOUNTANT]: '/accountant',
    [UserRole.COORDINATOR]: '/coordinator',
};

// ============================================================================
// MIDDLEWARE FUNCTION
// ============================================================================

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and public assets to pass through
  if (pathname.startsWith('/_next/') || pathname.startsWith('/logo/') || pathname.startsWith('/credit-cards/') || pathname.endsWith('.ico')) {
    return NextResponse.next();
  }
  
  // Check if the path is public
  const isPublic = publicPaths.includes(pathname) || publicApiPrefixes.some(prefix => pathname.startsWith(prefix));

  const accessToken = request.cookies.get(AUTH_CONFIG.cookies.accessToken)?.value;

  if (isPublic) {
    // If user is logged in and tries to access a public page like login/register, redirect them to their dashboard
    if (accessToken) {
      try {
        const payload = await verifyAccessToken(accessToken);
        const dashboardUrl = roleDashboardPaths[payload.role] || '/';
        
        // Prevent redirect loops for the root path '/' and other public but accessible-when-logged-in paths
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
      } catch (error) {
        // Invalid token, let them proceed to the public page but clear the bad cookie
        const response = NextResponse.next();
        response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
        response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
        return response;
      }
    }
    return NextResponse.next();
  }

  // At this point, the route is protected
  if (!accessToken) {
    // Redirect to login if not authenticated
    const url = new URL(AUTH_CONFIG.paths.login, request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const payload = await verifyAccessToken(accessToken);

    // Check role-based access
    const requiredRolePath = Object.values(roleDashboardPaths).find(rolePath => pathname.startsWith(rolePath));
    
    if (requiredRolePath) {
        const userRolePath = roleDashboardPaths[payload.role];
        if (!pathname.startsWith(userRolePath)) {
            // User does not have the required role, redirect to unauthorized
             return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }
    
    // Attach user payload to the request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-payload', JSON.stringify(payload));
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    // Token is invalid or expired, redirect to login
    console.error('Token verification failed in middleware:', error);
    const url = new URL(AUTH_CONFIG.paths.login, request.url);
    url.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(url);
    // Clear invalid cookies
    response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
    response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
    return response;
  }
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
