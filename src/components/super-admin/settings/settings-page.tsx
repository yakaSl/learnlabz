"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { IntegrationsSettings } from "./integrations-settings";
import { SecuritySettings } from "./security-settings";
import { FeatureFlags } from "./feature-flags";
import { EmailTemplates } from "./email-templates";
import { AiConfig } from "./ai-config";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Manage platform-wide configurations and features.</p>
      </div>

      <Tabs defaultValue="general" orientation="vertical" className="flex flex-col md:flex-row gap-6 md:gap-8">
        <TabsList className="w-full md:w-48 shrink-0 h-auto items-start">
          <TabsTrigger value="general" className="w-full justify-start">General</TabsTrigger>
          <TabsTrigger value="features" className="w-full justify-start">Feature Flags</TabsTrigger>
          <TabsTrigger value="integrations" className="w-full justify-start">Integrations</TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start">Security</TabsTrigger>
          <TabsTrigger value="email" className="w-full justify-start">Email Templates</TabsTrigger>
          <TabsTrigger value="ai" className="w-full justify-start">AI Configuration</TabsTrigger>
        </TabsList>
        
        <div className="w-full">
          <TabsContent value="general" className="mt-0">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="features" className="mt-0">
            <FeatureFlags />
          </TabsContent>
          <TabsContent value="integrations" className="mt-0">
            <IntegrationsSettings />
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="email" className="mt-0">
            <EmailTemplates />
          </TabsContent>
          <TabsContent value="ai" className="mt-0">
            <AiConfig />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
