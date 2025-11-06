
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import GamificationManagement from "@/components/super-admin/gamification/gamification-management";

export default function SuperAdminGamificationPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <GamificationManagement />
    </ProtectedRoute>
  );
}
