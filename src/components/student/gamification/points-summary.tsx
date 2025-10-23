
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { pointsData } from "./data";

export function PointsSummary() {
  const progressPercentage = (pointsData.currentPoints / pointsData.pointsForNextLevel) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Progress</CardTitle>
        <CardDescription>Your current level and points.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto" strokeWidth={1.5}/>
            <p className="text-3xl font-bold">Level {pointsData.level}</p>
            <p className="text-muted-foreground font-medium">{pointsData.title}</p>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
                <span>Level Progress</span>
                <span>{pointsData.currentPoints.toLocaleString()} / {pointsData.pointsForNextLevel.toLocaleString()} XP</span>
            </div>
            <Progress value={progressPercentage} />
            <p className="text-xs text-muted-foreground text-center pt-1">
              {pointsData.pointsForNextLevel - pointsData.currentPoints} points to the next level!
            </p>
        </div>
      </CardContent>
    </Card>
  )
}
