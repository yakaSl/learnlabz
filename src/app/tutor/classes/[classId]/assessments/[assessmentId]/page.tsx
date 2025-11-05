
import AssignmentSubmissionsPage from "@/components/tutor/classes/assessments/submissions-page";

export default function SubmissionsPage({ params }: { params: { classId: string, assessmentId: string } }) {
  return <AssignmentSubmissionsPage classId={params.classId} assessmentId={params.assessmentId} />;
}
