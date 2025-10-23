
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, CalendarClock, AlertCircle, CheckCircle } from "lucide-react";

export function PaymentSummary() {
  const stats = [
    { title: "Total Paid", value: "$1,250.00", icon: <CheckCircle className="text-success-foreground" />, description: "Across 5 invoices" },
    { title: "Pending Amount", value: "$300.00", icon: <CalendarClock />, description: "1 invoice due soon" },
    { title: "Overdue Amount", value: "$75.00", icon: <AlertCircle className="text-destructive" />, description: "1 invoice overdue" },
    { title: "Next Due Date", value: "Aug 15, 2024", icon: <CalendarClock />, description: "For Physics 101" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
