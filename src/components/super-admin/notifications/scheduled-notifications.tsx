"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Pause, Play, Clock, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const scheduled = [
  { id: 1, name: "Weekly Newsletter - Edition #24", audience: "All Tutors", sendTime: "July 29, 2024, 10:00 AM UTC", status: "Scheduled" },
  { id: 2, name: "New Feature: AI Analytics", audience: "Premium Institutes", sendTime: "July 28, 2024, 02:00 PM UTC", status: "Scheduled" },
  { id: 3, name: "System Maintenance Alert", audience: "All Users", sendTime: "July 26, 2024, 11:00 PM UTC", status: "Paused" },
];

export function ScheduledNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Notifications</CardTitle>
        <CardDescription>Manage and review all upcoming communications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          {scheduled.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center p-4 border-b last:border-b-0 gap-4 md:gap-0 hover:bg-muted/50">
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                        <Send className="h-3 w-3" />
                        <span>{item.audience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.sendTime}</span>
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={item.status === "Scheduled" ? "default" : "secondary"}>{item.status}</Badge>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {item.status === 'Scheduled' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
