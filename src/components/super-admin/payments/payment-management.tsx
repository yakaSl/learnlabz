"use client";

import { RevenueSummary } from "./revenue-summary";
import { TransactionTable } from "./transaction-table";
import { PayoutCalendar } from "./payout-calendar";
import { FraudAlerts } from "./fraud-alerts";
import { FilterSidebar } from "./filter-sidebar";

export default function PaymentManagement() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment & Payout Management</h1>
        <p className="text-muted-foreground">Monitor transactions, manage payouts, and detect fraud.</p>
      </div>
      <RevenueSummary />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
            <TransactionTable />
        </div>
        <div className="lg:col-span-3">
            <div className="space-y-8">
                <FilterSidebar />
                <PayoutCalendar />
                <FraudAlerts />
            </div>
        </div>
      </div>
    </div>
  );
}
