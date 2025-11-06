
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER_ASSISTANT]}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your profile and notification preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Settings page coming soon.</p>
                </CardContent>
            </Card>
        </ProtectedRoute>
    );
}
