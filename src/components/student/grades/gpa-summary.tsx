"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GpaSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Performance</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-full bg-muted/50 mx-auto"
        >
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-current text-primary"
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="2"
              strokeDasharray="91, 100"
            />
          </svg>
          <span className="text-4xl font-bold">A-</span>
        </div>
         <p className="mt-4 text-2xl font-bold">91% GPA</p>
         <p className="text-sm text-muted-foreground">Excellent Progress</p>
      </CardContent>
    </Card>
  );
}
