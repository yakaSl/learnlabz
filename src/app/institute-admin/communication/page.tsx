'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import CommunicationHub from "@/components/institute-admin/communication/communication-hub";

export default function CommunicationPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE_ADMIN]}
    >
      <CommunicationHub />
    </ProtectedRoute>
  );
}
