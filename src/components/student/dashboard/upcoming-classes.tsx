
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const schedule = [
  { id: 1, time: "10:00 AM", title: "Algebra 101", status: "Starts in 30 mins" },
  { id: 2, time: "11:30 AM", title: "Physics for Beginners", status: "Starts in 2 hours" },
  { id: 3, time: "02:00 PM", title: "Creative Writing Workshop", status: "Starts in 5 hours" },
];

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Classes</CardTitle>
        <CardDescription>Here's what's on your schedule for today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/50">
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background w-24">
                <p className="text-sm font-bold">{item.time}</p>
                <p className="text-xs text-muted-foreground">{item.status}</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
            </div>
            <Button>Join Class</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
