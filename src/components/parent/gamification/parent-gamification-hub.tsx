
"use client";

import { AiMotivationSuggestions } from "./ai-motivation-suggestions";
import { BadgeGallery } from "./badge-gallery";
import { Leaderboard } from "./leaderboard";
import { PointsSummary } from "./points-summary";

export default function ParentGamificationHub() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alex's Achievements</h1>
        <p className="text-muted-foreground">A summary of your child's progress and milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
            <Leaderboard />
            <BadgeGallery />
        </div>
        <div className="lg:col-span-4 space-y-8">
            <PointsSummary />
            <AiMotivationSuggestions />
        </div>
      </div>
    </div>
  );
}
