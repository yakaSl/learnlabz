
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { assessmentData } from "./data";
import { FileText } from "lucide-react";

export function RecentAssessments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Assessments</CardTitle>
        <CardDescription>Latest graded assignments and quizzes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {assessmentData.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border">
            <div className="p-2 bg-primary/10 text-primary rounded-md">
                <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.subject}</p>
            </div>
            <p className="font-bold text-lg">{item.grade}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
