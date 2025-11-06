'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ClassDetailView from "@/components/tutor/classes/class-detail-view";

export default function ClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <ClassDetailView classId={classId} />
    </ProtectedRoute>
  );
}
