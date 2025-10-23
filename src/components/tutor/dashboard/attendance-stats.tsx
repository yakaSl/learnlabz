
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const data = [
  { name: 'Week 1', attendance: 95 },
  { name: 'Week 2', attendance: 92 },
  { name: 'Week 3', attendance: 97 },
  { name: 'Week 4', attendance: 94 },
];

export function AttendanceStats() {
  return (
     <Card>
        <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
            <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
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
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                            cursor={{fill: 'hsla(var(--muted))'}}
                            contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} 
                        />
                        <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
