
"use client";

import { DateRangePicker } from "./date-range-picker";
import { Button } from "@/components/ui/button";
import { Share, PlusCircle } from "lucide-react";
import { AreaChartWidget, BarChartWidget, PieChartWidget } from "./chart-widgets";
import { AiInsights } from "./ai-insights";
import { DndContext } from "@dnd-kit/core";
import { WidgetLibrary } from "./widget-library";

export function DashboardView() {
  return (
    <DndContext>
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 xl:col-span-2">
            <WidgetLibrary />
          </div>
          <div className="lg:col-span-9 xl:col-span-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              <div className="xl:col-span-3">
                  <AreaChartWidget />
              </div>
              <div className="xl:col-span-2">
                <BarChartWidget />
              </div>
              <PieChartWidget />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
