
"use client";

import { Tutor } from "./data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical, Star, BookOpen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TutorListItemProps {
  tutor: Tutor;
}

const statusColors: { [key in Tutor['status']]: string } = {
    Active: "bg-green-500",
    Pending: "bg-yellow-500",
    "On-leave": "bg-gray-500",
}

export function TutorListItem({ tutor }: TutorListItemProps) {
  return (
    <div className="flex items-center p-3 border-b hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4 flex-1 md:w-1/3">
        <div className="relative">
            <Image src={tutor.avatar} alt={tutor.name} width={40} height={40} className="rounded-full" />
            <span className={cn("absolute bottom-0 right-0 block h-2 w-2 rounded-full", statusColors[tutor.status])} />
        </div>
        <div className="flex-grow">
          <p className="font-bold">{tutor.name}</p>
          <p className="text-sm text-muted-foreground hidden md:block">{tutor.status}</p>
        </div>
      </div>
      <div className="hidden md:flex flex-wrap gap-1 w-1/4">
        {tutor.subjects.map(subject => <Badge key={subject} variant="secondary" className="text-xs">{subject}</Badge>)}
      </div>
      <div className="hidden md:flex w-1/6 items-center gap-1 font-medium">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        {tutor.activeClasses}
      </div>
       <div className="hidden md:flex w-1/6 items-center gap-1 font-medium">
         <Star className="h-4 w-4 text-muted-foreground" />
        {tutor.performanceRating > 0 ? tutor.performanceRating.toFixed(1) : "N/A"}
      </div>
      <div className="w-auto flex justify-end ml-auto">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                <DropdownMenuItem>Assign Class</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
