
"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
} from 'date-fns';
import { attendanceData } from './data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const statusColors = {
    Present: 'bg-green-500',
    Absent: 'bg-red-500',
    Late: 'bg-yellow-500',
    Excused: 'bg-blue-500',
};

export function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
                    <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="h-8">
                    Today
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {days.map(day => {
                const dayAttendance = attendanceData.find(d => isSameDay(new Date(d.date), day));
                return (
                    <TooltipProvider key={day.toString()}>
                        <Tooltip>
                             <TooltipTrigger asChild>
                                <div
                                className={cn(
                                    "relative p-1 border-b border-r flex flex-col items-center justify-center h-16",
                                    !isSameMonth(day, currentDate) && "bg-muted/30 text-muted-foreground",
                                    "last:border-r-0"
                                )}
                                >
                                <span className={cn(
                                    "absolute top-1 left-1 text-xs md:text-sm font-medium",
                                    isToday(day) && "bg-accent text-accent-foreground rounded-full h-6 w-6 flex items-center justify-center"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                {dayAttendance && (
                                    <div className={cn("h-3 w-3 rounded-full", statusColors[dayAttendance.status])} />
                                )}
                                </div>
                            </TooltipTrigger>
                            {dayAttendance && (
                                <TooltipContent>
                                    <p>{dayAttendance.status} on {format(day, 'MMM d')}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                );
                })}
            </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {Object.entries(statusColors).map(([status, color]) => (
                 <div key={status} className="flex items-center gap-2">
                    <div className={cn("h-3 w-3 rounded-full", color)} />
                    <span>{status}</span>
                </div>
            ))}
        </CardFooter>
    </Card>
  );
}
