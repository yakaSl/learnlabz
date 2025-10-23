"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const history = [
  { id: 1, name: "Welcome to New Tutors!", sentDate: "2024-07-22", recipients: "1,204", openRate: 65, clickRate: 12, status: "Sent" },
  { id: 2, name: "Billing Cycle Update", sentDate: "2024-07-20", recipients: "45,231", openRate: 88, clickRate: 5, status: "Sent" },
  { id: 3, name: "Q2 Product Updates", sentDate: "2024-07-15", recipients: "2,350", openRate: 72, clickRate: 25, status: "Sent" },
  { id: 4, name: "Test: A/B Subject Lines", sentDate: "2024-07-14", recipients: "500", openRate: 0, clickRate: 0, status: "Draft" },
];

export function NotificationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>History & Analytics</CardTitle>
        <CardDescription>Track the performance of all sent notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification</TableHead>
                <TableHead>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                        Sent Date
                        <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                </TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sentDate}</TableCell>
                  <TableCell className="text-right">{item.recipients}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={item.openRate} className="h-2 w-20" />
                        <span>{item.openRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Progress value={item.clickRate} className="h-2 w-20" />
                        <span>{item.clickRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Sent' ? "default" : "outline"}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
