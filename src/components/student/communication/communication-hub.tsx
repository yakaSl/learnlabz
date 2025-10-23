
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

const announcements = [
    { id: 1, title: "Mid-term Exam Schedule", from: "Mr. John Doe", time: "2 hours ago", snippet: "Hi everyone, the mid-term exam has been scheduled for next Friday..." },
    { id: 2, title: "Welcome to Physics!", from: "Mrs. Emily Davis", time: "1 day ago", snippet: "I'm so excited to start our journey into the world of physics..." },
];

export default function CommunicationHub() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Communication Hub</h1>
        <p className="text-muted-foreground">Stay connected with your tutors and classmates.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
             <Card>
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="announcements" orientation="vertical" className="w-full">
                        <TabsList className="p-2 h-auto grid grid-cols-3 lg:grid-cols-1">
                            <TabsTrigger value="announcements">Announcements</TabsTrigger>
                            <TabsTrigger value="messages">Messages</TabsTrigger>
                            <TabsTrigger value="discussions">Discussions</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-8 xl:col-span-9">
            <Card>
                <CardHeader>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Important updates from your tutors.</CardDescription>
                </CardHeader>
                 <CardContent className="border-t">
                    <div className="divide-y">
                        {announcements.map(item => (
                            <div key={item.id} className="p-4 hover:bg-muted/50 cursor-pointer">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold">{item.from}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground truncate">{item.snippet}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
