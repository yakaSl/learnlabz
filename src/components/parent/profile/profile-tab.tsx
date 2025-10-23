
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { linkedChildren } from "./data";
import { X, UserPlus } from "lucide-react";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>This is how you'll appear on LearnLabz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://picsum.photos/seed/parent-user/128/128" alt="Maria Garcia" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" />
            <p className="text-xs text-muted-foreground">PNG or JPG, up to 5MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Maria" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Garcia" />
            </div>
        </div>

        <div className="space-y-4">
          <Label className="font-semibold">Linked Children</Label>
          <div className="space-y-3">
            {linkedChildren.map(child => (
              <div key={child.id} className="flex items-center gap-3 rounded-md border p-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="flex-1 font-medium">{child.name}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center gap-4">
              <Input placeholder="Enter child's invite code..." />
              <Button><UserPlus className="mr-2"/>Add Child</Button>
            </CardContent>
          </Card>
        </div>
         
         <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="leaderboard-opt-out" className="font-semibold">Privacy Settings</Label>
            <p className="text-sm text-muted-foreground">
              Allow your child's name to be shown on public leaderboards.
            </p>
          </div>
          <Switch id="leaderboard-opt-out" defaultChecked />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Profile</Button>
      </CardFooter>
    </Card>
  );
}
