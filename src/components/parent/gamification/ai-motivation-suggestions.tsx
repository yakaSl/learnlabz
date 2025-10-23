
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const suggestions = [
  { id: 1, text: "Alex is close to unlocking the 'Quiz Master' badge. A little encouragement could help him get there!" },
  { id: 2, text: "Consider celebrating his 5-day login streak to reinforce the positive habit." },
];

export function AiMotivationSuggestions() {
  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI Motivational Tips</CardTitle>
            <CardDescription>Suggestions for encouraging your child.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {suggestions.map(item => (
            <div key={item.id} className="p-3 rounded-md bg-background/50 border">
                <p>{item.text}</p>
            </div>
        ))}
        <Button variant="link" className="p-0 h-auto text-accent">More ideas</Button>
      </CardContent>
    </Card>
  );
}
