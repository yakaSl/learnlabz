
"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  getDay
} from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { classes } from './data';


export function ClassCalendarView() {
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
    History: 'bg-yellow-500',
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
        <div className="flex items-center gap-2">
            <Select defaultValue="month">
                <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-grow">
        {days.map(day => {
          const dayClasses = classes.filter(c => {
             // This is a naive way to check for recurring weekly classes
             const classDate = new Date(); // This should be the start date of the class
             // A better implementation would parse the schedule string
             return getDay(classDate) === getDay(day) && isSameMonth(day, currentDate);
          });
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
                     <p className="hidden md:block">{c.schedule.split('|')[1]}</p>
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
