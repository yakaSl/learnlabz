
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { cn } from '@/app/lib/utils';
import { Separator } from '@/components/ui/separator';

interface GenerateReportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GenerateReportDialog({ isOpen, onOpenChange }: GenerateReportDialogProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Student Report</DialogTitle>
          <DialogDescription>
            Customize and generate a progress report for the student.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="space-y-2">
                <Label>Report Period</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <Label>Include Sections</Label>
                <div className="grid grid-cols-2 gap-2 rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="include-performance" defaultChecked />
                        <Label htmlFor="include-performance" className="font-normal">Performance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="include-attendance" defaultChecked />
                        <Label htmlFor="include-attendance" className="font-normal">Attendance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="include-assignments" defaultChecked />
                        <Label htmlFor="include-assignments" className="font-normal">Assignments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="include-exams" />
                        <Label htmlFor="include-exams" className="font-normal">Exams</Label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="comments">Tutor Comments</Label>
                <Textarea id="comments" placeholder="Add personalized feedback or recommendations..." />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
                <Label>Format</Label>
                <RadioGroup defaultValue="pdf" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="format-pdf" />
                        <Label htmlFor="format-pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excel" id="format-excel" />
                        <Label htmlFor="format-excel">Excel (CSV)</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">
            <Download className="mr-2" />
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
