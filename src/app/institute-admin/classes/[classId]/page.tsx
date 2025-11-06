'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { ClassDetailView } from "@/components/institute-admin/classes/class-detail-view";

export default function InstituteClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <ClassDetailView classId={classId} />
    </ProtectedRoute>
  );
}
