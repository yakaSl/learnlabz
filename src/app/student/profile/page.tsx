
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import StudentSettingsPage from "@/components/student/profile/settings-page";

export default function StudentProfilePage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <StudentSettingsPage />
    </ProtectedRoute>
  );
}
