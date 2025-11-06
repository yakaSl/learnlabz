/**
 * Next.js Middleware Entry Point
 * This file is automatically picked up by Next.js
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken, AUTH_CONFIG } from '@/app/lib/auth';
import { 
  isPublicRoute, 
  isAuthRoute, 
  getDashboardRoute, 
  hasRouteAccess 
} from '@/config/routes.config';

/**
 * Middleware function that runs on every request
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, images, and API routes (except auth)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/api/health') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|json)$/)
  ) {
    return NextResponse.next();
  }

  // Allow auth API routes to pass through
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = request.cookies.get(AUTH_CONFIG.cookies.accessToken)?.value;
  
  // Handle unauthenticated users
  if (!accessToken) {
    // Allow access to public routes
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Redirect to login for protected routes
    const loginUrl = new URL(AUTH_CONFIG.paths.login, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
    response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);
    
    return response;
  }

  // Verify token and handle authenticated users
  try {
    const payload = await verifyAccessToken(accessToken);

    // Redirect authenticated users away from auth pages
    if (isAuthRoute(pathname)) {
      const dashboardUrl = getDashboardRoute(payload.role);
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // Check role-based access for protected routes
    if (!hasRouteAccess(pathname, payload.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Add user info to request headers for downstream use
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

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Token verification failed:', error);

    // Clear invalid tokens
    const loginUrl = new URL(AUTH_CONFIG.paths.login, request.url);
    
    if (!isPublicRoute(pathname)) {
      loginUrl.searchParams.set('redirect', pathname);
    }

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(AUTH_CONFIG.cookies.accessToken);
    response.cookies.delete(AUTH_CONFIG.cookies.refreshToken);

    return response;
  }
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};