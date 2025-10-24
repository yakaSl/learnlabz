
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export function NewExamForm() {
    const [examDate, setExamDate] = React.useState<Date>();

    return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g., Mid-Term Exam" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Instructions</Label>
                            <Textarea id="description" placeholder="Provide clear instructions for the exam..." className="min-h-[150px]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Exam Date & Time</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal", !examDate && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {examDate ? format(examDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={examDate} onSelect={setExamDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>‎</Label> {/* Empty label for alignment */}
                                <Input type="time" defaultValue="09:00" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (minutes)</Label>
                                <Input id="duration" type="number" placeholder="60" />
                            </div>
                                <div className="space-y-2">
                                <Label htmlFor="total-marks">Total Marks</Label>
                                <Input id="total-marks" type="number" placeholder="100" />
                            </div>
                                <div className="space-y-2">
                                <Label htmlFor="passing-marks">Passing Marks</Label>
                                <Input id="passing-marks" type="number" placeholder="40" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                            <CardTitle>Questions</CardTitle>
                            <CardDescription>Add questions to your exam.</CardDescription>
                        </div>
                        <Button variant="outline"><PlusCircle className="mr-2" /> Add Question</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center p-8 border-2 border-dashed rounded-lg">
                            <p>Your questions will appear here.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="shuffle">Shuffle Questions</Label>
                            <Switch id="shuffle" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="webcam">Webcam Proctoring</Label>
                            <Switch id="webcam" />
                        </div>
                            <div className="flex items-center justify-between">
                            <Label htmlFor="fullscreen">Force Full-screen</Label>
                            <Switch id="fullscreen" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
