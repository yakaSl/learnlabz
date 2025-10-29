
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "./dashboard-view";
import { ReportGallery } from "./report-gallery";
import { ReportScheduler } from "./report-scheduler";

export default function AnalyticsDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground">Create custom dashboards, generate reports, and gain AI-powered insights.</p>
      </div>

      <Tabs defaultValue="dashboard" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4">
          <DashboardView />
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <ReportGallery />
        </TabsContent>
        <TabsContent value="scheduler" className="mt-4">
          <ReportScheduler />
        </TabsContent>
      </Tabs>
    </div>
  );
}
