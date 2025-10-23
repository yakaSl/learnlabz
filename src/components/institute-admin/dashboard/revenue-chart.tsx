
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const monthData = [
  { name: 'Jan', revenue: 4500 },
  { name: 'Feb', revenue: 4800 },
  { name: 'Mar', revenue: 5200 },
  { name: 'Apr', revenue: 5000 },
  { name: 'May', revenue: 5500 },
  { name: 'Jun', revenue: 6000 },
]

export function RevenueChart() {
  return (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="pb-4">
            <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthData}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value/1000}k`}
                        />
                        <Tooltip 
                            cursor={{fill: 'hsla(var(--muted))'}}
                            contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} 
                        />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
