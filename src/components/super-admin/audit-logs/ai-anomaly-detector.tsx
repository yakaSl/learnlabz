/** @jsxImportSource react */
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const anomalies = [
    { id: 1, text: "Unusual login pattern detected for 'admin@learnlabz.com' from a new country (Norway).", time: "5m ago" },
    { id: 2, text: "High rate of failed payment attempts from IP address 123.45.67.89.", time: "1h ago" },
    { id: 3, text: "A user successfully changed their role from 'Student' to 'Tutor' without admin approval.", time: "3h ago" },
];

export function AiAnomalyDetector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Anomaly Detection</CardTitle>
        <CardDescription>Security threats identified in logs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {anomalies.map(anomaly => (
            <div key={anomaly.id} className="flex items-start gap-3">
                <ShieldAlert className="h-6 w-6 mt-1 text-destructive flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm font-medium">{anomaly.text}</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">{anomaly.time}</p>
                        <Button variant="ghost" size="sm" className="h-7">Investigate</Button>
                    </div>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
