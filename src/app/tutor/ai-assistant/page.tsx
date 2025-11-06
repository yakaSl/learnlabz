
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AiAssistantPage from "@/components/tutor/ai-assistant/ai-assistant-page";

export default function AiAssistant() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <AiAssistantPage />
    </ProtectedRoute>
  );
}
