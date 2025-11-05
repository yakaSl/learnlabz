
import GradeSubmissionPage from "@/components/tutor/classes/details/grading/grade-submission-page";

export default function SubmissionPage({
  params,
}: {
  params: { classId: string; assessmentId: string; submissionId: string };
}) {
  return (
    <GradeSubmissionPage 
      classId={params.classId} 
      assessmentId={params.assessmentId} 
      submissionId={params.submissionId} 
    />
  );
}
