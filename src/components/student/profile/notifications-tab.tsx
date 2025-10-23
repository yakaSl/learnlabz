
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const notificationSettings = [
    { id: "new-grade", label: "A new grade is available", email: true, inApp: true, sms: false },
    { id: "assignment-due", label: "Assignment due in 24 hours", email: true, inApp: true, sms: true },
    { id: "class-starts", label: "Class starts in 15 minutes", email: false, inApp: true, sms: true },
    { id: "new-material", label: "New material is uploaded", email: false, inApp: true, sms: false },
    { id: "tutor-message", label: "You receive a message from a tutor", email: true, inApp: true, sms: false },
];

export function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive communications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
            <div className="grid grid-cols-4 p-4 font-medium bg-muted/50 border-b">
                <div className="col-span-1">Notification</div>
                <div className="col-span-1 text-center">Email</div>
                <div className="col-span-1 text-center">In-App</div>
                <div className="col-span-1 text-center">SMS</div>
            </div>
            <div className="divide-y">
                {notificationSettings.map(setting => (
                    <div key={setting.id} className="grid grid-cols-4 p-4 items-center">
                        <Label htmlFor={`${setting.id}-email`} className="col-span-1">{setting.label}</Label>
                        <div className="col-span-1 flex justify-center">
                            <Switch id={`${setting.id}-email`} defaultChecked={setting.email} />
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <Switch id={`${setting.id}-inapp`} defaultChecked={setting.inApp} />
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <Switch id={`${setting.id}-sms`} defaultChecked={setting.sms} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
