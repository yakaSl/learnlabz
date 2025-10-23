"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const reportTemplates = [
    { name: "Student Progress Report", description: "Individual student performance over time." },
    { name: "Class Attendance Summary", description: "Weekly and monthly attendance trends." },
    { name: "Earnings & Payouts", description: "A summary of your financial activity." },
];

export default function ReportsAnalytics() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate reports to track student progress and your earnings.</p>
        </div>
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Generate a New Report</CardTitle>
                        <CardDescription>Choose a template and configure your report.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Create Custom Report</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="md:col-span-2">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a report template..." />
                        </SelectTrigger>
                        <SelectContent>
                            {reportTemplates.map((template, index) => (
                                <SelectItem key={index} value={template.name}>{template.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select date range..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                             <SelectItem value="30d">Last 30 Days</SelectItem>
                             <SelectItem value="90d">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="w-full"><FileText className="mr-2"/> Generate</Button>
                    <Button variant="outline" className="w-full"><Download className="mr-2"/> Export</Button>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>AI Executive Summary</CardTitle>
                <CardDescription>A quick overview of trends and key insights from your data.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                    Your overall student performance has increased by 5% this month, with the 'Algebra 101' class showing the most significant improvement. However, attendance in 'Physics for Beginners' has dropped slightly. Consider sending a reminder or a quick survey. Revenue is on track to exceed last month's by approximately 8%.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
