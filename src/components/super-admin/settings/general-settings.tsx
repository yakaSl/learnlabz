"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Manage basic platform information and settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="platform-name">Platform Name</Label>
          <Input id="platform-name" defaultValue="LearnLabz" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform-logo">Platform Logo</Label>
          <div className="flex items-center gap-4">
            <Input id="platform-logo" type="file" className="flex-1"/>
            <Button variant="outline">Upload</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="default-timezone">Default Timezone</Label>
          <Select defaultValue="utc-5">
            <SelectTrigger id="default-timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc-5">(UTC-05:00) Eastern Time</SelectItem>
              <SelectItem value="utc-8">(UTC-08:00) Pacific Time</SelectItem>
              <SelectItem value="utc+1">(UTC+01:00) Central European Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
         <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="maintenance-mode" className="font-semibold">Maintenance Mode</Label>
            <p className="text-sm text-muted-foreground">
              Temporarily take the platform offline for updates.
            </p>
          </div>
          <Switch id="maintenance-mode" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
