
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Badge } from "@/components/ui/badge";

export function ClassCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Mock data for classes
  const classes = {
    "20": ["Math 101", "History 202"],
    "22": ["Science Fair Prep"],
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Schedule</CardTitle>
        <CardDescription>Upcoming classes and institute events.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8 items-start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="flex-1">
          <h4 className="font-semibold mb-2">Events for {date ? date.toLocaleDateString() : 'today'}</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <div className="w-2 h-10 bg-primary rounded-full" />
                <div>
                    <p className="font-medium">Math 101 with Mr. Doe</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                </div>
            </div>
             <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <div className="w-2 h-10 bg-accent rounded-full" />
                <div>
                    <p className="font-medium">Parent-Teacher Meetings</p>
                    <p className="text-sm text-muted-foreground">All Day</p>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
