
import StudentProfileView from "@/components/tutor/students/student-profile-view";

export default async function StudentProfilePage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  return <StudentProfileView studentId={studentId} />;
}
