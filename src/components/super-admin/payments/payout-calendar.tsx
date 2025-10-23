"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export function PayoutCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const payoutDates = [new Date(2024, 6, 25), new Date(2024, 7, 10)];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Schedule</CardTitle>
        <CardDescription>Upcoming automatic payout dates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiers={{
            payout: payoutDates,
          }}
          modifiersStyles={{
            payout: {
              border: "2px solid hsl(var(--primary))",
              borderRadius: '9999px',
            },
          }}
        />
        <div className="mt-4 text-sm">
            <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-primary" />
                <span>Scheduled Payout</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span>Today</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
