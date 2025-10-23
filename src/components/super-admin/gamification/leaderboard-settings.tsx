/** @jsxImportSource react */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";

export function LeaderboardSettings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard Configuration</CardTitle>
            <CardDescription>Set up and manage competitive leaderboards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Active Leaderboards</Label>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Checkbox id="weekly-points" defaultChecked />
                    <Label htmlFor="weekly-points" className="font-normal flex-1">Weekly Points Challenge</Label>
                    <Select defaultValue="global">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="institute">Per Institute</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Checkbox id="monthly-referrals" />
                    <Label htmlFor="monthly-referrals" className="font-normal flex-1">Monthly Referral Contest</Label>
                    <Select defaultValue="global">
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="institute">Per Institute</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
              <Label>Reward Tiers</Label>
              <p className="text-sm text-muted-foreground">Define rewards for top performers in each cycle.</p>
              <div className="flex items-center gap-4">
                 <Input placeholder="Top 1 Reward (e.g. 1000 points)" />
                 <Input placeholder="Top 10 Reward (e.g. 100 points)" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Leaderboard Settings</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>A sample student view of a leaderboard.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-bold mb-3 flex items-center gap-2"><Trophy className="text-yellow-500" /> Weekly Top Learners</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-md bg-background">
                        <span className="font-bold text-lg">1.</span>
                        <div className="flex-1">
                            <p className="font-semibold">Sarah J.</p>
                            <p className="text-xs text-muted-foreground">Bright Minds Academy</p>
                        </div>
                        <span className="font-bold text-primary">1,250 pts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md bg-background/80">
                        <span className="font-bold text-lg">2.</span>
                        <div className="flex-1">
                            <p className="font-semibold">Michael B.</p>
                            <p className="text-xs text-muted-foreground">Innovate Learning Co.</p>
                        </div>
                        <span className="font-bold text-primary">1,180 pts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md bg-background/60">
                        <span className="font-bold text-lg">3.</span>
                        <div className="flex-1">
                            <p className="font-semibold">Emily R.</p>
                            <p className="text-xs text-muted-foreground">Global Tutoring</p>
                        </div>
                        <span className="font-bold text-primary">1,120 pts</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
