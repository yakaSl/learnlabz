"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Cpu, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
    { id: 1, icon: <AlertTriangle className="text-destructive" />, title: 'Anomaly Detected', description: 'Unusual sign-up spike from a new region.', time: '5m ago', severity: 'High' },
    { id: 2, icon: <Cpu className="text-warning-foreground" />, title: 'High CPU Usage', description: 'API server instance #3 is at 92% utilization.', time: '30m ago', severity: 'Medium' },
    { id: 3, icon: <Bell className="text-info-foreground" />, title: 'New Feature Deployed', description: 'AI-powered reporting is now live for all institutes.', time: '2h ago', severity: 'Low' },
]

export function AlertPanel() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Alerts & Notifications</CardTitle>
                    <CardDescription>Critical system and AI-powered alerts.</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="grid gap-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-4">
                        <div className="mt-1">
                            {alert.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">{alert.title}</p>
                                <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary': 'outline'}>{alert.severity}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
