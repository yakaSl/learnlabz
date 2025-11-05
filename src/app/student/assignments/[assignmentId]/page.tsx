
import AssignmentView from '@/components/student/assignments/assignment-view';

export default function AssignmentDetailPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  return <AssignmentView assignmentId={params.assignmentId} />;
}
