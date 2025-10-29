"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, text: "New task assigned: 'Prepare worksheets'", time: "5m ago" },
  { id: 2, text: "Reminder: 'Algebra 101' starts in 15 minutes.", time: "10m ago" },
];

export function Notifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Recent updates and assignments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map(notification => (
            <div key={notification.id} className="flex items-start gap-3">
                <Bell className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm font-medium">{notification.text}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
