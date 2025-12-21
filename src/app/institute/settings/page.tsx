
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import SettingsPage from "@/components/institute-admin/settings/settings-page";

export default function InstituteSettingsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE]}
    >
      <SettingsPage />
    </ProtectedRoute>
  );
}
