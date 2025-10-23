"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Configure platform-wide security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <Label htmlFor="mfa" className="font-semibold">Two-Factor Authentication (2FA)</Label>
            <p className="text-sm text-muted-foreground">
              Require all administrators to use 2FA.
            </p>
          </div>
          <Switch id="mfa" checked />
        </div>
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout</Label>
          <Select defaultValue="30m">
            <SelectTrigger id="session-timeout">
              <SelectValue placeholder="Select timeout duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15 minutes</SelectItem>
              <SelectItem value="30m">30 minutes</SelectItem>
              <SelectItem value="1h">1 hour</SelectItem>
              <SelectItem value="8h">8 hours</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Automatically log out users after a period of inactivity.
          </p>
        </div>
         <div className="space-y-2">
          <Label>Audit Logs</Label>
          <p className="text-sm text-muted-foreground">
            Review a detailed history of all administrative actions.
          </p>
          <Button variant="outline">View Audit Logs</Button>
        </div>
      </CardContent>
       <CardFooter>
        <Button>Save Security Settings</Button>
      </CardFooter>
    </Card>
  );
}
