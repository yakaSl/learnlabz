
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Calendar } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const students = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/s1/40/40' },
  { id: '2', name: 'Bob Williams', avatar: 'https://picsum.photos/seed/s2/40/40' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/s3/40/40' },
  { id: '4', name: 'Diana Miller', avatar: 'https://picsum.photos/seed/s4/40/40', isAbsent: true },
];

export default function AttendanceTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance for July 26, 2024</CardTitle>
                <CardDescription>Track and manage student attendance for each session.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Change Date</Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">Mark All Present</Button>
                        <Button variant="outline">Mark All Absent</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {students.map(student => (
                        <div key={student.id} className="flex items-center gap-4 p-3 rounded-md border">
                            <Checkbox id={`student-${student.id}`} className="h-5 w-5" defaultChecked={!student.isAbsent} />
                            <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Label htmlFor={`student-${student.id}`} className="flex-1 font-medium">{student.name}</Label>
                            <Input placeholder="Add a note..." className="w-1/3" />
                        </div>
                    ))}
                </div>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>AI Chronic Absence Alert</AlertTitle>
                    <AlertDescription>
                        Diana Miller has been absent for 3 consecutive sessions. Consider reaching out to the parent.
                    </AlertDescription>
                </Alert>

                 <div className="flex items-center justify-end">
                    <Button>Save Attendance</Button>
                </div>

            </CardContent>
        </Card>
    )
}
