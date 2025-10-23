
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function StudentsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage the students enrolled in this class.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Student list and performance indicators coming soon.</p>
            </CardContent>
        </Card>
    )
}
