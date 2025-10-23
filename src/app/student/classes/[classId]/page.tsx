
import ClassDetailView from "@/components/student/classes/details/class-detail-view";

export default function StudentClassDetailPage({ params }: { params: { classId: string } }) {
  return <ClassDetailView classId={params.classId} />;
}
