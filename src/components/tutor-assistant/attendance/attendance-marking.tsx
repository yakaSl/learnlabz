
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Check, X, AlertCircle } from "lucide-react";
import { students } from "./data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AttendanceMarking() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Mark Attendance</h1>
                <p className="text-muted-foreground">Submit today's attendance for tutor review.</p>
            </div>
            
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Pending Review</AlertTitle>
                <AlertDescription>
                    The attendance for 'Algebra 101' on July 25, 2024 is awaiting tutor approval.
                </AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader>
                    <CardTitle>Attendance for Algebra 101 - July 26, 2024</CardTitle>
                    <CardDescription>Select the status for each student and add notes if necessary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="outline">Mark All Present</Button>
                        <Button variant="outline">Mark All Absent</Button>
                    </div>
                    <div className="space-y-4">
                        {students.map(student => (
                            <div key={student.id} className="flex flex-col md:flex-row md:items-center gap-4 p-3 rounded-md border">
                                <div className="flex items-center gap-3 flex-1">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={student.avatar} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{student.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                     <RadioGroup defaultValue="present" className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="present" id={`${student.id}-present`} />
                                            <Label htmlFor={`${student.id}-present`} className="flex items-center gap-2 text-green-600"><Check /> Present</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="absent" id={`${student.id}-absent`} />
                                            <Label htmlFor={`${student.id}-absent`} className="flex items-center gap-2 text-red-600"><X /> Absent</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <Input placeholder="Add a note (e.g., arrived late)..." className="flex-1 md:flex-auto md:w-1/3" />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Submit for Tutor Review</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
