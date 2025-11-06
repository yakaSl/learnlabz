
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import TutorAssistantDashboard from "@/components/tutor-assistant/dashboard";

export default function TutorAssistantPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER_ASSISTANT]}
        >
            <TutorAssistantDashboard />
        </ProtectedRoute>
    );
}
