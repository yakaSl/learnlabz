
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, LayoutGrid, Calendar as CalendarIcon, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassCard } from './class-card';
import { personalClasses, instituteClasses } from './data';
import { ClassCalendarView } from './class-calendar-view';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAppContext } from '@/hooks/use-context';
import Link from 'next/link';

export default function ClassManagement() {
  const [view, setView] = useState<'grid' | 'calendar'>('grid');
  const { selectedContext } = useAppContext();
  // isPersonalContext is true for INDIVIDUAL institutes (personal) and false for INSTITUTE type
  const isPersonalContext = selectedContext.type === 'personal';

  const displayedClasses = isPersonalContext ? personalClasses : instituteClasses;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{isPersonalContext ? 'My Personal Classes' : 'My Assigned Classes'}</h1>
          <p className="text-muted-foreground">
            {isPersonalContext ? 'Manage your own classes, students, and schedule.' : `Manage classes assigned to you by ${selectedContext.label}.`}
          </p>
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
            <Button disabled={!isPersonalContext} asChild={isPersonalContext}>
              {isPersonalContext ? (
                  <Link href="/teacher/classes/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Class
                  </Link>
              ) : (
                  <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Class
                  </>
              )}
            </Button>
        </div>
      </div>

       {!isPersonalContext && (
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Institute Guidelines</AlertTitle>
          <AlertDescription>
            All class schedules and fees are managed by the institute admin. To request changes, please use the "Request Edit" option on a class and await approval.
          </AlertDescription>
        </Alert>
       )}

      {view === 'grid' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Class Overview</h2>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                 <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="algebra">Algebra</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedClasses.map(cls => (
                <ClassCard key={cls.id} classInfo={cls} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
         <Card className="flex-grow">
            <CardContent className="h-[calc(100vh-220px)] pt-6">
                <ClassCalendarView />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
