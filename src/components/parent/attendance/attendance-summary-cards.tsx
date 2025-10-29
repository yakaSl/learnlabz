
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import { attendanceData } from "./data";

export function AttendanceSummaryCards() {
  const presentCount = attendanceData.filter(d => d.status === 'Present' || d.status === 'Late').length;
  const totalCount = attendanceData.length;
  const overallPercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
  const unexcusedAbsences = attendanceData.filter(d => d.status === 'Absent').length;

  const stats = [
    { title: "Overall Attendance", value: `${'\'\'\''}${overallPercentage}%${'\'\'\''}`, icon: <BadgePercent /> },
    { title: "Active Classes", value: "4", icon: <BookOpen /> },
    { title: "Unexcused Absences", value: `${unexcusedAbsences}`, icon: <AlertTriangle /> },
    { title: "Attendance Streak", value: "8 Days", icon: <TrendingUp /> },
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
