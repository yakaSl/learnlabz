"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { achievements } from "./data";
import { Button } from "@/components/ui/button";

export function AchievementHighlights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievement Highlights</CardTitle>
        <CardDescription>Your recent accomplishments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border">
            <div className="text-2xl">{item.icon}</div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
         <Button variant="link" className="p-0 h-auto">View all achievements</Button>
      </CardContent>
    </Card>
  );
}
