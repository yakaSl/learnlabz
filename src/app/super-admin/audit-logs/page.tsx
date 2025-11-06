
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import AuditLogViewer from "@/components/super-admin/audit-logs/audit-log-viewer";

export default function SuperAdminAuditLogsPage() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.SUPER_ADMIN]}
    >
      <AuditLogViewer />
    </ProtectedRoute>
  );
}
