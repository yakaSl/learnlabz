
"use client";

import { Tutor } from "./data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical, Star, BookOpen, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TutorCardProps {
  tutor: Tutor;
}

const statusColors: { [key in Tutor['status']]: string } = {
    Active: "bg-green-500",
    Pending: "bg-yellow-500",
    "On-leave": "bg-gray-500",
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="flex flex-col h-full group">
      <CardHeader className="flex-row items-center gap-4">
        <div className="relative">
          <Image src={tutor.avatar} alt={`${tutor.name}`} width={80} height={80} className="rounded-full border-4 border-background shadow-md" />
          <span className={cn("absolute bottom-1 right-1 block h-3 w-3 rounded-full", statusColors[tutor.status])} />
        </div>
        <div>
          <h3 className="text-xl font-bold">{tutor.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {tutor.subjects.map(subject => <Badge key={subject} variant="secondary">{subject}</Badge>)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Active Classes</span>
            </div>
            <span className="font-bold text-foreground">{tutor.activeClasses}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Performance Rating</span>
            </div>
            <span className="font-bold text-foreground">{tutor.performanceRating > 0 ? tutor.performanceRating.toFixed(1) : "N/A"}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between items-center">
            <Button variant="outline" size="sm" asChild>
                <Link href={`/institute-admin/tutors/${tutor.id}`}>View Profile</Link>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4"/>
                        Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>Assign Class</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
