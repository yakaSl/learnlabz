
import ClassDetailView from "@/components/student/classes/details/class-detail-view";

export default async function StudentClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return <ClassDetailView classId={classId} />;
}
