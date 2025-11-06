'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { TaskList } from "@/components/tutor-assistant/task-list";

export default function TasksPage() {
    return (
        <ProtectedRoute
            requireAuth={true}
            allowedRoles={[UserRole.TEACHER]}
        >
            <TaskList />
        </ProtectedRoute>
    );
}
