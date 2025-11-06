/**
 * Unauthorized Access Page
 * Shown when users try to access routes they don't have permission for
 */

'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardRoute } from '@/config/routes.config';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleGoToDashboard = () => {
    if (user) {
      const dashboardUrl = getDashboardRoute(user.role);
      router.push(dashboardUrl);
    } else {
      router.push('/');
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Access Denied
          </h1>
          <p className="text-lg text-muted-foreground">
            You don't have permission to access this page
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {isAuthenticated && user
              ? `Your current role (${user.role}) doesn't have access to this resource. If you believe this is a mistake, please contact your administrator.`
              : 'Please log in with an account that has the required permissions.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            onClick={handleGoToDashboard}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            {isAuthenticated ? 'Go to Dashboard' : 'Go to Home'}
          </Button>
        </div>

        {/* Additional Info */}
        {isAuthenticated && user && (
          <div className="pt-8 border-t">
            <p className="text-xs text-muted-foreground">
              Logged in as: <span className="font-medium">{user.email}</span>
              <br />
              Role: <span className="font-medium">{user.role}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}