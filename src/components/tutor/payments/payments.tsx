
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const paymentHistory = [
  { id: 'pay_1', student: 'Alice Johnson', class: 'Algebra 101', amount: 50, date: '2024-07-20', status: 'Paid' },
  { id: 'pay_2', student: 'Diana Miller', class: 'Physics', amount: 75, date: '2024-07-18', status: 'Paid' },
  { id: 'pay_3', student: 'Bob Williams', class: 'Algebra 101', amount: 50, date: '2024-07-15', status: 'Pending' },
];

const payoutHistory = [
    { id: 'payout_1', date: '2024-07-15', amount: 850.50, status: 'Completed' },
    { id: 'payout_2', date: '2024-06-15', amount: 920.00, status: 'Completed' },
]

export default function Payments() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Earnings & Payouts</h1>
            <p className="text-muted-foreground">Track your income, manage payouts, and view payment history.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Month's Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$1,820.50</div>
                    <p className="text-xs text-muted-foreground">+8.2% vs last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$980.00</div>
                    <p className="text-xs text-muted-foreground">Next payout in 5 days</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Student Payment History</CardTitle>
                    <CardDescription>A record of all payments received from students.</CardDescription>
                </div>
                <Button variant="outline" size="sm"><Download className="mr-2"/>Export</Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentHistory.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.student}</TableCell>
                                    <TableCell>{payment.class}</TableCell>
                                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                                            {payment.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>A record of all payouts to your bank account.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {payoutHistory.map((payout) => (
                                <TableRow key={payout.id}>
                                    <TableCell>{payout.date}</TableCell>
                                    <TableCell>${payout.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={payout.status === 'Completed' ? 'default' : 'secondary'}>
                                            {payout.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
