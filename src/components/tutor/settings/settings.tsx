"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Lightbulb, Bell, User, Banknote, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Profile</CardTitle>
        <CardDescription>This information will be visible to students and parents.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://picsum.photos/seed/tutor-user/128/128" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" />
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Biography</Label>
          <Textarea id="bio" placeholder="Tell students a little about yourself..." className="min-h-[150px]" />
        </div>
        <div className="space-y-2">
          <Label>Qualifications</Label>
          <Input placeholder="E.g., B.S. in Mathematics" />
          <Input placeholder="E.g., Certified Physics Teacher" />
          <Button variant="outline" size="sm">Add Qualification</Button>
        </div>
        <div className="space-y-2">
          <Label>Subjects</Label>
          <Input placeholder="e.g., Algebra, Physics, Creative Writing" />
          <p className="text-xs text-muted-foreground">Separate subjects with commas.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Profile</Button>
      </CardFooter>
    </Card>
  )
}

function AccountTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your private account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Payout Details</Label>
                    <div className="p-4 border rounded-md space-y-4">
                        <Input placeholder="Bank Account Number" />
                        <Input placeholder="Routing Number" />
                    </div>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="2fa" className="font-semibold">Two-Factor Authentication (2FA)</Label>
                        <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                        </p>
                    </div>
                    <Switch id="2fa" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en-us">
                        <SelectTrigger id="language">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en-us">English (United States)</SelectItem>
                            <SelectItem value="es-es">Español (España)</SelectItem>
                            <SelectItem value="fr-fr">Français (France)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Account Settings</Button>
            </CardFooter>
        </Card>
    )
}

function NotificationsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="inapp-notifications">In-app Notifications</Label>
                    <Switch id="inapp-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <Switch id="sms-notifications" />
                </div>
            </CardContent>
             <CardFooter>
                <Button>Save Notification Settings</Button>
            </CardFooter>
        </Card>
    )
}


export default function Settings() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your profile, account, and notification preferences.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
                <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="profile"><User className="mr-2"/>Profile</TabsTrigger>
                        <TabsTrigger value="account"><Banknote className="mr-2"/>Account</TabsTrigger>
                        <TabsTrigger value="notifications"><Bell className="mr-2"/>Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <ProfileTab />
                    </TabsContent>
                    <TabsContent value="account">
                        <AccountTab />
                    </TabsContent>
                    <TabsContent value="notifications">
                        <NotificationsTab />
                    </TabsContent>
                </Tabs>
            </div>
             <div className="lg:col-span-4">
                <Card className="bg-accent/10 border-accent/20">
                    <CardHeader className="flex flex-row items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-accent" />
                        <CardTitle className="text-accent">AI Profile Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                       <p>Your bio is a bit short. Consider adding more details about your teaching philosophy.</p>
                       <p>Add at least 3 qualifications to build more trust with potential students.</p>
                       <Button variant="link" className="p-0 h-auto text-accent">Generate bio with AI</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
