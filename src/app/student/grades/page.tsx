'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import GradesPerformanceView from "@/components/student/grades/grades-performance-view";

export default function GradesPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <GradesPerformanceView />
    </ProtectedRoute>
  );
}
