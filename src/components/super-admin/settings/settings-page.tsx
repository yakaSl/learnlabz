/** @jsxImportSource react */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { IntegrationsSettings } from "./integrations-settings";
import { SecuritySettings } from "./security-settings";
import { FeatureFlags } from "./feature-flags";
import { AiConfig } from "./ai-config";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Manage platform-wide configurations and features.</p>
      </div>

      <Tabs defaultValue="general" className="md:grid md:grid-cols-[180px_1fr] md:gap-6">
        <TabsList className="grid w-full grid-cols-5 md:grid-cols-1 md:h-auto md:items-start">
          <TabsTrigger value="general" className="md:justify-start">General</TabsTrigger>
          <TabsTrigger value="features" className="md:justify-start">Feature Flags</TabsTrigger>
          <TabsTrigger value="integrations" className="md:justify-start">Integrations</TabsTrigger>
          <TabsTrigger value="security" className="md:justify-start">Security</TabsTrigger>
          <TabsTrigger value="ai" className="md:justify-start">AI Configuration</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 md:mt-0">
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="features">
            <FeatureFlags />
          </TabsContent>
          <TabsContent value="integrations">
            <IntegrationsSettings />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="ai">
            <AiConfig />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
