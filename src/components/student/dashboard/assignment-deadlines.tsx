
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/app/lib/utils";

const assignments = [
  { id: 1, title: "Calculus Homework", due: "in 2 days", urgency: "red" },
  { id: 2, title: "History Essay", due: "in 6 days", urgency: "yellow" },
  { id: 3, title: "Physics Project Proposal", due: "in 10 days", urgency: "green" },
];

export function AssignmentDeadlines() {
    const urgencyColors: { [key: string]: string } = {
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        green: 'bg-green-500'
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Don't miss these!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {assignments.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-md border">
            <div className={cn("h-3 w-3 rounded-full", urgencyColors[item.urgency])} />
            <p className="flex-1 font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.due}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
