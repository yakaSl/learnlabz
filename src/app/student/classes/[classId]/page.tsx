
import ClassDetailView from "@/components/student/classes/details/class-detail-view";

export default async function StudentClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  return <ClassDetailView classId={classId} />;
}
