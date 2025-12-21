
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ReportsAndAnalytics from "@/components/institute-admin/reports/reports-analytics";

export default function ReportsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE]}
    >
      <ReportsAndAnalytics />
    </ProtectedRoute>
  );
}
