"use client";

import { RevenueSummary } from "./revenue-summary";
import { TransactionTable } from "./transaction-table";
import { PayoutCalendar } from "./payout-calendar";
import { FraudAlerts } from "./fraud-alerts";
import { FilterSidebar } from "./filter-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PaymentManagement() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment & Payout Management</h1>
        <p className="text-muted-foreground">Monitor transactions, manage payouts, and detect fraud.</p>
      </div>
      <RevenueSummary />

      <Tabs defaultValue="transactions" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payout Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-9">
                    <TransactionTable />
                </div>
                <div className="lg:col-span-3">
                    <div className="space-y-8">
                        <FilterSidebar />
                        <FraudAlerts />
                    </div>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="payouts" className="mt-4">
            <Card>
                <CardHeader>
                    {/* The PayoutCalendar already has a header, so we can leave this empty or add a more general title if needed */}
                </CardHeader>
                <CardContent>
                    <PayoutCalendar />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
