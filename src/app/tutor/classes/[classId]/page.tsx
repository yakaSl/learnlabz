
import ClassDetailView from "@/components/tutor/classes/class-detail-view";

export default function ClassDetailPage({ params }: { params: { classId: string } }) {
  return <ClassDetailView classId={params.classId} />;
}
