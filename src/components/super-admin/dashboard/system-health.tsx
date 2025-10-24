"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

// Custom Progress component that accepts indicatorClassName
const CustomProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
CustomProgress.displayName = 'CustomProgress';


export function SystemHealth() {
  const [health, setHealth] = React.useState({
    api: 99,
    db: 98,
    workers: 100,
  });

  // Mock WebSocket updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHealth({
        api: Math.floor(Math.random() * 5) + 95, // 95-99%
        db: Math.floor(Math.random() * 5) + 94, // 94-98%
        workers: Math.floor(Math.random() * 10) + 90, // 90-99%
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value > 95) return 'bg-success-foreground';
    if (value > 85) return 'bg-yellow-500';
    return 'bg-destructive';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>Live status of core services (updates every 30s).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">API Services</span>
            <span className="text-sm font-medium">{health.api}%</span>
          </div>
          <CustomProgress value={health.api} indicatorClassName={getStatusColor(health.api)} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Database</span>
            <span className="text-sm font-medium">{health.db}%</span>
          </div>
          <CustomProgress value={health.db} indicatorClassName={getStatusColor(health.db)} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Background Workers</span>
            <span className="text-sm font-medium">{health.workers}%</span>
          </div>
          <CustomProgress value={health.workers} indicatorClassName={getStatusColor(health.workers)} />
        </div>
      </CardContent>
    </Card>
  );
}
