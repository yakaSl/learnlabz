
'use client';

import { payouts } from '@/components/super-admin/payments/payouts-data';
import { notFound, useParams } from 'next/navigation';
import { PayoutAdjustmentView } from '@/components/super-admin/payments/payout-adjustment-view';
import React from 'react';

export default function PayoutDetailPage() {
    const params = useParams();
    const { payoutId } = params as { payoutId: string };

    const payout = payouts.find(p => p.id === payoutId);

    if (!payout) {
        notFound();
    }

    return <PayoutAdjustmentView payout={payout} />;
}
