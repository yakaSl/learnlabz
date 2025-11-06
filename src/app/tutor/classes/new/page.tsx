
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { CreateClassForm } from "@/components/tutor/classes/create-class-form";

export default function NewClassPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.TEACHER]}
    >
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create a New Class</h1>
          <p className="text-muted-foreground">
            Set up your class details, schedule, and pricing.
          </p>
        </div>
        <CreateClassForm />
      </div>
    </ProtectedRoute>
  );
}
