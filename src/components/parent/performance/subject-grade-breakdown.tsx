
"use client"

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { subjectBreakdownData } from "./data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SubjectGradeBreakdown() {
  const [showAverage, setShowAverage] = useState(true);

  return (
     <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                 <div>
                    <CardTitle>Grade Breakdown by Subject</CardTitle>
                    <CardDescription>Alex's performance compared to the class average.</CardDescription>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch 
                        id="compare-average" 
                        checked={showAverage}
                        onCheckedChange={setShowAverage}
                    />
                    <Label htmlFor="compare-average">Compare to Average</Label>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectBreakdownData}>
                        <XAxis
                            dataKey="subject"
                            stroke="#888888"
                            fontSize={12}
                        />
                        <YAxis 
                            domain={[50, 100]}
                            stroke="#888888"
                            fontSize={12}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                            cursor={{fill: 'hsla(var(--muted))'}}
                            contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} 
                        />
                        <Legend />
                        <Bar dataKey="student" name="Alex's Grade" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        {showAverage && <Bar dataKey="average" name="Class Average" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
