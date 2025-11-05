
import AssignmentSubmissionsPage from "@/components/tutor/classes/assessments/submissions-page";

export default async function SubmissionsPage({ params }: { params: Promise<{ classId: string, assessmentId: string }> }) {
  const { classId, assessmentId } = await params;
  return <AssignmentSubmissionsPage classId={classId} assessmentId={assessmentId} />;
}
