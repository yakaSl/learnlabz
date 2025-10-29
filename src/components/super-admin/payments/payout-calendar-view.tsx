
"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  isSameDay
} from 'date-fns';

// Mock data, in a real app this would come from an API
const payouts = [
    { date: new Date(new Date().getFullYear(), new Date().getMonth(), 25), amount: 88900, status: 'Upcoming' },
    { date: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 25), amount: 92400, status: 'Completed' },
    { date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10), amount: 45000, status: 'Upcoming' },
    { date: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 25), amount: 89000, status: 'Completed' },
];


export function PayoutCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map(day => {
          const dayPayouts = payouts.filter(p => isSameDay(p.date, day));
          return (
            <div
              key={day.toString()}
              className={cn(
                "h-24 md:h-32 p-1 border-b border-r flex flex-col overflow-hidden",
                !isSameMonth(day, currentDate) && "bg-muted/50 text-muted-foreground",
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
                {dayPayouts.map(payout => (
                  <div 
                    key={payout.date.toString()} 
                    className={cn(
                        "p-1 rounded-sm text-white",
                        payout.status === 'Upcoming' && 'bg-primary',
                        payout.status === 'Completed' && 'bg-secondary'
                    )}
                  >
                    <p className="font-bold whitespace-nowrap">
                      ${(payout.amount / 1000).toFixed(1)}k
                    </p>
                     <p className="hidden md:block">{payout.status}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
       <div className="p-4 border-t flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-primary" />
                <span>Upcoming Payout</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-sm bg-secondary" />
                <span>Completed Payout</span>
            </div>
        </div>
    </div>
  );
}
