"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
    { id: 1, title: 'High-risk transaction', description: 'From txn_7 on new account.', severity: 'High' },
    { id: 2, title: 'Multiple failed payments', description: 'User Jane Smith (user_2).', severity: 'Medium' },
    { id: 3, title: 'Unusual payout location', description: 'Payout for user_45.', severity: 'Low' },
]

export function FraudAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>AI-powered fraud alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 mt-1 text-destructive" />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-sm">{alert.title}</p>
                                <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'}>{alert.severity}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
