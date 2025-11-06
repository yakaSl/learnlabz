
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import StudentManagement from "@/components/tutor/students/student-management";

export default function TutorStudentsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <StudentManagement />
    </ProtectedRoute>
  );
}
