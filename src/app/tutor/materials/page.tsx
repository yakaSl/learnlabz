'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import MaterialsManagement from "@/components/tutor/materials/materials-management";

export default function TutorMaterialsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <MaterialsManagement />
    </ProtectedRoute>
  );
}
