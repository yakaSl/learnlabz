
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { attendanceData } from "./data";
import type { AttendanceStatus } from "./data";
import { ScrollArea } from "@/components/ui/scroll-area";

const statusVariants: Record<AttendanceStatus, "destructive" | "secondary" | "outline" | "default"> = {
    Absent: "destructive",
    Late: "secondary",
    Excused: "outline",
    Present: "default",
};

export function AbsenceHistory() {
  const absences = attendanceData.filter(d => d.status === 'Absent' || d.status === 'Late' || d.status === 'Excused').reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Records</CardTitle>
        <CardDescription>A log of all attendance events.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px]">
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Status</TableHead>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
