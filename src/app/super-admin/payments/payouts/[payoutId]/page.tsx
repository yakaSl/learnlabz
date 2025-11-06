
'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { PayoutAdjustmentView } from '@/components/super-admin/payments/payout-adjustment-view';
import { payouts } from '@/components/super-admin/payments/payouts-data';
import { notFound } from 'next/navigation';

export default function PayoutDetailPage({ params }: { params: Promise<{ payoutId: string }> }) {
    const { payoutId } = React.use(params);
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
