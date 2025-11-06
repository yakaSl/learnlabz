'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AiTutorChat from "@/components/student/ai-tutor/ai-tutor-chat";

export default function AiTutorPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <AiTutorChat />
    </ProtectedRoute>
  );
}
