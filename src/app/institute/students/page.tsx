
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import StudentManagement from "@/components/institute-admin/students/student-management";

export default function StudentsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE]}
    >
      <StudentManagement />
    </ProtectedRoute>
  );
}
