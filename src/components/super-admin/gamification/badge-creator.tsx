/** @jsxImportSource react */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Award, Shield, Star, Trash2, Edit } from "lucide-react";
import Image from "next/image";

const existingBadges = [
  { id: 1, name: "Pioneer", icon: <Award className="w-8 h-8 text-white" />, color: "bg-blue-500", description: "Joined within the first month." },
  { id: 2, name: "Super Learner", icon: <Star className="w-8 h-8 text-white" />, color: "bg-yellow-500", description: "Completed 10 courses." },
  { id: 3, name: "Community Helper", icon: <Shield className="w-8 h-8 text-white" />, color: "bg-green-500", description: "Answered 20 questions." },
];

export function BadgeCreator() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Badges</CardTitle>
            <CardDescription>Manage and view all created badges.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingBadges.map(badge => (
              <Card key={badge.id} className="flex flex-col items-center justify-center p-4 text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${badge.color} mb-3`}>
                  {badge.icon}
                </div>
                <p className="font-bold">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4"/></Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Create New Badge</CardTitle>
            <CardDescription>Design a new badge for users to earn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge-name">Badge Name</Label>
              <Input id="badge-name" placeholder="e.g., Fast Learner" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge-description">Description</Label>
              <Textarea id="badge-description" placeholder="Criteria for earning this badge" />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <Input id="badge-icon" type="file" className="flex-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create Badge</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
