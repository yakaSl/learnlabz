
"use client";

import { Button } from "@/components/ui/button";
import { Download, CalendarDays } from "lucide-react";
import { PerformanceTrendChart } from "./performance-trend-chart";
import { SubjectGradeBreakdown } from "./subject-grade-breakdown";
import { RecentAssessments } from "./recent-assessments";
import { AiInsightsPanel } from "./ai-insights-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function PerformanceDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Details</h1>
          <p className="text-muted-foreground">An in-depth look at Alex's academic progress.</p>
        </div>
        <div className="flex items-center gap-2">
            <Select defaultValue="30d">
                <SelectTrigger className="w-[180px]">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="semester">This Semester</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
            </Select>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Report
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <PerformanceTrendChart />
          <SubjectGradeBreakdown />
        </div>
        <div className="lg:col-span-4 space-y-8">
            <RecentAssessments />
            <AiInsightsPanel />
        </div>
      </div>
    </div>
  );
}
