"use client";

import { useState } from "react";
import { DateRangePicker } from "./date-range-picker";
import { Button } from "@/components/ui/button";
import { Share, PlusCircle, Trash2 } from "lucide-react";
import { WidgetLibrary } from "./widget-library";
import { AreaChartWidget, BarChartWidget, PieChartWidget } from "./chart-widgets";
import { AiInsights } from "./ai-insights";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";

const initialWidgets = [
  { id: "area", component: <AreaChartWidget />, size: "md:col-span-2" },
  { id: "bar", component: <BarChartWidget />, size: "md:col-span-1" },
  { id: "pie", component: <PieChartWidget />, size: "md:col-span-1" },
];

const widgetMap: { [key: string]: React.ReactNode } = {
    area: <AreaChartWidget />,
    bar: <BarChartWidget />,
    pie: <PieChartWidget />,
    'user-growth': <AreaChartWidget />,
    'revenue-tier': <BarChartWidget />,
    'role-distribution': <PieChartWidget />,
    'engagement-scatter': <BarChartWidget />,
    'activity-heatmap': <PieChartWidget />,
    'subscription-churn': <AreaChartWidget />,
}

function SortableWidget({ id, children }: { id: string, children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export function DashboardView() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
        if(over.id === 'delete-zone') {
            setWidgets(widgets => widgets.filter(w => w.id !== active.id));
            return;
        }

      const oldIndex = widgets.findIndex(w => w.id === active.id);
      const newIndex = widgets.findIndex(w => w.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
          const reordered = [...widgets];
          reordered.splice(oldIndex, 1);
          reordered.splice(newIndex, 0, widgets[oldIndex]);
          setWidgets(reordered);
      } else if (oldIndex === -1) { // New widget from library
        const widgetId = active.id as string;
        const newWidget = { id: `${widgetId}-${Date.now()}`, component: widgetMap[widgetId], size: 'md:col-span-1' };
        if(widgetId === 'area' || widgetId === 'user-growth' || widgetId === 'subscription-churn') {
            newWidget.size = 'md:col-span-2'
        }
        
        const overIndex = widgets.findIndex(w => w.id === over.id);
        if(overIndex !== -1) {
            const reordered = [...widgets];
            reordered.splice(overIndex, 0, newWidget);
            setWidgets(reordered);
        } else {
            setWidgets(widgets => [...widgets, newWidget]);
        }
      }
    }
  }

  const activeWidget = activeId ? widgets.find(w => w.id === activeId) : null;


  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
          
          <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {widgets.map(widget => (
                  <div key={widget.id} className={widget.size}>
                    <SortableWidget id={widget.id}>
                        {widget.component}
                    </SortableWidget>
                  </div>
                ))}
              </div>
              <div className="xl:col-span-4">
                <AiInsights />
              </div>
            </div>
          </SortableContext>
           
        </div>
        <WidgetLibrary />
      </div>
      <DragOverlay>
        {activeId && widgetMap[activeId] ? <Card className="p-4">{widgetMap[activeId]}</Card> : null}
        {activeId && activeWidget ? <div className={activeWidget.size}>{activeWidget.component}</div> : null}
      </DragOverlay>
       {activeId && <div id="delete-zone" className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-full">
            <Trash2 className="h-8 w-8" />
        </div>}
    </DndContext>
  );
}
