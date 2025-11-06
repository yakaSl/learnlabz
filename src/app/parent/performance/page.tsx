
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import PerformanceDashboard from "@/components/parent/performance/performance-dashboard";

export default function ParentPerformancePage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <PerformanceDashboard />
        </ProtectedRoute>
    );
}
