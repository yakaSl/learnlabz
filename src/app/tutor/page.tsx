import { EarningsSummary } from "@/components/tutor/dashboard/earnings-summary";
import { TodaysSchedule } from "@/components/tutor/dashboard/todays-schedule";
import { AttendanceStats } from "@/components/tutor/dashboard/attendance-stats";
import { QuickActions } from "@/components/tutor/dashboard/quick-actions";
import { AiAssistantWidget } from "@/components/tutor/dashboard/ai-assistant-widget";
import { StudentPerformance } from "@/components/tutor/dashboard/student-performance";


export default function TutorDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <EarningsSummary />
      <QuickActions />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4 grid gap-4 auto-rows-min">
            <TodaysSchedule />
            <AttendanceStats />
        </div>
        <div className="lg:col-span-3 grid gap-4 auto-rows-min">
            <AiAssistantWidget />
            <StudentPerformance />
        </div>
      </div>
    </div>
  )
}
