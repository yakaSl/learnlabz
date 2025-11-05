
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/app/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"


export function AbsenceForm() {
    const [date, setDate] = React.useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an Absence</CardTitle>
        <CardDescription>Let your tutors know if you'll be absent.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label>Date of Absence</Label>
             <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
        </div>
        <div className="space-y-2">
            <Label htmlFor="reason">Reason for Absence</Label>
            <Textarea id="reason" placeholder="e.g., Doctor's appointment" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit Notification
        </Button>
      </CardFooter>
    </Card>
  );
}
