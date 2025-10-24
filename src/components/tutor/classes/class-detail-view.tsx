"use client";

import { useState } from 'react';
import { classes } from '../data';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Edit, Users, Calendar, BookOpen, CheckSquare, BarChart2, Share2 } from 'lucide-react';
import OverviewTab from './details/overview';
import StudentsTab from './details/students';
import AttendanceTab from './details/attendance';
import MaterialsTab from './details/materials';
import AssessmentsTab from './details/assessments';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShareEnrollmentDialog } from './details/share-enrollment-dialog';

interface ClassDetailViewProps {
  classId: string;
}

export default function ClassDetailView({ classId }: ClassDetailViewProps) {
  const classInfo = classes.find(c => c.id === classId);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (!classInfo) {
    notFound();
  }
  
  const enrollmentLink = `https://learnlabz.app/enroll/${classInfo.id}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {isEditing ? (
             <input type="text" defaultValue={classInfo.name} className="text-2xl font-bold tracking-tight bg-transparent border-b" />
          ) : (
             <h1 className="text-2xl font-bold tracking-tight">{classInfo.name}</h1>
          )}
          <p className="text-muted-foreground">{classInfo.subject} - {classInfo.schedule}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsShareOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Enrollment
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel' : 'Request Edit'}
            </Button>
            {isEditing && <Button onClick={() => setIsEditing(false)}>Submit for Approval</Button>}
        </div>
      </div>
      
      <ShareEnrollmentDialog 
        isOpen={isShareOpen} 
        onOpenChange={setIsShareOpen} 
        enrollmentLink={enrollmentLink}
        className={classInfo.name}
      />

      {isEditing && (
          <Alert>
              <Edit className="h-4 w-4" />
              <AlertTitle>Edit Mode</AlertTitle>
              <AlertDescription>
                  You are in edit mode. Any changes you make will be submitted to the institute admin for approval.
              </AlertDescription>
          </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview"><Users className="mr-2 h-4 w-4" />Overview</TabsTrigger>
          <TabsTrigger value="students"><Users className="mr-2 h-4 w-4" />Students</TabsTrigger>

          <TabsTrigger value="attendance"><Calendar className="mr-2 h-4 w-4" />Attendance</TabsTrigger>
          <TabsTrigger value="materials"><BookOpen className="mr-2 h-4 w-4" />Materials</TabsTrigger>
          <TabsTrigger value="assessments"><CheckSquare className="mr-2 h-4 w-4" />Assessments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <OverviewTab classInfo={classInfo} />
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <StudentsTab />
        </TabsContent>
        <TabsContent value="attendance" className="mt-4">
          <AttendanceTab />
        </TabsContent>
        <TabsContent value="materials" className="mt-4">
          <MaterialsTab />
        </TabsContent>
        <TabsContent value="assessments" className="mt-4">
          <AssessmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
