
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const schedule = [
  { id: 1, time: "10:00 AM", title: "Algebra 101", tutor: "Mr. John Doe" },
  { id: 2, time: "11:30 AM", title: "Physics for Beginners", tutor: "Mrs. Emily Davis" },
];

export function UpcomingClassesWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Classes</CardTitle>
        <CardDescription>Alex's schedule for today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/50">
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background w-24">
                <p className="text-sm font-bold">{item.time}</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.tutor}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
