
'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import GradeSubmissionPage from "@/components/tutor/classes/details/grading/grade-submission-page";

export default function SubmissionPage({
  params,
}: {
  params: Promise<{ classId: string; assessmentId: string; submissionId: string }>;
}) {
  const { classId, assessmentId, submissionId } = React.use(params);
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <GradeSubmissionPage
        classId={classId}
        assessmentId={assessmentId}
        submissionId={submissionId}
      />
    </ProtectedRoute>
  );
}
