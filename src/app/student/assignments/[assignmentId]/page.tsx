
import AssignmentView from '@/components/student/assignments/assignment-view';

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  return <AssignmentView assignmentId={assignmentId} />;
}
