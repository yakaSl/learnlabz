"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GripVertical, LineChart, BarChart, PieChart, ScatterChart, AreaChart, Map } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

const widgets = [
    { id: "user-growth", name: "User Growth", icon: <LineChart />, type: "Line Chart" },
    { id: "revenue-tier", name: "Revenue by Tier", icon: <BarChart />, type: "Bar Chart" },
    { id: "role-distribution", name: "User Role Distribution", icon: <PieChart />, type: "Pie Chart" },
    { id: "engagement-scatter", name: "Engagement Scatter", icon: <ScatterChart />, type: "Scatter Plot" },
    { id: "activity-heatmap", name: "Activity Heatmap", icon: <Map />, type: "Heatmap" },
    { id: "subscription-churn", name: "Subscription Churn", icon: <AreaChart />, type: "Area Chart" },
]

function DraggableWidget({ widget }: { widget: typeof widgets[0] }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: widget.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center gap-4 p-2 rounded-md border bg-background hover:bg-muted cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <div className="text-primary">{widget.icon}</div>
            <div>
                <p className="font-semibold text-sm">{widget.name}</p>
                <p className="text-xs text-muted-foreground">{widget.type}</p>
            </div>
        </div>
    )
}

export function WidgetLibrary() {
    return (
        <Card className="w-full lg:w-72 xl:w-80">
            <CardHeader>
                <CardTitle>Widget Library</CardTitle>
                <CardDescription>Drag & drop to build your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {widgets.map((widget) => (
                    <DraggableWidget key={widget.id} widget={widget} />
                ))}
            </CardContent>
        </Card>
    );
}
