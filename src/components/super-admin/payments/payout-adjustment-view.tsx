
'use client';

import * as React from 'react';
import { Payout } from './payouts-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Banknote, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface PayoutAdjustmentViewProps {
    payout: Payout;
}

export function PayoutAdjustmentView({ payout }: PayoutAdjustmentViewProps) {
    const [netPayout, setNetPayout] = React.useState(payout.amount);
    const platformFee = (payout.amount / 0.95) * 0.05; // Assuming 5% fee
    const grossIncome = payout.amount + platformFee;
    const [adjustment, setAdjustment] = React.useState(0);
    const adjustedNet = payout.amount + adjustment;

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild>
                    <Link href="/super-admin/payments?tab=payouts">
                        <ArrowLeft className="mr-2" />
                        Back to Payouts
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight mt-2">Adjust Payout for {payout.tutorName}</h1>
                <p className="text-muted-foreground">Review calculations and make manual adjustments if necessary.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign />
                                Original Calculation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Gross Income</span>
                                <span className="font-medium">${grossIncome.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Platform Fees (5%)</span>
                                <span className="font-medium text-destructive">- ${platformFee.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between font-bold text-base border-t pt-2">
                                <span>Net Payout</span>
                                <span>${payout.amount.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Banknote />
                                Adjusted Payout
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Original Net Payout</span>
                                <span className="font-medium">${payout.amount.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Adjustment</span>
                                <Input 
                                    type="number" 
                                    className="w-24 h-8 text-right" 
                                    value={adjustment}
                                    onChange={(e) => setAdjustment(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="flex justify-between font-bold text-base border-t pt-2">
                                <span>Final Payout</span>
                                <span>${adjustedNet.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reason for Adjustment</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Textarea placeholder="Provide a clear reason for this adjustment. This will be logged." className="min-h-[120px]" />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 row-start-1 lg:row-start-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tutor Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={payout.tutorAvatar} alt={payout.tutorName} />
                                    <AvatarFallback>{payout.tutorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{payout.tutorName}</p>
                                    <p className="text-sm text-muted-foreground">Tutor ID: {payout.id}</p>
                                </div>
                            </div>
                            <div className="text-sm">
                                <p className="text-muted-foreground">Transactions in this cycle: <strong>{payout.transactions}</strong></p>
                                <p className="text-muted-foreground">AI Risk Level: <strong>{payout.riskLevel}</strong></p>
                            </div>
                             <Button variant="outline" className="w-full">View Tutor Profile</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Reject Payout</Button>
                <Button>Approve & Log Adjustment</Button>
            </div>
        </div>
    );
}
