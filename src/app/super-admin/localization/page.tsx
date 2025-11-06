
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import LocalizationManagement from "@/components/super-admin/localization/localization-management";

export default function SuperAdminLocalizationPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <LocalizationManagement />
    </ProtectedRoute>
  );
}
