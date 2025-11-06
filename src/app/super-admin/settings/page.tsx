
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import SettingsPage from "@/components/super-admin/settings/settings-page";

export default function SuperAdminSettingsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <SettingsPage />
    </ProtectedRoute>
  );
}
