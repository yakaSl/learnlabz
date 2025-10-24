"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LogFilterPanel } from "./log-filter-panel";
import { LogTable } from "./log-table";
import { AiAnomalyDetector } from "./ai-anomaly-detector";

export default function AuditLogViewer() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">Track and review all administrative actions across the platform.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-9">
            <Card>
                <CardHeader>
                    <CardTitle>Log Stream</CardTitle>
                    <CardDescription>A comprehensive record of all system and user activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LogTable />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3 space-y-8">
            <LogFilterPanel />
            <AiAnomalyDetector />
        </div>
      </div>
    </div>
  );
}
