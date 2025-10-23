import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Building, DollarSign, TrendingUp } from "lucide-react";

export function StatGrid() {
  const stats = [
    { title: "Total Users", value: "45,231", change: "+20.1% from last month", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Institutes", value: "2,350", change: "+180.1% from last month", icon: <Building className="h-4 w-4 text-muted-foreground" /> },
    { title: "Monthly Revenue", value: "$5,231.89", change: "+19% from last month", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Platform Growth", value: "+573", change: "+201 since last hour", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
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
