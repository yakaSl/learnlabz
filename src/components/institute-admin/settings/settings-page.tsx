
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your institute's branding and configuration.</p>
        </div>
        <Tabs defaultValue="branding">
            <TabsList>
                <TabsTrigger value="branding">White-Label Branding</TabsTrigger>
                <TabsTrigger value="localization">Localization</TabsTrigger>
                <TabsTrigger value="branches">Branch Management</TabsTrigger>
            </TabsList>
            <TabsContent value="branding" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Branding</CardTitle>
                        <CardDescription>Customize the look and feel of your institute's pages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="logo">Institute Logo</Label>
                            <Input id="logo" type="file" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <Input id="primary-color" type="color" defaultValue="#67b1b0" />
                        </div>
                         <Button>Save Branding</Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="localization" className="mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Localization</CardTitle>
                        <CardDescription>Manage language settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Localization settings coming soon.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="branches" className="mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Branch Management</CardTitle>
                        <CardDescription>Manage your institute's various branches.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Branch management features coming soon.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
