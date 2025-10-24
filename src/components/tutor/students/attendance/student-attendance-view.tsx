
"use client";

import { Student } from "../data";
import { AlertCircle } from "lucide-react";
import { AbsenceHistory } from "./absence-history";
import { AttendanceCalendar } from "./attendance-calendar";
import { AttendanceSummaryCards } from "./attendance-summary-cards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StudentAttendanceView({ student }: { student: Student }) {
  const isAtRisk = student.performanceLevel === "At Risk";

  return (
    <div className="flex flex-col gap-8">
      <AttendanceSummaryCards student={student} />

      {isAtRisk && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Attendance Warning</AlertTitle>
          <AlertDescription>
            {student.name}'s attendance has dropped to {student.attendance}%. This may be impacting their performance.
          </AlertDescription>
        </Alert>
      )}

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
