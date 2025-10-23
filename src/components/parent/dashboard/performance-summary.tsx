
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, BarChart, BookOpen } from "lucide-react";

export function PerformanceSummary() {
  const stats = [
    { title: "Attendance", value: "95%", icon: <CheckCircle className="h-4 w-4 text-muted-foreground" /> },
    { title: "Average Grade", value: "A-", icon: <BarChart className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Classes", value: "4", icon: <BookOpen className="h-4 w-4 text-muted-foreground" /> },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
