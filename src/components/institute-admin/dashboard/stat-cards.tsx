
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, DollarSign } from "lucide-react";

export function StatCards() {
  const stats = [
    { title: "Total Students", value: "1,500", change: "+120 this month", icon: <GraduationCap className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Tutors", value: "42", change: "+5 this month", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Classes", value: "89", change: "12 upcoming", icon: <BookOpen className="h-4 w-4 text-muted-foreground" /> },
    { title: "Monthly Revenue", value: "$12,540", change: "+8.2% vs last month", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            <p className="text-xs text-muted-foreground">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
