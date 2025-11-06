'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ParentSettingsPage from "@/components/parent/profile/settings-page";

export default function ParentProfilePage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <ParentSettingsPage />
        </ProtectedRoute>
    );
}
