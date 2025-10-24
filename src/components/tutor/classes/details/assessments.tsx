
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, MoreVertical, CheckCircle, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const assessments = [
    { id: 1, title: "Mid-Term Quiz", type: "MCQ", status: "Graded", submissions: 12, average: "85%" },
    { id: 2, title: "Homework 3", type: "Short Answer", status: "Pending", submissions: 10, average: "N/A" },
    { id: 3, title: "Final Project", type: "File Upload", status: "Draft", submissions: 0, average: "N/A" },
]

export default function AssessmentsTab({ classId }: { classId: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Assessments</CardTitle>
                    <CardDescription>Create, manage, and grade quizzes, homework, and tests.</CardDescription>
                </div>
                 <Button asChild>
                    <Link href={`/tutor/classes/${classId}/assessments/new`}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Assessment
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {assessments.map(item => (
                     <Card key={item.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.type}</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                                <BarChart className="h-4 w-4" />
                                <span>Avg: {item.average}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Badge variant={item.status === 'Graded' ? 'default' : 'secondary'}>{item.status}</Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/tutor/classes/${classId}/assessments/${item.id}`}>
                                        Grade ({item.submissions})
                                    </Link>
                                </Button>
                                 <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">AI suggestion: Create a short quiz on 'Newton's Laws' to reinforce learning before the mid-term.</p>
            </CardFooter>
        </Card>
    )
}
