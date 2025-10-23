
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const suggestions = [
  { id: 1, text: "Complete 2 more lessons to unlock the 'Course Explorer' badge." },
  { id: 2, text: "You're only 50 points behind Alex on the leaderboard. A quiz can close the gap!" },
  { id: 3, text: "Maintain your 5-day login streak to earn the 'Streak Keeper' badge tomorrow." },
];

export function AiSuggestions() {
  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI Next Step Suggestions</CardTitle>
            <CardDescription>Personalized tips to boost your rank.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {suggestions.map(item => (
            <div key={item.id} className="p-3 rounded-md bg-background/50 border">
                <p>{item.text}</p>
            </div>
        ))}
        <Button variant="link" className="p-0 h-auto text-accent">Generate more ideas</Button>
      </CardContent>
    </Card>
  );
}
