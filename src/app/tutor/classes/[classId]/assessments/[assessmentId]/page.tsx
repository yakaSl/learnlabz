
import AssignmentSubmissionsPage from "@/components/tutor/classes/assessments/submissions-page";

export default async function SubmissionsPage({ params }: { params: { classId: string, assessmentId: string } }) {
  const { classId, assessmentId } = params;
  return <AssignmentSubmissionsPage classId={classId} assessmentId={assessmentId} />;
}
