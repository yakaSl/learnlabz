
import TutorProfilePage from "@/components/institute-admin/tutors/tutor-profile-page";

export default async function TutorDetailPage({ params }: { params: Promise<{ tutorId: string }> }) {
  const { tutorId } = await params;
  return <TutorProfilePage tutorId={tutorId} />;
}
