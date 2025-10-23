
"use client";

import { Student } from "./data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, TrendingUp, TrendingDown, Phone, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";


interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const getPerformanceColor = (level: Student['performanceLevel']) => {
    if (level === 'Exceeding') return 'text-success-foreground';
    if (level === 'At Risk') return 'text-destructive';
    return 'text-yellow-500';
  }

  const getPerformanceIcon = (level: Student['performanceLevel']) => {
    if (level === 'Exceeding') return <TrendingUp />;
    if (level === 'At Risk') return <TrendingDown />;
    return null;
  }
  
  return (
    <Card className="flex flex-col h-full group">
      <CardHeader>
         <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-bold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.grade}</p>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/tutor/students/${student.id}`}>View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Archive Student</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 text-sm">
        <div>
            <h4 className="font-semibold mb-2">Enrolled Classes</h4>
            <div className="flex flex-wrap gap-1">
                {student.classes.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
            </div>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
            <span>Performance Level</span>
            <div className={cn("flex items-center gap-1 font-bold", getPerformanceColor(student.performanceLevel))}>
                {getPerformanceIcon(student.performanceLevel)}
                <span>{student.performanceLevel}</span>
            </div>
        </div>
         <div className="flex items-center justify-between text-muted-foreground">
            <span>Attendance</span>
            <span className="font-bold text-foreground">{student.attendance}%</span>
        </div>
         <div className="flex items-center justify-between text-muted-foreground">
            <span>Engagement (AI)</span>
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Badge variant={student.engagement === 'High' ? 'default' : 'destructive'}>{student.engagement}</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Based on participation and assignment completion.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/tutor/students/${student.id}`}>View Profile</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><MessageSquare className="mr-2"/> Message</Button>
              <Button variant="outline" size="sm"><Phone className="mr-2"/> Call Parent</Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
