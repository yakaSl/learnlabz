
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leaderboardData } from "./data";
import { Crown, Flame } from "lucide-react";

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See how you stack up against your peers.</CardDescription>
      </CardHeader>
      <CardContent>
         <Tabs defaultValue="class">
            <TabsList className="grid w-full grid-cols-2 max-w-sm">
                <TabsTrigger value="class">This Class</TabsTrigger>
                <TabsTrigger value="institute">All of LearnLabz</TabsTrigger>
            </TabsList>
            <TabsContent value="class" className="mt-4">
                <div className="space-y-4">
                    {leaderboardData.map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border bg-muted/50">
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
            </TabsContent>
             <TabsContent value="institute" className="mt-4">
                 <p className="text-center text-muted-foreground p-8">Institute-wide leaderboard coming soon!</p>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
