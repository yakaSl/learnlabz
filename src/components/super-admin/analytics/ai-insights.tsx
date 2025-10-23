"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  { id: 1, text: "User sign-ups from the APAC region have increased by 25% week-over-week, driven by the 'Innovate Learning Co.' marketing campaign.", category: 'Growth' },
  { id: 2, text: "The 'Premium' subscription tier shows a potential churn risk of 12% next month. Suggest offering a limited-time discount to retain users.", category: 'Risk' },
  { id: 3, text: "Average student engagement time is highest on Tuesdays. Consider scheduling more featured classes on this day.", category: 'Opportunity' },
  { id: 4, text: "A high number of payout failures are linked to a single bank. This may indicate an issue with their processing system.", category: 'Anomaly' },
];

export function AiInsights() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-accent/20 text-accent p-2 rounded-lg">
                <Lightbulb className="h-6 w-6" />
            </div>
            <div>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Natural language summaries of your data.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-6">
            {insights.map(insight => (
              <div key={insight.id} className="p-3 rounded-md border bg-background/50">
                <p className="text-sm">{insight.text}</p>
                <div className="flex items-center justify-between mt-3">
                    <p className="text-xs font-medium text-muted-foreground">{insight.category}</p>
                    <div className="flex items-center gap-2">
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
