
import { UpcomingClasses } from "@/components/student/dashboard/upcoming-classes";
import { RecentGrades } from "@/components/student/dashboard/recent-grades";
import { AssignmentDeadlines } from "@/components/student/dashboard/assignment-deadlines";
import { GamificationSummary } from "@/components/student/dashboard/gamification-summary";
import { AiChatTutorWidget } from "@/components/student/dashboard/ai-chat-tutor-widget";
import { CourseProgress } from "@/components/student/dashboard/course-progress";

export default function StudentDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5 grid gap-4 auto-rows-min">
            <UpcomingClasses />
            <AssignmentDeadlines />
        </div>
        <div className="lg:col-span-2 grid gap-4 auto-rows-min">
            <RecentGrades />
            <GamificationSummary />
        </div>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <CourseProgress />
            </div>
             <div className="lg:col-span-3">
                <AiChatTutorWidget />
            </div>
       </div>
    </div>
  )
}
