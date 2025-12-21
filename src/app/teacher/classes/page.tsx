
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ClassManagement from "@/components/tutor/classes/class-management";

export default function TutorClassesPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <ClassManagement />
    </ProtectedRoute>
  );
}
