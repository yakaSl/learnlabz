
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell } from "lucide-react";
import { ProfileTab } from "./profile-tab";
import { SecurityTab } from "./security-tab";
import { NotificationsTab } from "./notifications-tab";

export default function ParentSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your profile, children, and security preferences.</p>
        </div>
        <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
                <TabsTrigger value="profile"><User className="mr-2"/>Profile</TabsTrigger>
                <TabsTrigger value="security"><Shield className="mr-2"/>Security</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="mr-2"/>Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4">
                <ProfileTab />
            </TabsContent>
            <TabsContent value="security" className="mt-4">
                <SecurityTab />
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
                <NotificationsTab />
            </TabsContent>
        </Tabs>
    </div>
  );
}
