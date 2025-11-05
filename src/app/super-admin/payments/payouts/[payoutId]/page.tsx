
'use client';
import { PayoutAdjustmentView } from '@/components/super-admin/payments/payout-adjustment-view';
import { payouts } from '@/components/super-admin/payments/payouts-data';
import { notFound } from 'next/navigation';

export default function PayoutDetailPage({ params }: { params: { payoutId: string } }) {
    const payout = payouts.find(p => p.id === params.payoutId);

    if (!payout) {
        notFound();
    }

    return <PayoutAdjustmentView payout={payout} />;
}
