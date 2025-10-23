"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function PredictiveAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Analytics</CardTitle>
        <CardDescription>3-Month Growth Forecast</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <TrendingUp className="h-16 w-16 text-accent" />
        <div className="space-y-1">
          <p className="text-3xl font-bold tracking-tighter">+15.2%</p>
          <p className="text-muted-foreground">Projected User Growth</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold tracking-tighter">+12.8%</p>
          <p className="text-muted-foreground">Projected Revenue Growth</p>
        </div>
        <p className="text-xs text-muted-foreground pt-4">
          Based on current trends and market data.
        </p>
      </CardContent>
    </Card>
  )
}
