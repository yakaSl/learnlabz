
"use client";

import { Student } from "../data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart, BookOpen, TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";

const gradeData = [
  { name: 'Jan', grade: 82 },
  { name: 'Feb', grade: 85 },
  { name: 'Mar', grade: 81 },
  { name: 'Apr', grade: 88 },
  { name: 'May', grade: 90 },
  { name: 'Jun', grade: 92 },
];

const deadlines = [
  { title: "Calculus Homework", due: "in 2 days", urgency: "High" },
  { title: "History Essay", due: "in 6 days", urgency: "Medium" },
];

export function OverviewTab({ student }: { student: Student }) {
    const getPerformanceIcon = (level: Student['performanceLevel']) => {
        if (level === 'Exceeding') return <TrendingUp className="text-success-foreground" />;
        if (level === 'At Risk') return <TrendingDown className="text-destructive" />;
        return <BarChart />;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Performance Level</CardTitle>
                            {getPerformanceIcon(student.performanceLevel)}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{student.performanceLevel}</div>
                            <p className="text-xs text-muted-foreground">+2% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{student.attendance}%</div>
                             <p className="text-xs text-muted-foreground">Overall attendance rate</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                            <BookOpen />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{student.classes.length}</div>
                             <p className="text-xs text-muted-foreground">Currently enrolled</p>
                        </CardContent>
                    </Card>
                 </div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Grade Trend</CardTitle>
                        <CardDescription>Last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={gradeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                                    <YAxis domain={[70, 100]} stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                    <Line type="monotone" dataKey="grade" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                 </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900"><AlertTriangle className="text-amber-600"/> At Risk Alert</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-amber-800">
                       <p>{student.name} is currently at risk in 'Creative Writing'. Consider scheduling a check-in.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {deadlines.map((item) => (
                        <div key={item.title} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.due}</p>
                            </div>
                            <Badge variant={item.urgency === 'High' ? 'destructive' : 'secondary'}>{item.urgency}</Badge>
                        </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent" /> AI Suggestion</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <p>Based on recent performance, {student.name} would benefit from extra practice in 'Quadratic Equations'.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
