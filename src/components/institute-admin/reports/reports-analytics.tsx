
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle } from 'lucide-react';

const reportTemplates = [
    { name: "Monthly Attendance", description: "Detailed student attendance records." },
    { name: "Tutor Performance", description: "Ratings and feedback for each tutor." },
    { name: "Class Revenue", description: "Financial summary for all classes." },
];

export default function ReportsAndAnalytics() {
  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
                <p className="text-muted-foreground">Generate and view reports for your institute.</p>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Custom Report</Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Report Gallery</CardTitle>
                <CardDescription>Choose from a variety of templates to get started.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((template, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <FileText className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>{template.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{template.description}</p>
                        </CardContent>
                        <CardContent>
                             <Button variant="outline">Generate Report</Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
