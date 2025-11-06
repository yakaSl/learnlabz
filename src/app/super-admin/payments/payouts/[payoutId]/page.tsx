'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { PayoutAdjustmentView } from '@/components/super-admin/payments/payout-adjustment-view';
import { payouts } from '@/components/super-admin/payments/payouts-data';
import { notFound } from 'next/navigation';
import React from 'react';

export default function PayoutDetailPage({ params }: { params: { payoutId: string } }) {
    const { payoutId } = params;
    const payout = payouts.find(p => p.id === payoutId);

    if (!payout) {
        notFound();
    }

    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.SUPER_ADMIN]}
        >
            <PayoutAdjustmentView payout={payout} />
        </ProtectedRoute>
    );
}
