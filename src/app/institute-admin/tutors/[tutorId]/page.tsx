
import TutorProfilePage from "@/components/institute-admin/tutors/tutor-profile-page";

export default function TutorDetailPage({ params }: { params: { tutorId: string } }) {
  return <TutorProfilePage tutorId={params.tutorId} />;
}
