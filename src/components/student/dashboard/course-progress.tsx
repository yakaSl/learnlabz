
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const courses = [
    { name: "Algebra 101", progress: 75 },
    { name: "Physics for Beginners", progress: 40 },
    { name: "Creative Writing", progress: 15 },
]

export function CourseProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Completion</CardTitle>
        <CardDescription>Your progress in your enrolled classes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map(course => (
            <div key={course.name} className="space-y-1">
                 <div className="flex justify-between text-sm">
                    <span>{course.name}</span>
                    <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
