
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { badges, Badge as BadgeType } from "./data";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function BadgeItem({ badge }: { badge: BadgeType }) {
    const isLocked = !badge.unlocked;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn(
                        "flex flex-col items-center justify-center gap-2 text-center p-4 border rounded-lg transition-all",
                        isLocked ? "opacity-40 grayscale" : "bg-muted/30"
                    )}>
                        <div className={cn(
                            "relative w-20 h-20 rounded-full flex items-center justify-center",
                            !isLocked ? badge.color : 'bg-muted'
                        )}>
                            <badge.icon className={cn("w-10 h-10", !isLocked ? 'text-white' : 'text-muted-foreground')} />
                            {isLocked && <Lock className="absolute bottom-1 right-1 w-5 h-5 p-1 bg-background rounded-full" />}
                        </div>
                        <div className="w-full">
                            <p className="font-bold truncate">{badge.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{badge.description}</p>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isLocked ? `Locked: ${badge.description}` : badge.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function BadgeGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Badge Collection</CardTitle>
        <CardDescription>All the badges you've earned and can unlock.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map((badge) => (
                <BadgeItem key={badge.id} badge={badge} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
