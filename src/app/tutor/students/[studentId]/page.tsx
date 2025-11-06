'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import StudentProfileView from "@/components/tutor/students/student-profile-view";

export default function StudentProfilePage({ params }: { params: { studentId: string } }) {
  const { studentId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <StudentProfileView studentId={studentId} />
    </ProtectedRoute>
  );
}
