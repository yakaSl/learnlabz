
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle, Banknote, AlertTriangle } from "lucide-react";
import React from "react";
import { RecordPaymentDialog } from "./record-payment-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const paymentHistory = [
  { id: 'pay_1', student: 'Alice Johnson', class: 'Algebra 101', amount: 50, date: '2024-07-20', status: 'Paid' },
  { id: 'pay_2', student: 'Diana Miller', class: 'Physics', amount: 75, date: '2024-07-18', status: 'Paid' },
  { id: 'pay_3', student: 'Bob Williams', class: 'Algebra 101', amount: 50, date: '2024-07-15', status: 'Pending' },
];

const payoutHistory = [
    { id: 'payout_1', date: 'July 15, 2024', gross: 920.00, fees: 46.00, net: 874.00, status: 'Completed' },
    { id: 'payout_2', date: 'July 8, 2024', gross: 850.50, fees: 42.53, net: 807.97, status: 'Completed' },
    { id: 'payout_3', date: 'July 1, 2024', gross: 980.00, fees: 49.00, net: 931.00, status: 'Completed' },
]

export default function Payments() {
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = React.useState(false);
  const areBankDetailsMissing = true; // Mock state

  return (
    <>
      <RecordPaymentDialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen} />
      <div className="flex flex-col gap-8">
          <div>
              <h1 className="text-2xl font-bold tracking-tight">Earnings & Payouts</h1>
              <p className="text-muted-foreground">Track your income, manage payouts, and view payment history.</p>
          </div>
          
          {areBankDetailsMissing && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Action Required: Add Your Payout Details</AlertTitle>
                <AlertDescription>
                    We cannot process your payouts until you add your bank account information.
                    <Button asChild variant="link" className="p-0 pl-2 h-auto text-destructive-foreground">
                        <Link href="/tutor/settings">Update Settings Now</Link>
                    </Button>
                </AlertDescription>
            </Alert>
          )}

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
              <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Record Offline Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={() => setIsRecordPaymentOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Record a Payment
                    </Button>
                </CardContent>
              </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                          <CardTitle>Student Payment History</CardTitle>
                          <CardDescription>Recent payments from students.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm"><Download className="mr-2"/>Export</Button>
                  </CardHeader>
                  <CardContent>
                      <div className="border rounded-md">
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Student</TableHead>
                                      <TableHead>Amount</TableHead>
                                      <TableHead>Status</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {paymentHistory.map((payment) => (
                                      <TableRow key={payment.id}>
                                          <TableCell>{payment.student}</TableCell>
                                          <TableCell>${payment.amount.toFixed(2)}</TableCell>
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
                      <Accordion type="single" collapsible className="w-full">
                          {payoutHistory.map((payout) => (
                            <AccordionItem value={`item-${payout.id}`} key={payout.id}>
                                <AccordionTrigger className="p-3">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-4">
                                            <Banknote className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="font-semibold text-base">Net Payout: ${payout.net.toFixed(2)}</p>
                                                <p className="text-sm text-muted-foreground">{payout.date}</p>
                                            </div>
                                        </div>
                                         <Badge variant={payout.status === 'Completed' ? 'default' : 'secondary'}>
                                            {payout.status}
                                        </Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 bg-muted/50 border-t">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Gross Income</span>
                                            <span>${payout.gross.toFixed(2)}</span>
                                        </div>
                                         <div className="flex justify-between">
                                            <span className="text-muted-foreground">Platform Fees (5%)</span>
                                            <span className="text-destructive">- ${payout.fees.toFixed(2)}</span>
                                        </div>
                                         <div className="flex justify-between font-bold border-t pt-2 mt-2">
                                            <span>Net Payout</span>
                                            <span>${payout.net.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-4 w-full">
                                        <Download className="mr-2"/> Download Detailed Report
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                  </CardContent>
              </Card>
          </div>
      </div>
    </>
  );
}
