
"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/app/lib/utils';
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
import { classes } from './data'; // Using the same mock data

export function StudentClassCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const classColors: { [key: string]: string } = {
    Math: 'bg-blue-500',
    Science: 'bg-green-500',
    English: 'bg-purple-500',
    Programming: 'bg-red-500',
    default: 'bg-gray-500',
  }

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card text-card-foreground">
      <div className="flex items-center justify-between p-4 border-b flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="h-8">
            Today
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-grow">
        {days.map(day => {
          // This is a mock implementation. A real app would parse dates properly.
          const dayClasses = isSameDay(day, new Date()) ? classes.filter(c => c.status === "Upcoming") : [];
          return (
            <div
              key={day.toString()}
              className={cn(
                "relative p-1 border-b border-r flex flex-col overflow-hidden",
                !isSameMonth(day, currentDate) && "bg-muted/30 text-muted-foreground",
                "last:border-r-0"
              )}
            >
              <span className={cn(
                "self-start text-xs md:text-sm font-medium p-1 w-7 h-7 flex items-center justify-center rounded-full",
                isToday(day) && "bg-accent text-accent-foreground"
              )}>
                {format(day, 'd')}
              </span>
              <div className="flex-grow overflow-y-auto text-xs space-y-1 mt-1">
                {dayClasses.map(c => (
                  <div 
                    key={c.id} 
                    className={cn(
                        "p-1.5 rounded-sm text-white cursor-pointer hover:opacity-90",
                        classColors[c.subject] || classColors.default
                    )}
                  >
                    <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{c.name}</p>
                    <p className="hidden md:block">{c.nextSession.split(' at ')[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
