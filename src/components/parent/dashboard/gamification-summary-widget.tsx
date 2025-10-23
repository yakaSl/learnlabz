
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Trophy, Star } from "lucide-react";

export function GamificationSummaryWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Alex's recent accomplishments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <div>
                <p className="font-semibold">Level 5 Reached!</p>
                <p className="text-xs text-muted-foreground">1,250 / 2,000 XP</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-green-500 fill-current" />
            <div>
                <p className="font-semibold">"First Steps" Badge</p>
                <p className="text-xs text-muted-foreground">Completed first lesson</p>
            </div>
         </div>
      </CardContent>
    </Card>
  )
}
