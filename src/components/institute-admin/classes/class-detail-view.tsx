
"use client";

import { useState } from 'react';
// Using tutor data for mock purposes
import { classes } from "@/components/tutor/classes/data";
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AttendanceTab } from './attendance-tab';
import { StudentsTab } from './students-tab';

interface ClassDetailViewProps {
  classId: string;
}

function ClassHeader({ classInfo }: { classInfo: (typeof classes)[0] }) {
    return (
        <Card>
            <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{classInfo.name}</h1>
                        <p className="text-muted-foreground">{classInfo.subject} - {classInfo.schedule}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ClassDetailView({ classId }: ClassDetailViewProps) {
  const classInfo = classes.find(c => c.id === classId);

  if (!classInfo) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <ClassHeader classInfo={classInfo} />
      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students"><Users className="mr-2 h-4 w-4" />Students</TabsTrigger>
          <TabsTrigger value="attendance"><Calendar className="mr-2 h-4 w-4" />Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="mt-4">
          <StudentsTab />
        </TabsContent>
        <TabsContent value="attendance" className="mt-4">
          <AttendanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
