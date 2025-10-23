"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { gradeTrendData } from "./data";

export function PerformanceTrendChart() {
  return (
     <Card>
        <CardHeader>
            <CardTitle>Grade Trend</CardTitle>
            <CardDescription>Your average grade over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gradeTrendData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="month" 
                            stroke="#888888"
                            fontSize={12}
                        />
                        <YAxis 
                            domain={[70, 100]} 
                            stroke="#888888"
                            fontSize={12}
                        />
                        <Tooltip 
                             contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} 
                        />
                        <Line type="monotone" dataKey="grade" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
