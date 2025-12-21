/**
 * Auth Guard Component
 * Client-side authentication protection wrapper
 * Redirects unauthenticated users and validates role access
 */

'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth.types';
import { AUTH_ROUTES, ERROR_ROUTES } from '@/config/routes.config';

// ============================================================================
// LOADING COMPONENT
// ============================================================================

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// ============================================================================
// AUTH GUARD COMPONENT
// ============================================================================

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallback?: ReactNode;
  redirectOnUnauthorized?: string;
}

/**
 * Auth Guard - Protects routes on the client side
 * Use this to wrap page content that requires authentication
 */
export function AuthGuard({
  children,
  allowedRoles,
  fallback,
  redirectOnUnauthorized = ERROR_ROUTES.unauthorized,
}: AuthGuardProps) {
  const { user, isInitialized, hasAnyRole } = useAuth();
  const router = useRouter();

  // isAuthenticated = !!user (user exists means authenticated)
  const isAuthenticated = !!user;
  const isLoading = !isInitialized;

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      const loginUrl = `${AUTH_ROUTES.login}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
      return;
    }

    // Check role-based access if roles are specified
    if (allowedRoles && allowedRoles.length > 0 && user) {
      if (!hasAnyRole(allowedRoles)) {
        router.push(redirectOnUnauthorized);
        return;
      }
    }
  }, [isLoading, isAuthenticated, allowedRoles, user, hasAnyRole, redirectOnUnauthorized, router]);

  // Show loading state
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // Show fallback if not authenticated
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Show fallback if role check fails
  if (allowedRoles && allowedRoles.length > 0 && user && !hasAnyRole(allowedRoles)) {
    return fallback || null;
  }

  // Render children if all checks pass
  return <>{children}</>;
}

// ============================================================================
// ROLE-SPECIFIC GUARD COMPONENTS
// ============================================================================

/**
 * Super Admin Guard
 */
export function SuperAdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.SUPER_ADMIN]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Institute Admin Guard
 */
export function InstituteAdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.INSTITUTE]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Teacher Guard
 */
export function TeacherGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.TEACHER]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Student Guard
 */
export function StudentGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.STUDENT]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Parent Guard
 */
export function ParentGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.PARENT]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Admin Guard (Super Admin or Institute Admin)
 */
export function AdminGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.SUPER_ADMIN, UserRole.INSTITUTE]} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

/**
 * Staff Guard (All staff roles)
 */
export function StaffGuard({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard
      allowedRoles={[
        UserRole.SUPER_ADMIN,
        UserRole.INSTITUTE,
        UserRole.TEACHER,
        // Removed BRANCH_MANAGER, ACCOUNTANT, COORDINATOR - not in 5 main role categories
      ]}
      fallback={fallback}
    >
      {children}
    </AuthGuard>
  );
}

// ============================================================================
// CONDITIONAL RENDERING COMPONENTS
// ============================================================================

interface ConditionalRenderProps {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Show content only if user has one of the specified roles
 */
export function ShowForRoles({ roles, children, fallback }: ConditionalRenderProps) {
  const { user, hasAnyRole } = useAuth();

  if (!user || !hasAnyRole(roles)) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

/**
 * Show content only for authenticated users
 */
export function ShowForAuth({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

/**
 * Show content only for guests (non-authenticated users)
 */
export function ShowForGuests({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}