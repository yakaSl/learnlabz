
import { ClassDetailView } from "@/components/institute-admin/classes/class-detail-view";

export default function InstituteClassDetailPage({ params }: { params: { classId: string } }) {
  return <ClassDetailView classId={params.classId} />;
}
