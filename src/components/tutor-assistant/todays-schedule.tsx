"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const schedule = [
  { id: 1, time: "10:00 AM", title: "Algebra 101", status: "Upcoming" },
  { id: 2, time: "11:30 AM", title: "Physics for Beginners", status: "In Progress" },
  { id: 3, time: "02:00 PM", title: "Creative Writing Workshop", status: "Upcoming" },
];

export function TodaysSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>Read-only view of today's classes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-24">
                <p className="text-sm font-bold">{item.time}</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
            </div>
            <Badge variant={item.status === 'Upcoming' ? 'secondary' : 'default'}>{item.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
