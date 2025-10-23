
"use client";

import { TodaysSchedule } from "./todays-schedule";
import { TaskList } from "./task-list";
import { Notifications } from "./notifications";

export default function TutorAssistantDashboard() {
  return (
    <div className="grid gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome, Assistant!</h1>
        <p className="text-muted-foreground">Here's a look at your day.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <TaskList />
        </div>
        <div className="space-y-8">
            <TodaysSchedule />
            <Notifications />
        </div>
      </div>
    </div>
  );
}
