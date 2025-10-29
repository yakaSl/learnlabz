"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tasks = [
    { id: 'task1', text: "Mark attendance for 'Algebra 101' at 10:00 AM", completed: false, class: "Algebra 101", action: "Mark Attendance" },
    { id: 'task2', text: "Prepare and print worksheets for 'Physics for Beginners'", completed: false, class: "Physics", action: "View Materials" },
    { id: 'task3', text: "Email parents of students with overdue assignments", completed: true, class: "General", action: "View History" },
];

export function TaskList() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>A list of tasks assigned to you by your tutor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                        <Checkbox id={task.id} checked={task.completed} />
                        <div className="flex-1">
                            <Label htmlFor={task.id} className="text-sm font-medium">
                                {task.text}
                            </Label>
                        </div>
                        <Badge variant="outline">{task.class}</Badge>
                        <Button variant="outline" size="sm">{task.action}</Button>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="border-t pt-4">
                 <Button variant="ghost" disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Task (Tutor Only)
                </Button>
            </CardFooter>
        </Card>
    );
}
