"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Download,
  PlusCircle,
  Banknote,
  AlertTriangle,
  User,
  FileText,
} from "lucide-react";
import React from "react";
import { RecordPaymentDialog } from "./record-payment-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { paymentHistory, payoutHistory } from "./data";
import { StudentPaymentsTable, columns } from "./student-payments-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/hooks/use-context";
import { InstituteIncomeView } from "./institute-income-view";

function PersonalPaymentsView() {
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = React.useState(false);
  const areBankDetailsMissing = true; // Mock state
  
  return (
     <>
      <RecordPaymentDialog
        open={isRecordPaymentOpen}
        onOpenChange={setIsRecordPaymentOpen}
      />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Earnings & Payouts
          </h1>
          <p className="text-muted-foreground">
            Track your income, manage payouts, and view payment history.
          </p>
        </div>

        {areBankDetailsMissing && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Action Required: Add Your Payout Details</AlertTitle>
            <AlertDescription>
              We cannot process your payouts until you add your bank account
              information.
              <Button
                asChild
                variant="link"
                className="p-0 pl-2 h-auto text-destructive-foreground"
              >
                <Link href="/teacher/settings">Update Settings Now</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,820.50</div>
              <p className="text-xs text-muted-foreground">
                +8.2% vs last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$980.00</div>
              <p className="text-xs text-muted-foreground">
                Next payout in 5 days
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Offline Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => setIsRecordPaymentOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Record a Payment
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="student-payments">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="student-payments"><User className="mr-2"/>Student Payments</TabsTrigger>
                <TabsTrigger value="payout-history"><FileText className="mr-2"/>Payout History</TabsTrigger>
            </TabsList>
            <TabsContent value="student-payments" className="mt-4">
                <StudentPaymentsTable columns={columns} data={paymentHistory} />
            </TabsContent>
            <TabsContent value="payout-history" className="mt-4">
                 <Card>
                  <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                    <CardDescription>
                      A record of all payouts to your bank account.
                    </CardDescription>
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
                                  <p className="font-semibold text-base">
                                    Net Payout: ${payout.net.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {payout.date}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  payout.status === "Completed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {payout.status}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 bg-muted/50 border-t">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Gross Income
                                </span>
                                <span>${payout.gross.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Platform Fees (5%)
                                </span>
                                <span className="text-destructive">
                                  - ${payout.fees.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                                <span>Net Payout</span>
                                <span>${payout.net.toFixed(2)}</span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4 w-full"
                            >
                              <Download className="mr-2" /> Download Detailed
                              Report
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default function Payments() {
    const { selectedContext } = useAppContext();

    if (selectedContext.type === 'institute') {
        return <InstituteIncomeView />;
    }

    return <PersonalPaymentsView />;
}
