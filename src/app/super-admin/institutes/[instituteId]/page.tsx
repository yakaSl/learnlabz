'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import InstituteProfilePage from "@/components/super-admin/institutes/details/institute-profile-page";

export default function SuperAdminInstituteDetailPage({ params }: { params: Promise<{ instituteId: string }> }) {
    const { instituteId } = React.use(params);
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.SUPER_ADMIN]}
        >
            <InstituteProfilePage instituteId={instituteId} />
        </ProtectedRoute>
    );
}
