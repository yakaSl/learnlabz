'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ClassManagement from "@/components/institute-admin/classes/class-management";

export default function ClassesPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <ClassManagement />
    </ProtectedRoute>
  );
}
