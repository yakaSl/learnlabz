
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Class } from "../data";

interface OverviewTabProps {
    classInfo: Class;
}

export default function OverviewTab({ classInfo }: OverviewTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Class Overview</CardTitle>
                <CardDescription>A summary of the class details and performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Overview for {classInfo.name} coming soon.</p>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enrollment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{classInfo.enrolled} / {classInfo.capacity}</p>
                            <p className="text-xs text-muted-foreground">students</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">94%</p>
                             <p className="text-xs text-muted-foreground">+2% from last week</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>AI Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Student engagement is high. Consider adding a new advanced topic next week.</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}
