
"use client";

import { PerformanceSummary } from "./performance-summary";
import { UpcomingClassesWidget } from "./upcoming-classes-widget";
import { RecentGradesWidget } from "./recent-grades-widget";
import { PaymentStatusPanel } from "./payment-status-panel";
import { CommunicationWidget } from "./communication-widget";
import { GamificationSummaryWidget } from "./gamification-summary-widget";
import { QuickActions } from "./quick-actions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export default function ParentDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <PerformanceSummary />
      <QuickActions />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        <div className="lg:col-span-5 grid gap-4 auto-rows-min">
            <UpcomingClassesWidget />
            <RecentGradesWidget />
        </div>
        <div className="lg:col-span-2 grid gap-4 auto-rows-min">
            <PaymentStatusPanel />
            <CommunicationWidget />
            <GamificationSummaryWidget />
        </div>
      </div>
      <Alert className="bg-accent/10 border-accent/20">
        <Lightbulb className="h-4 w-4 text-accent" />
        <AlertTitle className="text-accent">AI Performance Insight</AlertTitle>
        <AlertDescription>
          Alex's math scores have improved by 10% this month! Consider acknowledging his hard work to keep him motivated.
        </AlertDescription>
      </Alert>
    </div>
  );
}
