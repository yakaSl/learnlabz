
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CalendarDays, DollarSign, PieChart, TrendingUp, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { revenueData, classRevenueData } from "./data";

function SummaryCards() {
    const stats = [
        { title: "Total Revenue", value: "$2,450.50", icon: <DollarSign />, description: "Last 30 days" },
        { title: "Net Income", value: "$2,327.98", icon: <TrendingUp />, description: "After 5% platform fee" },
        { title: "Outstanding Fees", value: "$150.00", icon: <AlertTriangle className="text-destructive"/>, description: "From 2 students" },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function RevenueChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Income Trend</CardTitle>
                <CardDescription>Revenue over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                            <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                            <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                            <Legend />
                            <Line type="monotone" dataKey="gross" stroke="hsl(var(--primary))" name="Gross Revenue" />
                            <Line type="monotone" dataKey="net" stroke="hsl(var(--accent))" name="Net Income" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

function ClassRevenueBreakdown() {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue by Class</CardTitle>
                <CardDescription>See which classes are generating the most income.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={classRevenueData} layout="vertical">
                            <XAxis type="number" stroke="#888888" fontSize={12} tickFormatter={(value) => `$${value}`} />
                            <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} width={120} />
                            <Tooltip cursor={{fill: 'hsla(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                            <Legend />
                            <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}


export default function ReportsAnalytics() {
  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Income & Analytics</h1>
                <p className="text-muted-foreground">Track your earnings and understand business performance.</p>
            </div>
             <div className="flex items-center gap-2">
                <Select defaultValue="30d">
                    <SelectTrigger className="w-auto">
                         <CalendarDays className="mr-2 h-4 w-4" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last 90 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline"><Download className="mr-2"/>Export PDF</Button>
            </div>
        </div>

        <SummaryCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <RevenueChart />
            <ClassRevenueBreakdown />
        </div>
    </div>
  );
}
