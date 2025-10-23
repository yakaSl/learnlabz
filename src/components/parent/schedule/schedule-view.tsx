
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download } from "lucide-react";
import { ScheduleCalendar } from "./schedule-calendar";

export default function ScheduleView() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alex's Schedule</h1>
          <p className="text-muted-foreground">View class times, upcoming assessments, and sync to your calendar.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Sync to Calendar
            </Button>
        </div>
      </div>

      <Tabs defaultValue="month" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        <TabsContent value="month" className="mt-4">
            <ScheduleCalendar />
        </TabsContent>
         <TabsContent value="week" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <p>Week view coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="agenda" className="mt-4">
            <Card>
                <CardContent className="p-6">
                    <p>Agenda view coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
