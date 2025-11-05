
import ClassDetailView from "@/components/tutor/classes/class-detail-view";

export default async function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  return <ClassDetailView classId={classId} />;
}
