'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ParentGamificationHub from "@/components/parent/gamification/parent-gamification-hub";

export default function ParentAchievementsPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <ParentGamificationHub />
        </ProtectedRoute>
    );
}
