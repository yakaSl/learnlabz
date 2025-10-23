"use client";

import { DateRangePicker } from "./date-range-picker";
import { Button } from "@/components/ui/button";
import { Share, PlusCircle } from "lucide-react";
import { WidgetLibrary } from "./widget-library";
import { AreaChartWidget, BarChartWidget, PieChartWidget } from "./chart-widgets";
import { AiInsights } from "./ai-insights";

export function DashboardView() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold">My Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <AreaChartWidget />
                </div>
                <BarChartWidget />
                <PieChartWidget />
            </div>
            <div className="xl:col-span-4">
                <AiInsights />
            </div>
        </div>
      </div>
      <WidgetLibrary />
    </div>
  );
}
