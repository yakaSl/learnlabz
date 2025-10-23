
import StudentProfileView from "@/components/tutor/students/student-profile-view";

export default function StudentProfilePage({ params }: { params: { studentId: string } }) {
  return <StudentProfileView studentId={params.studentId} />;
}
