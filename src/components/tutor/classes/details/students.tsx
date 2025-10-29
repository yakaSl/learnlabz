
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { students } from "@/components/tutor/students/data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentsTab() {
  const getPerformanceColor = (level: string) => {
    if (level === 'Exceeding') return 'text-success-foreground';
    if (level === 'At Risk') return 'text-destructive';
    return 'text-yellow-500';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Enrolled Students (12)</CardTitle>
          <CardDescription>A list of all students currently in this class.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Engagement (AI)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Link href={`/tutor/students/${student.id}`} className="hover:underline">{student.name}</Link>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className={cn("flex items-center gap-1 font-medium", getPerformanceColor(student.performanceLevel))}>
                        <span>{student.performanceLevel}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <Badge variant={student.engagement === 'High' ? 'default' : student.engagement === 'Low' ? 'destructive' : 'secondary'}>
                        {student.engagement}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/tutor/students/${student.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MessageSquare className="mr-2" />
                                Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Remove from Class</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
