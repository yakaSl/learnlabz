
"use client";

import { Class } from "./data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, Calendar, Edit, Link2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ClassCardProps {
  classInfo: Class;
}

const statusColors: { [key in Class['status']]: string } = {
    Active: "bg-green-500",
    Upcoming: "bg-blue-500",
    Completed: "bg-gray-500",
    Draft: "bg-yellow-500",
    Paused: "bg-orange-500",
}

export function ClassCard({ classInfo }: ClassCardProps) {
  const enrollmentPercentage = (classInfo.enrolled / classInfo.capacity) * 100;

  return (
    <Card className="flex flex-col h-full group">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary" className="mb-2">{classInfo.subject}</Badge>
                <CardTitle className="text-lg">{classInfo.name}</CardTitle>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/tutor/classes/${classInfo.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Request Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{classInfo.schedule}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Enrollment</span>
              </div>
              <span className="font-bold text-foreground">{classInfo.enrolled}/{classInfo.capacity}</span>
          </div>
          <Progress value={enrollmentPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", statusColors[classInfo.status])} />
                <span className="text-sm font-medium">{classInfo.status}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/tutor/classes/${classInfo.id}`}>Manage</Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
