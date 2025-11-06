
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import BillingManagement from "@/components/institute-admin/billing/billing-management";

export default function BillingPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <BillingManagement />
    </ProtectedRoute>
  );
}
