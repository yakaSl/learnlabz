"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const students = [
  { id: 1, name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/s1/32/32', performance: 92, trend: 'up' },
  { id: 2, name: 'Bob Williams', avatar: 'https://picsum.photos/seed/s2/32/32', performance: 78, trend: 'down' },
  { id: 3, name: 'Charlie Brown', avatar: 'https://picsum.photos/seed/s3/32/32', performance: 85, trend: 'up' },
  { id: 4, name: 'Diana Miller', avatar: 'https://picsum.photos/seed/s4/32/32', performance: 65, trend: 'down' },
  { id: 5, name: 'Ethan Jones', avatar: 'https://picsum.photos/seed/s5/32/32', performance: 95, trend: 'up' },
];

export function StudentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
        <CardDescription>A summary of your students' recent progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          <div className="space-y-4">
            {students.map(student => (
              <div key={student.id} className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{student.name}</p>
                   <Progress value={student.performance} className="h-2 mt-1" indicatorClassName={student.performance > 80 ? "bg-success-foreground" : student.performance < 70 ? "bg-destructive" : "bg-yellow-500"}/>
                </div>
                 <span className="font-semibold">{student.performance}%</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
