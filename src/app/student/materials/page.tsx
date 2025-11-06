'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import MaterialsBrowser from "@/components/student/materials/materials-browser";

export default function MaterialsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.STUDENT]}
    >
      <MaterialsBrowser />
    </ProtectedRoute>
  );
}
