
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud, Link as LinkIcon, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";

export default function NewAssessmentPage() {
    const [dueDate, setDueDate] = React.useState<Date>();

    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER]}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create New Assessment</h1>
                        <p className="text-muted-foreground">Design and configure a new assignment for your class.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Save className="mr-2" />
                            Save as Draft
                        </Button>
                        <Button>Create Assignment</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="e.g., Quadratic Equations Problem Set" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description / Instructions</Label>
                                    <Textarea id="description" placeholder="Provide clear instructions for your students..." className="min-h-[200px]" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Attachments</CardTitle>
                                <CardDescription>Attach reference materials for this assignment.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center space-y-2">
                                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                    <p className="font-semibold">Drag & drop files here</p>
                                    <p className="text-sm text-muted-foreground">or</p>
                                    <Button type="button" variant="outline" size="sm">Browse Files</Button>
                                </div>
                                 <div className="flex items-center gap-2">
                                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="Or paste an external link (e.g., Google Doc, YouTube)" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="points">Total Points</Label>
                                    <Input id="points" type="number" placeholder="100" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="due-date">Due Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="submission-type">Submission Type</Label>
                                     <Select defaultValue="file">
                                        <SelectTrigger id="submission-type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="file">File Upload</SelectItem>
                                            <SelectItem value="text">Text Entry</SelectItem>
                                            <SelectItem value="both">File and Text</SelectItem>
                                            <SelectItem value="none">No Submission</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Advanced Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="assign-to">Assign To</Label>
                                    <Select defaultValue="all">
                                        <SelectTrigger id="assign-to">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Students</SelectItem>
                                            <SelectItem value="selected">Selected Students</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label>Late Submission Policy</Label>
                                    <Select defaultValue="allow">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="allow">Allow with penalty</SelectItem>
                                            <SelectItem value="disallow">Do not allow</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
