"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { revenue: 10000, subscription: 240 },
  { revenue: 30000, subscription: 139 },
  { revenue: 20000, subscription: 980 },
  { revenue: 27800, subscription: 390 },
  { revenue: 18900, subscription: 480 },
  { revenue: 23900, subscription: 380 },
  { revenue: 34900, subscription: 430 },
  { revenue: 20000, subscription: 980 },
  { revenue: 27800, subscription: 390 },
  { revenue: 18900, subscription: 480 },
  { revenue: 23900, subscription: 380 },
  { revenue: 34900, subscription: 430 },
]

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
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly platform revenue analysis.</CardDescription>
            </div>
            <Select defaultValue="30d">
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last 1 Year</SelectItem>
                </SelectContent>
            </Select>
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
