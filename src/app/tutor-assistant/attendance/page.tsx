'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AttendanceMarking from "@/components/tutor-assistant/attendance/attendance-marking";

export default function AttendancePage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER]}
        >
            <AttendanceMarking />
        </ProtectedRoute>
    );
}
