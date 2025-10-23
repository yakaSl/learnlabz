"use client"

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { name: 'Jan', users: 200 },
  { name: 'Feb', users: 240 },
  { name: 'Mar', users: 230 },
  { name: 'Apr', users: 260 },
  { name: 'May', users: 300 },
  { name: 'Jun', users: 290 },
]

export function UserGrowthChart() {
  return (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user sign-ups over time.</CardDescription>
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
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--border) / 0.5)" />
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
                        />
                        <Tooltip
                            cursor={{strokeDasharray: '3 3'}}
                            contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} 
                        />
                        <Line type="monotone" dataKey="users" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--accent))" }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
