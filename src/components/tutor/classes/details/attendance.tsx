
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AttendanceTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>Track and manage student attendance.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Attendance calendar with mark/edit capability coming soon.</p>
            </CardContent>
        </Card>
    )
}
