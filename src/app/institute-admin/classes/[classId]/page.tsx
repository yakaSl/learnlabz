
import { ClassDetailView } from "@/components/institute-admin/classes/class-detail-view";

export default async function InstituteClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  return <ClassDetailView classId={classId} />;
}
