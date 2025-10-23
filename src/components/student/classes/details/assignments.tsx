
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const assignments = [
    { id: 1, title: 'Algebra Quiz 2', due: 'July 29, 2024', status: 'Graded', grade: 'A-' },
    { id: 2, title: 'Physics Lab Report', due: 'August 5, 2024', status: 'Submitted', grade: null },
    { id: 3, title: 'Writing Essay Draft', due: 'August 10, 2024', status: 'Pending', grade: null },
    { id: 4, title: 'Calculus Homework', due: 'July 25, 2024', status: 'Overdue', grade: null },
];

export default function AssignmentsTab() {

    const getStatusVariant = (status: string) => {
        switch(status) {
            case 'Graded': return 'default';
            case 'Submitted': return 'secondary';
            case 'Pending': return 'outline';
            case 'Overdue': return 'destructive';
            default: return 'outline';
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Track your upcoming and submitted assignments.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {assignments.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-md border">
                            <div className="flex-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                            </div>
                            <div className="flex items-center gap-4">
                               {item.grade && <p className="font-bold text-lg">{item.grade}</p>}
                                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                                <Button variant="outline" size="sm">View</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
