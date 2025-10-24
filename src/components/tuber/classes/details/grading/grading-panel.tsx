
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Clock, MessageSquare, Shield, User, FileText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function GradingPanel({ submission }: { submission: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Grading</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="grade">Grade</Label>
              <Input id="grade" placeholder="e.g., 85" type="number" />
            </div>
            <span className="text-xl font-bold text-muted-foreground pb-2">/ 100</span>
          </div>

          <div className="space-y-1">
            <Label htmlFor="feedback">Feedback for Student</Label>
            <Textarea
              id="feedback"
              placeholder="Provide constructive feedback..."
              className="min-h-[150px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          <div className="flex items-center justify-between">
             <Label htmlFor="return-revision">Return for Revision</Label>
             <Switch id="return-revision" />
          </div>
          <Button className="w-full">Save and Post Grade</Button>
          <Button variant="secondary" className="w-full">Save as Draft</Button>
        </CardFooter>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Submission Details</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-sm">
              <p className="flex items-center gap-2 text-muted-foreground"><Clock /> Submitted</p>
              <p>{submission.submittedAt}</p>
            </div>
             <div className="flex items-center justify-between text-sm">
              <p className="flex items-center gap-2 text-muted-foreground"><FileText /> Originality</p>
              <p className="flex items-center gap-2 text-green-500 font-medium"><Shield/> 98% Original</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Private Notes</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
             <Textarea
                placeholder="Add a private note for your own records..."
                className="min-h-[100px]"
            />
            <Button size="sm" variant="outline">Save Note</Button>
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="item-3">
          <AccordionTrigger>Student History</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 text-sm">
             <div className="flex justify-between">
                <p className="text-muted-foreground">Average Grade:</p>
                <p className="font-medium">88%</p>
            </div>
             <div className="flex justify-between">
                <p className="text-muted-foreground">On-time Submissions:</p>
                <p className="font-medium">95%</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
