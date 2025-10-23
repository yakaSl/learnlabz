"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";
import { PayoutCalendarView } from "./payout-calendar-view";

export function PayoutCalendar() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Schedule</CardTitle>
        <CardDescription>Upcoming automatic payout dates.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 md:pt-0">
        <PayoutCalendarView />
      </CardContent>
    </Card>
  );
}
