
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import PaymentManagement from "@/components/student/payments/payment-management";

export default function StudentPaymentsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <PaymentManagement />
    </ProtectedRoute>
  );
}
