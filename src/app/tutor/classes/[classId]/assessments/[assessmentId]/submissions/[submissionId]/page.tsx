
import GradeSubmissionPage from "@/components/tutor/classes/details/grading/grade-submission-page";

export default async function SubmissionPage({
  params,
}: {
  params: { classId: string; assessmentId: string; submissionId: string };
}) {
  const { classId, assessmentId, submissionId } = params;
  return (
    <GradeSubmissionPage 
      classId={classId} 
      assessmentId={assessmentId} 
      submissionId={submissionId} 
    />
  );
}
