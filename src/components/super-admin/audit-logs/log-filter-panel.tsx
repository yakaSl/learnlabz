/** @jsxImportSource react */
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";

export function LogFilterPanel() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Date Range</Label>
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
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
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
            <Label>Search by User or IP</Label>
            <Input placeholder="e.g. admin@learnlabz.com or 192.168.1.1" />
        </div>
        <div className="space-y-2">
          <Label>Severity</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="sev-info" />
              <Label htmlFor="sev-info" className="font-normal">Info</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sev-warn" />
              <Label htmlFor="sev-warn" className="font-normal">Warning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sev-error" />
              <Label htmlFor="sev-error" className="font-normal">Error</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="sev-crit" />
              <Label htmlFor="sev-crit" className="font-normal">Critical</Label>
            </div>
          </div>
        </div>
        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
