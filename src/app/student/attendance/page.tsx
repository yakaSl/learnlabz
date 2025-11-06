'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AttendanceView from "@/components/student/attendance/attendance-view";

export default function AttendancePage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <AttendanceView />
    </ProtectedRoute>
  );
}
