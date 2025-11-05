
"use client";

import { Class } from "./data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { Clock, Book, User } from "lucide-react";

interface ClassCardProps {
  classInfo: Class;
}

const statusColors: { [key in Class['status']]: string } = {
    "Live Now": "bg-red-500",
    Upcoming: "bg-blue-500",
    Completed: "bg-gray-500",
    Scheduled: "bg-green-500",
}

export function StudentClassCard({ classInfo }: ClassCardProps) {
  return (
    <Card className="flex flex-col h-full group">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary" className="mb-2">{classInfo.subject}</Badge>
                <CardTitle className="text-lg">{classInfo.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
                 <div className={cn("h-2.5 w-2.5 rounded-full", statusColors[classInfo.status])} />
                <span className="text-sm font-medium">{classInfo.status}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Tutor: {classInfo.tutor}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next: {classInfo.nextSession}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-2">
                  <span>Progress</span>
              </div>
              <span className="font-bold text-foreground">{classInfo.progress}%</span>
          </div>
          <Progress value={classInfo.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex gap-2">
        <Button variant="accent" size="sm" className="w-full" disabled={classInfo.status !== 'Live Now'}>
          Join Now
        </Button>
        <Button variant="outline" size="sm" asChild className="w-full">
            <Link href={`/student/classes/${classInfo.id}`}><Book className="mr-2 h-4 w-4" />View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
