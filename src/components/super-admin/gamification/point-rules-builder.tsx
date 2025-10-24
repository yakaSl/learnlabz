"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";

const existingRules = [
    { id: 1, action: "Complete a Lesson", points: 10, conditions: "N/A" },
    { id: 2, action: "Daily Login", points: 5, conditions: "Once per day" },
    { id: 3, action: "Refer a Friend", points: 50, conditions: "When friend signs up" },
]

export function PointRulesBuilder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Point Rules Builder</CardTitle>
        <CardDescription>Define how users can earn points on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">New Rule</h4>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Rule
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="action">Action</Label>
                    <Select>
                        <SelectTrigger id="action">
                            <SelectValue placeholder="Select an action" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lesson-complete">Complete a Lesson</SelectItem>
                            <SelectItem value="daily-login">Daily Login</SelectItem>
                            <SelectItem value="referral">Refer a Friend</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" placeholder="e.g., 10" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="conditions">Conditions</Label>
                    <Input id="conditions" placeholder="e.g., Once per day" />
                </div>
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-lg mb-4">Existing Rules</h4>
            <div className="border rounded-md">
                {existingRules.map(rule => (
                    <div key={rule.id} className="flex items-center p-3 border-b last:border-b-0">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div><span className="font-medium">{rule.action}</span></div>
                            <div><span className="text-primary font-bold">{rule.points} points</span></div>
                            <div className="text-sm text-muted-foreground">{rule.conditions}</div>
                        </div>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
