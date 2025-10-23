"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComposeNotification } from "./compose-notification";
import { ScheduledNotifications } from "./scheduled-notifications";
import { NotificationHistory } from "./notification-history";
import { NotificationTemplates } from "./notification-templates";

export default function NotificationCenter() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
        <p className="text-muted-foreground">
          Create, schedule, and analyze targeted communications.
        </p>
      </div>

      <Tabs defaultValue="compose" className="flex-1">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History & Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="compose" className="mt-4">
          <ComposeNotification />
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          <ScheduledNotifications />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
            <NotificationHistory />
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
            <NotificationTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
