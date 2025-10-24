"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type Log = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  ip: string;
  status: "Success" | "Failed";
  severity: "Info" | "Warning" | "Error" | "Critical";
  details: Record<string, any>;
};

const logs: Log[] = [
  { id: "1", timestamp: "2024-07-28 10:30:15", user: "admin@learnlabz.com", action: "UPDATE_SETTINGS", entity: "SystemConfig", ip: "192.168.1.1", status: "Success", severity: "Info", details: { new_values: { maintenance_mode: false } } },
  { id: "2", timestamp: "2024-07-28 10:25:05", user: "jane.smith@example.com", action: "SUSPEND_INSTITUTE", entity: "Institute:5", ip: "203.0.113.45", status: "Success", severity: "Warning", details: { reason: "Payment overdue" } },
  { id: "3", timestamp: "2024-07-28 10:22:40", user: "system", action: "PROCESS_PAYOUTS", entity: "CronJob", ip: "N/A", status: "Failed", severity: "Error", details: { error: "Stripe API connection failed", failed_payouts: 12 } },
  { id: "4", timestamp: "2024-07-28 10:15:10", user: "unknown", action: "LOGIN_ATTEMPT", entity: "Auth", ip: "101.102.103.104", status: "Failed", severity: "Critical", details: { reason: "Multiple failed attempts from same IP" } },
];

const severityColors = {
  Info: "bg-blue-500",
  Warning: "bg-yellow-500",
  Error: "bg-red-500",
  Critical: "bg-red-700 font-bold",
};

export function LogTable() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
     <div>
        <div className="flex items-center justify-end space-x-2 mb-4">
            <Label htmlFor="real-time">Real-time</Label>
            <Switch id="real-time" />
        </div>
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {logs.map((log) => (
                <React.Fragment key={log.id}>
                    <TableRow className="cursor-pointer" onClick={() => toggleRow(log.id)}>
                        <TableCell>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                {expanded[log.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>
                            <Badge className={cn("text-white", severityColors[log.severity])}>{log.severity}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                             <Badge variant={log.status === "Success" ? "default" : "destructive"}>{log.status}</Badge>
                        </TableCell>
                    </TableRow>
                    {expanded[log.id] && (
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell colSpan={6} className="p-0">
                                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Entity:</strong> {log.entity}</div>
                                    <div><strong>IP Address:</strong> {log.ip}</div>
                                    <div className="col-span-2">
                                        <strong>Details:</strong>
                                        <pre className="mt-1 p-2 bg-background rounded-md text-xs font-mono">{JSON.stringify(log.details, null, 2)}</pre>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            ))}
            </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-center py-4">
            <Button variant="outline">Load More</Button>
        </div>
     </div>
  );
}
