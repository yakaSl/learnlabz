
"use client";

import { AbsenceForm } from "./absence-form";
import { AttendanceCalendar } from "./attendance-calendar";
import { SummaryCards } from "./summary-cards";

export default function AttendanceView() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance & Schedule</h1>
        <p className="text-muted-foreground">View your schedule, track attendance, and report absences.</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <AttendanceCalendar />
        </div>
        <div className="lg:col-span-4">
          <AbsenceForm />
        </div>
      </div>
    </div>
  );
}
