'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ReportsAnalytics from "@/components/tutor/reports/reports-analytics";

export default function ReportsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <ReportsAnalytics />
    </ProtectedRoute>
  );
}
