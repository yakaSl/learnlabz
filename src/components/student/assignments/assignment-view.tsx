'use client';

import { notFound } from 'next/navigation';
import { assignments } from './data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Clock,
  FileText,
  UploadCloud,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface AssignmentViewProps {
  assignmentId: string;
}

const statusColors: { [key: string]: string } = {
  Pending: 'outline',
  Submitted: 'secondary',
  Graded: 'default',
  Overdue: 'destructive',
};

function CountdownTimer({ dueDate }: { dueDate: string }) {
    // This is a static placeholder. A real implementation would use state and effects to update the timer.
    return (
        <div className="text-center">
            <p className="text-2xl font-bold">2d 10h 15m</p>
            <p className="text-sm text-muted-foreground">Until Deadline</p>
        </div>
    );
}

export default function AssignmentView({ assignmentId }: AssignmentViewProps) {
  const assignment = assignments.find((a) => a.id === assignmentId);

  if (!assignment) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                <CardDescription>
                  Due: {assignment.due}
                </CardDescription>
              </div>
              <Badge variant={statusColors[assignment.status] as any}>
                {assignment.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>{assignment.instructions}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>My Submission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-semibold">Drag & drop files here</p>
                    <p className="text-sm text-muted-foreground">or</p>
                    <Button variant="outline" className="mt-2">Browse Files</Button>
                    <p className="text-xs text-muted-foreground mt-4">Max file size: 50MB</p>
                </div>
                 <div className="space-y-2">
                    <Textarea placeholder="Add any comments or links for your submission..." />
                </div>
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        AI writing assistant is active.
                    </div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        Plagiarism check enabled.
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Submit Assignment</Button>
            </CardFooter>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CountdownTimer dueDate={assignment.due} />
          </CardContent>
        </Card>
        
        {assignment.grade ? (
          <Card>
            <CardHeader>
              <CardTitle>Grade & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-5xl font-bold text-primary">{assignment.grade}</p>
                <p className="font-semibold">{assignment.feedback.summary}</p>
              </div>
              <Separator />
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{assignment.feedback.details}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
             <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle>Not Graded Yet</AlertTitle>
                <AlertDescription>
                   Your assignment has been submitted and is awaiting feedback from your tutor.
                </AlertDescription>
            </Alert>
        )}

        <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                    <Lightbulb />
                    AI Tip
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Remember to cite all your sources correctly. Try using the MLA format for this essay.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
