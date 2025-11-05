
import AssignmentView from '@/components/student/assignments/assignment-view';

export default async function AssignmentDetailPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  const { assignmentId } = params;
  return <AssignmentView assignmentId={assignmentId} />;
}
