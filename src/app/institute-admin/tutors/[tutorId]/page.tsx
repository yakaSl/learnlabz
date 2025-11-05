
import TutorProfilePage from "@/components/institute-admin/tutors/tutor-profile-page";

export default async function TutorDetailPage({ params }: { params: { tutorId: string } }) {
  const { tutorId } = params;
  return <TutorProfilePage tutorId={tutorId} />;
}
