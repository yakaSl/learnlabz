/** @jsxImportSource react */
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCreator } from "./badge-creator";
import { PointRulesBuilder } from "./point-rules-builder";
import { AchievementTree } from "./achievement-tree";
import { LeaderboardSettings } from "./leaderboard-settings";

export default function GamificationManagement() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Gamification Configuration</h1>
        <p className="text-muted-foreground">Define and manage the rewards system for the platform.</p>
      </div>
      <Tabs defaultValue="badges" className="flex-1">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="points">Point Rules</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
        </TabsList>
        <TabsContent value="badges" className="mt-4">
            <BadgeCreator />
        </TabsContent>
         <TabsContent value="points" className="mt-4">
            <PointRulesBuilder />
        </TabsContent>
         <TabsContent value="achievements" className="mt-4">
            <AchievementTree />
        </TabsContent>
         <TabsContent value="leaderboards" className="mt-4">
            <LeaderboardSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
