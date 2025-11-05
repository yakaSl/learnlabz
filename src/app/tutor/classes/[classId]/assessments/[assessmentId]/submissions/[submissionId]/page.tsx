
import GradeSubmissionPage from "@/components/tutor/classes/details/grading/grade-submission-page";

export default async function SubmissionPage({
  params,
}: {
  params: Promise<{ classId: string; assessmentId: string; submissionId: string }>;
}) {
  const { classId, assessmentId, submissionId } = await params;
  return (
    <GradeSubmissionPage 
      classId={classId} 
      assessmentId={assessmentId} 
      submissionId={submissionId} 
    />
  );
}
