
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const alerts = [
    { id: 1, title: 'High-risk transaction', description: 'From txn_7 on new account.', severity: 'High' },
    { id: 2, title: 'Multiple failed payments', description: 'User Jane Smith (user_2).', severity: 'Medium' },
    { id: 3, title: 'Unusual payout location', description: 'Payout for user_45.', severity: 'Low' },
];

const severityStyles = {
    High: { icon: 'text-destructive', badge: 'destructive' as const },
    Medium: { icon: 'text-yellow-500', badge: 'secondary' as const },
    Low: { icon: 'text-blue-500', badge: 'outline' as const },
}


export function FraudAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>AI-powered fraud alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <ShieldAlert className={`h-5 w-5 mt-1 ${severityStyles[alert.severity as keyof typeof severityStyles].icon}`} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{alert.title}</p>
                                <Badge variant={severityStyles[alert.severity as keyof typeof severityStyles].badge}>{alert.severity}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Button size="sm" variant="outline" className="h-7">Investigate</Button>
                                <Button size="sm" variant="ghost" className="h-7">Dismiss</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
