'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Permission, UserRole } from '@/types/auth.types';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
  requireAllPermissions?: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  requiredPermissions,
  requireAllPermissions = false,
  fallback,
}: ProtectedRouteProps) {
  const { 
    user,
    isInitialized,
    hasAnyRole,
    hasAllPermissions,
    hasPermission
  } = useAuth();

  // If we require auth and the auth state hasn't been initialized, show a spinner.
  if (requireAuth && !isInitialized) {
    return fallback || <LoadingSpinner />;
  }
  
  // If we require auth and there's no user (after initialization), the middleware will redirect.
  // We can show a spinner while that happens.
  if (requireAuth && !user) {
    return fallback || <LoadingSpinner />;
  }

  // If roles are required, check them.
  if (allowedRoles && allowedRoles.length > 0 && user && !hasAnyRole(allowedRoles)) {
    return fallback || <LoadingSpinner />; // Or redirect to unauthorized
  }

  // If permissions are required, check them.
  if (requiredPermissions && requiredPermissions.length > 0 && user) {
    const hasAccess = requireAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : requiredPermissions.some(permission => hasPermission(permission));
    if (!hasAccess) {
      return fallback || <LoadingSpinner />; // Or redirect to unauthorized
    }
  }

  return <>{children}</>;
}
