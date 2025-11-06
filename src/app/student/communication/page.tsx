'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import CommunicationHub from "@/components/student/communication/communication-hub";

export default function CommunicationPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <CommunicationHub />
    </ProtectedRoute>
  );
}
