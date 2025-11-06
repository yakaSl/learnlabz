/**
 * Auth Pages Layout
 * Layout for authentication pages (login, register, etc.)
 * Redirects authenticated users to their dashboard
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardRoute } from '@/config/routes.config';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) return;

    // Redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      const dashboardUrl = getDashboardRoute(user.role);
      router.push(dashboardUrl);
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render auth pages if user is authenticated
  if (isAuthenticated && user) {
    return null;
  }

  // Render auth pages for guests
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}