
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is how others will see you on the site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://picsum.photos/seed/student-user/128/128" alt="Alex Smith" />
            <AvatarFallback>AS</AvatarFallback>
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
                <Input id="first-name" defaultValue="Alex" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Smith" />
            </div>
        </div>
         <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en-us">
                <SelectTrigger id="language" className="w-[280px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en-us">English (United States)</SelectItem>
                    <SelectItem value="es-es">Español (España)</SelectItem>
                    <SelectItem value="fr-fr">Français (France)</SelectItem>
                </SelectContent>
            </Select>
         </div>
         <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="leaderboard-opt-out" className="font-semibold">Leaderboard Participation</Label>
            <p className="text-sm text-muted-foreground">
              Allow your name to be shown on class and institute leaderboards.
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
