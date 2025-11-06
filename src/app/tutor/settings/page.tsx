
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import Settings from "@/components/tutor/settings/settings";

export default function TutorSettingsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <Settings />
    </ProtectedRoute>
  );
}
