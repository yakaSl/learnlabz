
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Clock } from "lucide-react";

export function EarningsSummary() {
  const stats = [
    { title: "This Week", value: "$450.00", change: "+10% vs last week", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
    { title: "This Month", value: "$1,820.50", change: "+8.2% vs last month", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Pending", value: "$980.00", change: "Next payout in 5 days", icon: <Clock className="h-4 w-4 text-muted-foreground" /> },
    { title: "All-Time Earnings", value: "$22,340.00", change: "", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
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
