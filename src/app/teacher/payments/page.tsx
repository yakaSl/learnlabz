
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import Payments from "@/components/tutor/payments/payments";

export default function TutorPaymentsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <Payments />
    </ProtectedRoute>
  );
}
