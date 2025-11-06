'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ClassManagement from "@/components/student/classes/class-management";

export default function StudentClassesPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <ClassManagement />
    </ProtectedRoute>
  );
}
