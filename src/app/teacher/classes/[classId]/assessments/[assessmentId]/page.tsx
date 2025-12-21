
'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AssignmentSubmissionsPage from "@/components/tutor/classes/assessments/submissions-page";

export default function SubmissionsPage({ params }: { params: Promise<{ classId: string, assessmentId: string }> }) {
  const { classId, assessmentId } = React.use(params);
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <AssignmentSubmissionsPage classId={classId} assessmentId={assessmentId} />
    </ProtectedRoute>
  );
}
