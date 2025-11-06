'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import CommunicationHub from "@/components/parent/messages/communication-hub";

export default function ParentMessagesPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <CommunicationHub />
        </ProtectedRoute>
    );
}
