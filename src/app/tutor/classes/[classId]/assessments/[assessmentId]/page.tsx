'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AssignmentSubmissionsPage from "@/components/tutor/classes/assessments/submissions-page";

export default function SubmissionsPage({ params }: { params: { classId: string, assessmentId: string } }) {
  const { classId, assessmentId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <AssignmentSubmissionsPage classId={classId} assessmentId={assessmentId} />
    </ProtectedRoute>
  );
}
