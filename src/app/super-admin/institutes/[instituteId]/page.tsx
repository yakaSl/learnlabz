'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import InstituteProfilePage from "@/components/super-admin/institutes/details/institute-profile-page";

export default function SuperAdminInstituteDetailPage({ params }: { params: { instituteId: string } }) {
    const { instituteId } = params;
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.SUPER_ADMIN]}
        >
            <InstituteProfilePage instituteId={instituteId} />
        </ProtectedRoute>
    );
}
