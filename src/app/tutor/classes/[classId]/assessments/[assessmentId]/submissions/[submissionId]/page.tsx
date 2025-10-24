
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SubmissionViewer } from '@/components/tutor/classes/details/grading/submission-viewer';
import { GradingPanel } from '@/components/tuber/classes/details/grading/grading-panel';
import { submissionData } from '@/components/tuber/classes/details/grading/data';

export default function GradeSubmissionPage({
  params,
}: {
  params: { classId: string; assessmentId: string; submissionId: string };
}) {

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
           <Button variant="ghost" asChild>
            <Link href={`/tutor/classes/${params.classId}`}>
              <ArrowLeft className="mr-2" />
              Back to Submissions
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Grade: {submissionData.assessmentTitle}
          </h1>
          <p className="text-muted-foreground">
            Viewing submission for{' '}
            <span className="font-semibold">{submissionData.student.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Student 1 of 12</span>
            <Button variant="outline" size="icon"><ChevronLeft /></Button>
            <Button variant="outline" size="icon"><ChevronRight /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 items-start overflow-hidden">
        <div className="lg:col-span-2 h-full bg-muted rounded-lg flex items-center justify-center">
            <SubmissionViewer documentUrl={submissionData.documentUrl} />
        </div>
        <div className="h-full overflow-y-auto">
            <GradingPanel submission={submissionData} />
        </div>
      </div>
    </div>
  );
}
