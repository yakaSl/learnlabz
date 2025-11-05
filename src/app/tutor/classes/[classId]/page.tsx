
import ClassDetailView from "@/components/tutor/classes/class-detail-view";

export default async function ClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return <ClassDetailView classId={classId} />;
}
