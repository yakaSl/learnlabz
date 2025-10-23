
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

export function GamificationSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
            <p className="text-2xl font-bold">Level 5</p>
            <p className="text-sm text-muted-foreground">Novice Learner</p>
        </div>
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>Points</span>
                <span>1,250 / 2,000</span>
            </div>
            <Progress value={62.5} />
        </div>
        <div>
            <p className="text-sm font-medium">Next Badge: "Streak Keeper"</p>
            <p className="text-xs text-muted-foreground">Log in for 3 more days in a row.</p>
        </div>
      </CardContent>
    </Card>
  )
}
