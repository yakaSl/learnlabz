"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

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
    if (value > 95) return 'bg-green-500';
    if (value > 85) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Progress value={health.api} indicatorClassName={getStatusColor(health.api)} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Database</span>
            <span className="text-sm font-medium">{health.db}%</span>
          </div>
          <Progress value={health.db} indicatorClassName={getStatusColor(health.db)} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Background Workers</span>
            <span className="text-sm font-medium">{health.workers}%</span>
          </div>
          <Progress value={health.workers} indicatorClassName={getStatusColor(health.workers)} />
        </div>
      </CardContent>
    </Card>
  );
}

// Add indicatorClassName to Progress component props
declare module "@/components/ui/progress" {
    interface ProgressProps {
        indicatorClassName?: string;
    }
}
React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-progress").Root>,
  React.ComponentPropsWithoutRef<typeof import("@radix-ui/react-progress").Root> & { indicatorClassName?: string }
// @ts-ignore
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <import("@radix-ui/react-progress").Root
    ref={ref}
    className={import("@/lib/utils").cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <import("@radix-ui/react-progress").Indicator
      className={import("@/lib/utils").cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </import("@radix-ui/react-progress").Root>
));
