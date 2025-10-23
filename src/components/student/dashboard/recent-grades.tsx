
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const grades = [
  { id: 1, assignment: 'Algebra Quiz 2', grade: 'A+', trend: 'up' },
  { id: 2, assignment: 'Physics Lab Report', grade: 'B-', trend: 'down' },
  { id: 3, assignment: 'Writing Essay Draft', grade: 'A-', trend: 'up' },
];

export function RecentGrades() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
        <CardDescription>Your latest assessment results.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full">
          <div className="space-y-4">
            {grades.map(grade => (
              <div key={grade.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{grade.assignment}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{grade.grade}</span>
                    <TrendingUp className={cn("h-5 w-5", grade.trend === 'up' ? "text-success-foreground" : "text-destructive hidden")} />
                    <TrendingDown className={cn("h-5 w-5", grade.trend === 'down' ? "text-destructive" : "text-success-foreground hidden")} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
