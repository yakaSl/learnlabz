
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode.react";

function ClassCreatedSuccess({ classId, enrollmentLink }: { classId: string, enrollmentLink: string }) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enrollmentLink);
    toast({
      title: "Copied to clipboard!",
      description: "Enrollment link has been copied.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="items-center text-center">
        <div className="p-4 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Class Created Successfully!</CardTitle>
        <CardDescription>
          Share the link or QR code below to let students enroll in your new class.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2 rounded-md border p-4">
          <Clipboard className="h-5 w-5 text-muted-foreground" />
          <p className="flex-1 text-sm font-mono bg-muted p-2 rounded-md truncate">
            {enrollmentLink}
          </p>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 border-4 border-muted-foreground rounded-lg">
            <QRCode value={enrollmentLink} size={128} />
          </div>
          <p className="text-sm text-muted-foreground">Scan to Enroll</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">Go to Class Dashboard</Button>
        <Button variant="outline" className="w-full">Create Another Class</Button>
      </CardFooter>
    </Card>
  );
}


export function CreateClassForm() {
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission to the backend here
    setIsCreated(true);
  };

  if (isCreated) {
    return <ClassCreatedSuccess classId="12345" enrollmentLink="https://learnlabz.app/enroll/aBcDeF123" />;
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Class Details</CardTitle>
            <CardDescription>Basic information about your class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="class-name">Class Name</Label>
              <Input id="class-name" placeholder="e.g., Mathematics - Grade 10" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the class, its goals, and what students will learn." required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Math" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade-level">Grade/Level</Label>
                <Input id="grade-level" placeholder="e.g., 10th Grade, Beginner" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="schedule">Class Schedule</Label>
                    <Input id="schedule" placeholder="e.g., Mon, Wed, Fri at 10:00 AM" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="capacity">Class Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 15" required />
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input id="location" placeholder="e.g., Online via Zoom, Room 201" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Set up the payment details for this class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="monthly-fee">Monthly Fee Amount ($)</Label>
                    <Input id="monthly-fee" type="number" placeholder="e.g., 150" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="due-date">Payment Due Date</Label>
                    <Input id="due-date" placeholder="e.g., 5th of each month" required />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="late-fee-policy">Late Fee Policy</Label>
              <Textarea id="late-fee-policy" placeholder="e.g., A late fee of $15 will be applied if payment is not received within 5 days of the due date." />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Create Class</Button>
        </div>
      </div>
    </form>
  );
}
