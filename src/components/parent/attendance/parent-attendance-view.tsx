
"use client";

import { AlertCircle } from "lucide-react";
import { AbsenceHistory } from "./absence-history";
import { AttendanceCalendar } from "./attendance-calendar";
import { AttendanceSummaryCards } from "./attendance-summary-cards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ParentAttendanceView() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance Record for Alex</h1>
        <p className="text-muted-foreground">View your child's attendance history and patterns.</p>
      </div>

      <AttendanceSummaryCards />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI Attendance Pattern Alert</AlertTitle>
        <AlertDescription>
          Alex has been late to his Algebra 101 class twice this month. This pattern could impact his grade by up to 5%.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <AttendanceCalendar />
        </div>
        <div className="lg:col-span-5">
          <AbsenceHistory />
        </div>
      </div>
    </div>
  );
}
