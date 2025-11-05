
import StudentProfileView from "@/components/tutor/students/student-profile-view";

export default async function StudentProfilePage({ params }: { params: { studentId: string } }) {
  const { studentId } = params;
  return <StudentProfileView studentId={studentId} />;
}
