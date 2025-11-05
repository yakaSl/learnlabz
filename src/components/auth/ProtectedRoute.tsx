/**
 * Protected Route Components
 * Client-side route protection with role and permission checks
 */

'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole, Permission } from '@/types/auth.types';
import { AUTH_CONFIG } from '@/app/lib/auth-client';

// ============================================================================
// PROTECTED ROUTE COMPONENT
// ============================================================================

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
  requireAllPermissions?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Wraps content that requires authentication and/or specific roles/permissions
 */
export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  requiredPermissions,
  requireAllPermissions = true,
  fallback,
  redirectTo,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, hasAnyRole, hasPermission, hasAllPermissions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) return;

    // Check authentication
    if (requireAuth && !isAuthenticated) {
      const currentPath = window.location.pathname;
      const loginUrl = `${AUTH_CONFIG.paths.login}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(redirectTo || loginUrl);
      return;
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0 && user) {
      if (!hasAnyRole(allowedRoles)) {
        router.push(redirectTo || '/unauthorized');
        return;
      }
    }

    // Check permission-based access
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAccess = requireAllPermissions
        ? hasAllPermissions(requiredPermissions)
        : requiredPermissions.some(permission => hasPermission(permission));

      if (!hasAccess) {
        router.push(redirectTo || '/unauthorized');
        return;
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    requireAuth,
    allowedRoles,
    requiredPermissions,
    requireAllPermissions,
    user,
    hasAnyRole,
    hasPermission,
    hasAllPermissions,
    redirectTo,
    router,
  ]);

  // Show loading state
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // Show fallback if not authorized
  if (requireAuth && !isAuthenticated) {
    return fallback || null;
  }

  // Show fallback if role check fails
  if (allowedRoles && allowedRoles.length > 0 && user && !hasAnyRole(allowedRoles)) {
    return fallback || null;
  }

  // Show fallback if permission check fails
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : requiredPermissions.some(permission => hasPermission(permission));

    if (!hasAccess) {
      return fallback || null;
    }
  }

  // Render children if all checks pass
  return <>{children}</>;
}

// ============================================================================
// ROLE-BASED PROTECTION COMPONENTS
// ============================================================================

/**
 * Super Admin Only Route
 */
export function SuperAdminRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Institute Admin Only Route
 */
export function InstituteAdminRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.INSTITUTE_ADMIN]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Teacher Only Route
 */
export function TeacherRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.TEACHER]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Student Only Route
 */
export function StudentRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.STUDENT]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Parent Only Route
 */
export function ParentRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.PARENT]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Admin Routes (Super Admin or Institute Admin)
 */
export function AdminRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute 
      allowedRoles={[UserRole.SUPER_ADMIN, UserRole.INSTITUTE_ADMIN]} 
      fallback={fallback}
    >
      {children}
    </ProtectedRoute>
  );
}

/**
 * Staff Routes (Admins, Teachers, Coordinators, etc.)
 */
export function StaffRoute({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute
      allowedRoles={[
        UserRole.SUPER_ADMIN,
        UserRole.INSTITUTE_ADMIN,
        UserRole.TEACHER,
        UserRole.BRANCH_MANAGER,
        UserRole.ACCOUNTANT,
        UserRole.COORDINATOR,
      ]}
      fallback={fallback}
    >
      {children}
    </ProtectedRoute>
  );
}

// ============================================================================
// CONDITIONAL RENDERING COMPONENTS
// ============================================================================

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Conditionally render based on user role
 */
export function RequireRole({ roles, children, fallback }: RequireRoleProps) {
  const { user, hasAnyRole } = useAuth();

  if (!user || !hasAnyRole(roles)) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

interface RequirePermissionProps {
  permissions: Permission[];
  requireAll?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Conditionally render based on permissions
 */
export function RequirePermission({
  permissions,
  requireAll = false,
  children,
  fallback,
}: RequirePermissionProps) {
  const { hasPermission, hasAllPermissions } = useAuth();

  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : permissions.some(permission => hasPermission(permission));

  if (!hasAccess) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Conditionally render based on authentication status
 */
export function RequireAuth({ children, fallback }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <>{fallback || <LoadingSpinner />}</>;
  }

  if (!isAuthenticated) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

// ============================================================================
// LOADING COMPONENT
// ============================================================================

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

export default ProtectedRoute;
