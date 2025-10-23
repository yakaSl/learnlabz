
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingUp, AlertTriangle } from "lucide-react";

export function SummaryCards() {
  const stats = [
    { title: "Overall Attendance", value: "92%", icon: <BadgePercent /> },
    { title: "Attendance Streak", value: "8 Days", icon: <TrendingUp /> },
    { title: "Unexcused Absences", value: "2", icon: <AlertTriangle /> },
    { title: "AI Impact Prediction", value: "GPA may drop by 2%", icon: <AlertTriangle className="text-yellow-500" /> },
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
