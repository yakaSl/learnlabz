
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AttendanceSessionDialog } from "./attendance-session-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";

const pastSessions = [
  { date: "July 26, 2024", present: 11, total: 12, attendance: "92%" },
  { date: "July 24, 2024", present: 12, total: 12, attendance: "100%" },
  { date: "July 22, 2024", present: 10, total: 12, attendance: "83%" },
];


export default function AttendanceTab() {
  const [isSessionOpen, setIsSessionOpen] = useState(false);

    return (
        <div className="space-y-6">
            <AttendanceSessionDialog isOpen={isSessionOpen} onOpenChange={setIsSessionOpen} />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Live Attendance</CardTitle>
                        <CardDescription>Start a new session to mark today's attendance.</CardDescription>
                    </div>
                    <Button onClick={() => setIsSessionOpen(true)}>Start Live Attendance Session</Button>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Past Attendance Records</CardTitle>
                    <CardDescription>A history of previous attendance sessions for this class.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Attendance</TableHead>
                                    <TableHead>Ratio</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastSessions.map(session => (
                                    <TableRow key={session.date}>
                                        <TableCell className="font-medium">{session.date}</TableCell>
                                        <TableCell>{session.attendance}</TableCell>
                                        <TableCell>{session.present}/{session.total}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <FileText className="mr-2 h-4 w-4" />
                                                View Report
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
