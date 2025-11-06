
'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Permission, UserRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

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
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  requiredPermissions,
  requireAllPermissions = false,
}: ProtectedRouteProps) {
  const { 
    user,
    isInitialized,
    hasAnyRole,
    hasAllPermissions,
    hasPermission
  } = useAuth();
  const router = useRouter();

  if (requireAuth && !isInitialized) {
    return <LoadingSpinner />;
  }
  
  if (requireAuth && !user) {
    // This case should be handled by middleware, but as a fallback:
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${currentPath}`);
    }
    return <LoadingSpinner />;
  }

  if (allowedRoles && allowedRoles.length > 0 && user && !hasAnyRole(allowedRoles)) {
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        router.push(`/unauthorized?from=${currentPath}`);
    }
    return <LoadingSpinner />;
  }

  if (requiredPermissions && requiredPermissions.length > 0 && user) {
    const hasAccess = requireAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : requiredPermissions.some(permission => hasPermission(permission));
    if (!hasAccess) {
       if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            router.push(`/unauthorized?from=${currentPath}`);
        }
       return <LoadingSpinner />;
    }
  }

  return <>{children}</>;
}
