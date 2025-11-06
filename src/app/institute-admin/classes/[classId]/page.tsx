'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { ClassDetailView } from "@/components/institute-admin/classes/class-detail-view";

export default function InstituteClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = React.use(params);
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <ClassDetailView classId={classId} />
    </ProtectedRoute>
  );
}
