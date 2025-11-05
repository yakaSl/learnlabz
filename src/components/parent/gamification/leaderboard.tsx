
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboardData } from "./data";
import { Crown, Flame } from "lucide-react";
import { cn } from "@/app/lib/utils";

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Leaderboard</CardTitle>
        <CardDescription>Alex's rank in the 'Algebra 101' class.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {leaderboardData.map((user, index) => (
                <div key={user.id} className={cn("flex items-center gap-4 p-3 rounded-lg border", user.name === 'Alex Garcia' && 'bg-primary/10 border-primary')}>
                    <div className="flex items-center gap-4 w-12">
                        <span className="font-bold text-lg">{user.rank}.</span>
                        {user.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold flex-1">{user.name}</p>
                    <div className="flex items-center gap-1 font-bold text-primary">
                        <Flame className="h-4 w-4" />
                        <span>{user.points.toLocaleString()}</span>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
