"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

export function AiPerformanceInsights() {
  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI Performance Insights</CardTitle>
            <CardDescription>Suggestions to help you improve.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
            <TrendingUp className="h-4 w-4 mt-1 text-success-foreground" />
            <p>Great job in English! Your essay scores have improved by 10% this month.</p>
        </div>
        <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 mt-1 text-yellow-500" />
            <p>Your grade in History is slightly behind. Consider reviewing notes from the last two lectures.</p>
        </div>
      </CardContent>
    </Card>
  );
}
