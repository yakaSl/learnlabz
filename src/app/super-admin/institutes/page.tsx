'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import InstituteManagement from "@/components/super-admin/institutes/institute-management";

export default function SuperAdminInstitutesPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <div className="flex flex-col flex-1">
        <InstituteManagement />
      </div>
    </ProtectedRoute>
  );
}
