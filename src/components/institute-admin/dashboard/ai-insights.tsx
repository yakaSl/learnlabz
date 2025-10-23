
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Lightbulb, AlertTriangle, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const insights = [
  { id: 1, text: "Weekly student attendance has increased by 7%. Keep up the great work!", icon: <TrendingUp className="text-success-foreground" />, category: 'Positive' },
  { id: 2, text: "Potential churn risk of 15% for 'Advanced Physics' class due to low engagement. Consider a survey.", icon: <AlertTriangle className="text-destructive" />, category: 'Risk' },
  { id: 3, text: "Tutor 'Mrs. Davis' has the highest student satisfaction ratings this month. Acknowledge her performance.", icon: <Lightbulb className="text-accent" />, category: 'Opportunity' },
];

export function AiInsights() {
  return (
    <Collapsible defaultOpen>
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
                <div className="bg-accent/20 text-accent p-2 rounded-lg">
                    <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>AI Insights & Predictions</CardTitle>
                    <CardDescription>Weekly summary and proactive alerts.</CardDescription>
                </div>
            </div>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                </Button>
            </CollapsibleTrigger>
        </div>
      </CardHeader>
      <CollapsibleContent>
      <CardContent className="flex-grow">
          <div className="space-y-6">
            {insights.map(insight => (
              <div key={insight.id} className="p-3 rounded-md border bg-background/50 flex items-start gap-3">
                <div className="mt-1">{insight.icon}</div>
                <div className="flex-1">
                    <p className="text-sm">{insight.text}</p>
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ThumbsDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
              </div>
            ))}
          </div>
      </CardContent>
      </CollapsibleContent>
    </Card>
    </Collapsible>
  );
}
