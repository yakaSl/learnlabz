"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Underline, List, Send, Clock, Lightbulb } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/app/lib/utils";
import { format } from "date-fns";

export function ComposeNotification() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Compose Notification</CardTitle>
            <CardDescription>Craft and target your message.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g., Upcoming Platform Maintenance" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-editor">Message</Label>
                <div className="flex items-center gap-2 p-2 rounded-t-md border bg-muted">
                    <Button variant="outline" size="icon" className="h-8 w-8"><Bold className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Italic className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Underline className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><List className="h-4 w-4" /></Button>
                </div>
                <Textarea
                    id="email-editor"
                    className="min-h-[300px] rounded-t-none"
                    placeholder="Write your notification content here..."
                />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Target Audience</CardTitle>
                <CardDescription>Select who will receive this notification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="audience-type">Audience</Label>
                    <Select defaultValue="all">
                        <SelectTrigger id="audience-type">
                            <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="role">By Role</SelectItem>
                            <SelectItem value="institute">By Institute</SelectItem>
                            <SelectItem value="segment">Custom Segment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Dynamic fields would go here based on selection */}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Scheduling</CardTitle>
                <CardDescription>Send now or schedule for later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <div className="flex items-center gap-2">
                    <Input type="time" defaultValue="09:00" />
                    <span className="text-sm text-muted-foreground">UTC</span>
                </div>
                <div className="p-3 rounded-md bg-accent/10 text-accent border border-accent/20">
                  <p className="text-xs font-medium">AI Suggestion: Optimal send time is <strong>Tuesday at 10:00 AM UTC</strong> for highest engagement.</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">
                    <Clock className="mr-2" />
                    Schedule Notification
                </Button>
                <Button variant="secondary" className="w-full">
                    <Send className="mr-2" />
                    Send Now
                </Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb /> AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <p className="font-medium">Subject Line Ideas:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>"Important Update: Scheduled Platform Maintenance"</li>
                    <li>"Heads Up! We're Making Improvements"</li>
                </ul>
                 <p className="font-medium pt-2">Content Enhancements:</p>
                 <p className="text-muted-foreground">Consider adding an emoji for a friendlier tone.</p>
                 <Button variant="link" className="p-0 h-auto">Optimize Content</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
