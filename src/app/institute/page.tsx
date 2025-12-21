
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { StatCards } from "@/components/institute-admin/dashboard/stat-cards";
import { RevenueChart } from "@/components/institute-admin/dashboard/revenue-chart";
import { ClassCalendar } from "@/components/institute-admin/dashboard/class-calendar";
import { ActivityFeed } from "@/components/institute-admin/dashboard/activity-feed";
import { QuickActions } from "@/components/institute-admin/dashboard/quick-actions";
import { AiInsights } from "@/components/institute-admin/dashboard/ai-insights";

export default function InstituteAdminDashboard() {
  return (
    <ProtectedRoute
      requireAuth={true}
      allowedRoles={[UserRole.INSTITUTE]}
    >
      <div className="grid gap-4 md:gap-8">
        <StatCards />
        <QuickActions />
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
          <div className="lg:col-span-4 grid gap-4 auto-rows-min">
              <RevenueChart />
              <ClassCalendar />
          </div>
          <div className="lg:col-span-3 grid gap-4 auto-rows-min">
              <AiInsights />
              <ActivityFeed />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
