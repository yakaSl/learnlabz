
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import GamificationHub from "@/components/student/gamification/gamification-hub";

export default function AchievementsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <GamificationHub />
    </ProtectedRoute>
  );
}
