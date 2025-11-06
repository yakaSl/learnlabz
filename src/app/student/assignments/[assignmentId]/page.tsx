'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AssignmentView from '@/components/student/assignments/assignment-view';

export default function AssignmentDetailPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  const { assignmentId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <AssignmentView assignmentId={assignmentId} />
    </ProtectedRoute>
  );
}
