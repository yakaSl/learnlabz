"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const areaData = [
  { date: "Jan", users: 4000, pv: 2400 },
  { date: "Feb", users: 3000, pv: 1398 },
  { date: "Mar", users: 2000, pv: 9800 },
  { date: "Apr", users: 2780, pv: 3908 },
  { date: "May", users: 1890, pv: 4800 },
  { date: "Jun", users: 2390, pv: 3800 },
];

const barData = [
    { name: "Free", revenue: 4567, fill: "hsl(var(--chart-1))" },
    { name: "Basic", revenue: 8765, fill: "hsl(var(--chart-2))" },
    { name: "Premium", revenue: 12456, fill: "hsl(var(--chart-3))" },
    { name: "Enterprise", revenue: 2345, fill: "hsl(var(--chart-4))" },
]

const pieData = [
    { name: 'Tutors', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Students', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Admins', value: 300, fill: 'hsl(var(--chart-3))' },
]

function WidgetHeader({title, description}: {title:string, description?:string}) {
    return (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </CardHeader>
    )
}

export function AreaChartWidget() {
  return (
     <Card>
        <WidgetHeader title="User Growth Over Time" />
        <CardContent className="pb-4">
            <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                        <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                        <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}

export function BarChartWidget() {
  return (
     <Card>
        <WidgetHeader title="Revenue by Tier" />
        <CardContent>
            <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} >
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                        <Tooltip cursor={{fill: 'hsla(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                        <Bar dataKey="revenue" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}


export function PieChartWidget() {
  return (
     <Card className="flex flex-col">
        <WidgetHeader title="User Role Distribution" />
        <CardContent className="flex-1 pb-4">
            <div className="h-[240px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip cursor={{fill: 'hsla(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}
