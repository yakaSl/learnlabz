'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import ParentDashboard from "@/components/parent/dashboard/parent-dashboard";

export default function ParentDashboardPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.PARENT]}
        >
            <ParentDashboard />
        </ProtectedRoute>
    );
}
