
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { attendanceData } from "./data";
import type { AttendanceStatus } from "./data";

const statusVariants: Record<AttendanceStatus, "destructive" | "secondary" | "outline"> = {
    Absent: "destructive",
    Late: "secondary",
    Excused: "outline",
    Present: "default" as any, // This won't be shown, but satisfies the type
};

export function AbsenceHistory() {
  const absences = attendanceData.filter(d => d.status === 'Absent' || d.status === 'Late' || d.status === 'Excused');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Absence & Late History</CardTitle>
        <CardDescription>A log of all recorded absences and late arrivals.</CardDescription>
      </CardHeader>
      <CardContent>
         <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reason</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {absences.map(item => (
                        <TableRow key={item.date}>
                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                            <TableCell>{item.class}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariants[item.status]}>{item.status}</Badge>
                            </TableCell>
                            <TableCell>{item.reason || item.tutorComment || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
         </div>
      </CardContent>
    </Card>
  );
}
