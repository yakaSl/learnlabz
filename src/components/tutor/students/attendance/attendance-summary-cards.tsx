
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingUp, AlertTriangle, BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";
import { attendanceData } from "./data";
import { Student } from "../data";

export function AttendanceSummaryCards({ student }: { student: Student }) {
  const presentCount = attendanceData.filter(d => d.status === 'Present').length;
  const lateCount = attendanceData.filter(d => d.status === 'Late').length;
  const absentCount = attendanceData.filter(d => d.status === 'Absent').length;

  const stats = [
    { title: "Overall Attendance", value: `${student.attendance}%`, icon: <BadgePercent /> },
    { title: "Total Present", value: `${presentCount}`, icon: <CheckCircle /> },
    { title: "Total Late", value: `${lateCount}`, icon: <Clock /> },
    { title: "Total Absent", value: `${absentCount}`, icon: <XCircle /> },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
