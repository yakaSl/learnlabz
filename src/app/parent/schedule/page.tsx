
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ScheduleView from "@/components/parent/schedule/schedule-view";

export default function ParentSchedulePage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <ScheduleView />
        </ProtectedRoute>
    );
}
