
"use client";

import { AiSuggestions } from "./ai-suggestions";
import { BadgeGallery } from "./badge-gallery";
import { Leaderboard } from "./leaderboard";
import { PointsSummary } from "./points-summary";

export default function GamificationHub() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Achievements & Leaderboard</h1>
        <p className="text-muted-foreground">Track your progress, earn badges, and compete with your peers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
            <Leaderboard />
            <BadgeGallery />
        </div>
        <div className="lg:col-span-4 space-y-8">
            <PointsSummary />
            <AiSuggestions />
        </div>
      </div>
    </div>
  );
}
