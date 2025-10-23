
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

export function AiInsightsPanel() {
  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI-Generated Insights</CardTitle>
            <CardDescription>Personalized observations and tips.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
            <TrendingUp className="h-4 w-4 mt-1 text-success-foreground" />
            <p>Alex is excelling in English, consistently scoring above the class average. Great work!</p>
        </div>
        <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 mt-1 text-yellow-500" />
            <p>His grade in History has dipped slightly. Suggestion: Review the last two chapters with him before the next quiz.</p>
        </div>
      </CardContent>
    </Card>
  );
}
