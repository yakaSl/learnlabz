
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentSummary } from "./payment-summary";
import { InvoiceList } from "./invoice-list";
import { PaymentMethods } from "./payment-methods";
import { PaymentSettings } from "./payment-settings";
import { Wallet, CreditCard, Settings, FileText } from "lucide-react";

export default function PaymentManagement() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments & Billing</h1>
        <p className="text-muted-foreground">Manage your invoices, payment methods, and settings.</p>
      </div>

      <PaymentSummary />

      <Tabs defaultValue="invoices" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="invoices"><FileText className="mr-2"/>Invoices</TabsTrigger>
          <TabsTrigger value="methods"><CreditCard className="mr-2"/>Payment Methods</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-2"/>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-4">
          <InvoiceList />
        </TabsContent>
        <TabsContent value="methods" className="mt-4">
            <PaymentMethods />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
            <PaymentSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
