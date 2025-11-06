'use client';
import * as React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import NewExamPage from "@/components/tutor/classes/details/new-exam-page";

export default function CreateExamPage({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = React.use(params);
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER]}
        >
            <NewExamPage classId={classId} />
        </ProtectedRoute>
    );
}
