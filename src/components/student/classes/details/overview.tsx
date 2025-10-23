
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Class } from "../data";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
    classInfo: Class;
}

export default function OverviewTab({ classInfo }: OverviewTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Class Overview</CardTitle>
                        <CardDescription>Welcome to {classInfo.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This is a placeholder for the class description and overview content.</p>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Next Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold">{classInfo.nextSession}</p>
                        <p className="text-sm text-muted-foreground">Countdown: 2h 15m</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Announcements</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm">Mid-term exam has been scheduled for next Friday.</p>
                       <Button variant="link" className="p-0 h-auto mt-2">View all</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
