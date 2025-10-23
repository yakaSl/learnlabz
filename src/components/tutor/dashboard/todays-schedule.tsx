
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schedule = [
  { id: 1, time: "10:00 AM - 11:00 AM", title: "Algebra 101", students: 12, status: "Upcoming" },
  { id: 2, time: "11:30 AM - 12:30 PM", title: "Physics for Beginners", students: 8, status: "Upcoming" },
  { id: 3, time: "02:00 PM - 03:30 PM", title: "Creative Writing Workshop", students: 5, status: "Upcoming" },
];

export function TodaysSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>You have {schedule.length} classes today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/50">
            <div className="flex flex-col items-center justify-center p-2 rounded-md bg-background w-24">
                <p className="text-sm font-bold">{item.time.split(' - ')[0]}</p>
                <p className="text-xs text-muted-foreground">{item.time.split(' - ')[1]}</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.students} students</p>
            </div>
            <Badge variant={item.status === 'Upcoming' ? 'default' : 'secondary'}>{item.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
