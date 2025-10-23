
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function AccountTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account & Security</CardTitle>
                <CardDescription>Manage your account settings and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.smith@email.com" readOnly />
                </div>
                
                <Separator />

                <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                     <Button variant="outline">Update Password</Button>
                </div>
                
                <Separator />

                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="2fa" className="font-semibold">Two-Factor Authentication (2FA)</Label>
                        <p className="text-sm text-muted-foreground">
                        Enhance your account security with an extra verification step.
                        </p>
                    </div>
                    <Switch id="2fa" />
                </div>
            </CardContent>
        </Card>
    )
}
