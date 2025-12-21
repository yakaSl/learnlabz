/**
 * Next.js Middleware Entry Point
 * This file is automatically picked up by Next.js
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_CONFIG } from '@/app/lib/auth';
import {
  isPublicRoute,
  isAuthRoute,
  getDashboardRoute,
} from '@/config/routes.config';
import { UserRole } from '@/types/auth.types';

/**
 * Get user role from cookie
 * Role is stored separately during login since backend JWT doesn't include it
 */
function getUserRole(request: NextRequest): UserRole | null {
  try {
    const roleCookie = request.cookies.get('userRole')?.value;
    return roleCookie as UserRole || null;
  } catch (error) {
    return null;
  }
}

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
    response.cookies.delete('userRole');

    return response;
  }

  // Skip strict token verification in middleware
  // Backend API verifies tokens on each request for security
  // Here we just get the user role from cookie for routing

  // If user has a token and tries to access auth pages, redirect to their dashboard
  if (isAuthRoute(pathname)) {
    const userRole = getUserRole(request);

    if (userRole) {
      // Redirect to role-based dashboard
      const dashboardUrl = getDashboardRoute(userRole);
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }

    // If we can't get the role, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow authenticated users to access all other routes
  // Dashboard pages will load, 404 pages will show naturally
  return NextResponse.next();
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