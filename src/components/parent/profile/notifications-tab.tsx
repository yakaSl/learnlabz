
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { notificationSettings, linkedChildren } from "./data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive communications for each child.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {linkedChildren.map(child => (
            <div key={child.id}>
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={child.avatar} alt={child.name} />
                        <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{child.name}</h3>
                </div>
                <div className="border rounded-lg">
                    <div className="grid grid-cols-4 p-4 font-medium bg-muted/50 border-b">
                        <div className="col-span-2">Notification Type</div>
                        <div className="col-span-1 text-center">Email</div>
                        <div className="col-span-1 text-center">SMS</div>
                    </div>
                    <div className="divide-y">
                        {notificationSettings.map(setting => (
                            <div key={setting.id} className="grid grid-cols-4 p-4 items-center">
                                <div className="col-span-2">
                                     <Label htmlFor={`${child.id}-${setting.id}-email`} className="font-medium">{setting.label}</Label>
                                     <p className="text-xs text-muted-foreground">{setting.description}</p>
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <Switch id={`${child.id}-${setting.id}-email`} />
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <Switch id={`${child.id}-${setting.id}-sms`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
