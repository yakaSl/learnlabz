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

      <Tabs defaultValue="general" className="flex-1" orientation="vertical">
        <TabsList className="w-48 h-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
        </TabsList>
        
        <div className="pl-4 w-full">
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
          <TabsContent value="email">
            <EmailTemplates />
          </TabsContent>
          <TabsContent value="ai">
            <AiConfig />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Override Tabs styles for vertical orientation
const originalTabsList = TabsList;
const originalTabsTrigger = TabsTrigger;
const originalTabsContent = TabsContent;

(Tabs as any).List = React.forwardRef<
  React.ElementRef<typeof originalTabsList>,
  React.ComponentPropsWithoutRef<typeof originalTabsList>
>(({ className, ...props }, ref) => {
  const tabs = React.useContext(Tabs as any);
  return tabs.orientation === 'vertical' ? (
    <originalTabsList
      ref={ref}
      className="flex-col h-auto items-start justify-start rounded-md bg-muted p-1 text-muted-foreground"
      {...props}
    />
  ) : (
    <originalTabsList ref={ref} className={className} {...props} />
  );
});

(Tabs as any).Trigger = React.forwardRef<
    React.ElementRef<typeof originalTabsTrigger>,
    React.ComponentPropsWithoutRef<typeof originalTabsTrigger>
>(({ className, ...props }, ref) => {
    const tabs = React.useContext(Tabs as any);
    return tabs.orientation === 'vertical' ? (
        <originalTabsTrigger
        ref={ref}
        className="w-full justify-start data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        {...props}
        />
    ) : (
        <originalTabsTrigger ref={ref} className={className} {...props} />
    );
});


(Tabs as any).Content = React.forwardRef<
    React.ElementRef<typeof originalTabsContent>,
    React.ComponentPropsWithoutRef<typeof originalTabsContent>
>(({ className, ...props }, ref) => {
    const tabs = React.useContext(Tabs as any);
    return tabs.orientation === 'vertical' ? (
        <originalTabsContent
        ref={ref}
        className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        {...props}
        />
    ) : (
        <originalTabsContent ref={ref} className={className} {...props} />
    );
});
