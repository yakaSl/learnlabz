
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell } from "lucide-react";
import { ProfileTab } from "./profile-tab";
import { AccountTab } from "./account-tab";
import { NotificationsTab } from "./notifications-tab";

export default function StudentSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your profile, preferences, and account security.</p>
        </div>
        <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
                <TabsTrigger value="profile"><User className="mr-2"/>Profile</TabsTrigger>
                <TabsTrigger value="account"><Shield className="mr-2"/>Account & Security</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="mr-2"/>Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4">
                <ProfileTab />
            </TabsContent>
            <TabsContent value="account" className="mt-4">
                <AccountTab />
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
                <NotificationsTab />
            </TabsContent>
        </Tabs>
    </div>
  );
}
