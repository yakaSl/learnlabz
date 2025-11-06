'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import PaymentManagement from "@/components/super-admin/payments/payment-management";

export default function SuperAdminPaymentsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <PaymentManagement />
    </ProtectedRoute>
  );
}
