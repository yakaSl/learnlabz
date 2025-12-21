
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import TutorManagement from "@/components/institute-admin/tutors/tutor-management";

export default function TutorsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE]}
    >
      <TutorManagement />
    </ProtectedRoute>
  );
}
