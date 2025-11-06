
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AnalyticsDashboard from "@/components/super-admin/analytics/analytics-dashboard";

export default function SuperAdminAnalyticsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <AnalyticsDashboard />
    </ProtectedRoute>
  );
}
