import { StatGrid } from "@/components/super-admin/dashboard/stat-grid";
import { RevenueChart } from "@/components/super-admin/dashboard/revenue-chart";
import { UserGrowthChart } from "@/components/super-admin/dashboard/user-growth-chart";
import { ActivityFeed } from "@/components/super-admin/dashboard/activity-feed";
import { SystemHealth } from "@/components/super-admin/dashboard/system-health";
import { AlertPanel } from "@/components/super-admin/dashboard/alert-panel";
import { PredictiveAnalytics } from "@/components/super-admin/dashboard/predictive-analytics";
import { QuickActions } from "@/components/super-admin/dashboard/quick-actions";


export default function SuperAdminDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <StatGrid />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4 grid gap-4">
            <RevenueChart />
            <UserGrowthChart />
        </div>
        <div className="lg:col-span-3 grid gap-4 auto-rows-min">
            <ActivityFeed />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4 grid gap-4 auto-rows-min">
            <AlertPanel />
            <QuickActions />
        </div>
         <div className="lg:col-span-3 grid gap-4 auto-rows-min">
            <SystemHealth />
            <PredictiveAnalytics />
        </div>
      </div>
    </div>
  )
}
