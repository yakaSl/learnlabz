"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { LayoutGrid, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StudentClassCard } from './student-class-card';
import { classes } from './data';
import { StudentClassCalendarView } from './student-class-calendar-view';

export default function ClassManagement() {
  const [view, setView] = useState<'grid' | 'calendar'>('grid');

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground">Your schedule, materials, and progress at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('grid')}>
                    <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant={view === 'calendar' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('calendar')}>
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>

      {view === 'grid' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Current & Upcoming</h2>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="live">Live Now</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map(cls => (
                <StudentClassCard key={cls.id} classInfo={cls} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
         <Card className="flex-grow">
            <CardContent className="h-[calc(100vh-220px)] pt-6">
                <StudentClassCalendarView />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
