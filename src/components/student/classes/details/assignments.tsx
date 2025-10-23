
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { assignments as allAssignments } from '@/components/student/assignments/data';

const assignments = allAssignments.slice(0,4);


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
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/student/assignments/${item.id}`}>View</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
