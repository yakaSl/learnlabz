'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ParentAttendanceView from "@/components/parent/attendance/parent-attendance-view";

export default function ParentAttendancePage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <ParentAttendanceView />
        </ProtectedRoute>
    );
}
