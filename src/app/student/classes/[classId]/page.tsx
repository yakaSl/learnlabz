'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ClassDetailView from "@/components/student/classes/details/class-detail-view";

export default function StudentClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <ClassDetailView classId={classId} />
    </ProtectedRoute>
  );
}
