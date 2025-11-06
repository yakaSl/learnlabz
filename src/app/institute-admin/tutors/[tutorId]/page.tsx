'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import TutorProfilePage from "@/components/institute-admin/tutors/tutor-profile-page";

export default function TutorDetailPage({ params }: { params: { tutorId: string } }) {
  const { tutorId } = params;
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <TutorProfilePage tutorId={tutorId} />
    </ProtectedRoute>
  );
}
