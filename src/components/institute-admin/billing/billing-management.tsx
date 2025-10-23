
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const invoices = [
    { id: 'INV-001', student: 'Alice Johnson', amount: 250, status: 'Paid', date: '2024-07-20' },
    { id: 'INV-002', student: 'Bob Williams', amount: 150, status: 'Overdue', date: '2024-07-15' },
    { id: 'INV-003', student: 'David Lee', amount: 200, status: 'Pending', date: '2024-07-22' },
];

export default function BillingManagement() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Payments & Billing</h1>
            <p className="text-muted-foreground">Monitor revenue, manage invoices, and track payments.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$12,540</div>
                    <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
                    <AlertCircle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$1,230</div>
                    <p className="text-xs text-muted-foreground">12 invoices pending</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Collected This Month</CardTitle>
                    <CheckCircle className="h-4 w-4 text-success-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$5,800</div>
                    <p className="text-xs text-muted-foreground">From 45 invoices</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>A list of recent invoices and their status.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.id}</TableCell>
                                    <TableCell>{invoice.student}</TableCell>
                                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
                                            {invoice.status}
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
