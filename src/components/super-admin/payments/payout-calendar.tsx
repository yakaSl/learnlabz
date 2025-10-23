"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export function PayoutCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Example payout dates. In a real app, these would come from an API.
  const payoutDates = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10),
  ];
  
  // Example past payout dates.
  const pastPayoutDates = [
     new Date(new Date().getFullYear(), new Date().getMonth() -1, 25),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Schedule</CardTitle>
        <CardDescription>Upcoming automatic payout dates.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            payout: payoutDates,
            pastPayout: pastPayoutDates,
          }}
          modifiersClassNames={{
            today: "bg-accent text-accent-foreground rounded-full",
            payout: "text-primary font-bold !bg-primary/10 rounded-full",
            pastPayout: "text-muted-foreground !bg-muted/50 rounded-full"
          }}
        />
        <div className="mt-4 space-y-2 text-sm self-start">
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary" />
                <span>Upcoming Payout</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-muted" />
                <span>Past Payout</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-accent" />
                <span>Today</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
