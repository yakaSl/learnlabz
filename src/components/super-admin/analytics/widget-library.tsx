"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GripVertical, LineChart, BarChart, PieChart, ScatterChart, AreaChart, Map } from "lucide-react";

const widgets = [
    { name: "User Growth", icon: <LineChart />, type: "Line Chart" },
    { name: "Revenue by Tier", icon: <BarChart />, type: "Bar Chart" },
    { name: "User Role Distribution", icon: <PieChart />, type: "Pie Chart" },
    { name: "Engagement Scatter", icon: <ScatterChart />, type: "Scatter Plot" },
    { name: "Activity Heatmap", icon: <Map />, type: "Heatmap" },
    { name: "Subscription Churn", icon: <AreaChart />, type: "Area Chart" },
]

export function WidgetLibrary() {
    return (
        <Card className="w-full lg:w-72 xl:w-80">
            <CardHeader>
                <CardTitle>Widget Library</CardTitle>
                <CardDescription>Drag & drop to build your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {widgets.map((widget, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-md border bg-background hover:bg-muted cursor-grab">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <div className="text-primary">{widget.icon}</div>
                        <div>
                            <p className="font-semibold text-sm">{widget.name}</p>
                            <p className="text-xs text-muted-foreground">{widget.type}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
