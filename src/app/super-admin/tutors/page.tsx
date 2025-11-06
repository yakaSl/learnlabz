'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import UserManagement from "@/components/super-admin/users/user-management";

export default function SuperAdminTutorsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <UserManagement roleFilter="Tutor" />
    </ProtectedRoute>
  );
}
