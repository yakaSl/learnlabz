
import { ClassDetailView } from "@/components/institute-admin/classes/class-detail-view";

export default async function InstituteClassDetailPage({ params }: { params: { classId: string } }) {
  const { classId } = params;
  return <ClassDetailView classId={classId} />;
}
