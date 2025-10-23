"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash, Clock, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const scheduledReports = [
  { id: 1, name: "Weekly Revenue Roll-up", frequency: "Every Monday at 9 AM", recipients: 3, status: "Active" },
  { id: 2, name: "Daily User Engagement", frequency: "Daily at 6 PM", recipients: 1, status: "Active" },
  { id: 3, name: "Monthly Churn Report", frequency: "1st of every month", recipients: 5, status: "Paused" },
]

export function ReportScheduler() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Configure and automate report distribution.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Scheduled Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          {scheduledReports.map(report => (
            <div key={report.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-muted/50">
              <div className="flex-grow">
                <p className="font-semibold">{report.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.frequency}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Send className="h-3 w-3" />
                        <span>{report.recipients} recipients</span>
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={report.status === "Active" ? "default" : "secondary"}>{report.status}</Badge>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
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
