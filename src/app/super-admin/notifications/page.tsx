'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import NotificationCenter from "@/components/super-admin/notifications/notification-center";

export default function SuperAdminNotificationsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <NotificationCenter />
    </ProtectedRoute>
  );
}
