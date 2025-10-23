"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AchievementHighlights } from "./achievement-highlights";
import { AiPerformanceInsights } from "./ai-performance-insights";
import { GpaSummary } from "./gpa-summary";
import { PerformanceTrendChart } from "./performance-trend-chart";
import { SubjectGradeBreakdown } from "./subject-grade-breakdown";

export default function GradesPerformanceView() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades & Performance</h1>
          <p className="text-muted-foreground">Track your academic progress, view grades, and get insights.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
            <PerformanceTrendChart />
            <SubjectGradeBreakdown />
        </div>
        <div className="lg:col-span-4 space-y-8">
            <GpaSummary />
            <AiPerformanceInsights />
            <AchievementHighlights />
        </div>
      </div>
    </div>
  );
}
