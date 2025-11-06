'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import PaymentManagement from "@/components/parent/payments/payment-management";

export default function ParentPaymentsPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <PaymentManagement />
        </ProtectedRoute>
    );
}
