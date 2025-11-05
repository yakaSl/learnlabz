
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Inbox, Send, Users, Megaphone, Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/app/lib/utils';
import { tutors, messages, selectedMessage } from './data';

export default function CommunicationHub() {
    const [activeTab, setActiveTab] = useState("inbox");
  
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">Communicate with your child's tutors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="md:col-span-2">
                <Card className="h-full">
                    <CardContent className="p-2">
                         <div className="flex flex-col gap-1">
                             <Button variant={activeTab === 'inbox' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('inbox')}>
                                <Inbox className="h-4 w-4" />
                                <span>Inbox</span>
                            </Button>
                            <Button variant={activeTab === 'announcements' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('announcements')}>
                                <Megaphone className="h-4 w-4" />
                                <span>Announcements</span>
                            </Button>
                            <Button variant={activeTab === 'tutors' ? 'secondary' : 'ghost'} className="w-full justify-start gap-2" onClick={() => setActiveTab('tutors')}>
                                <Users className="h-4 w-4" />
                                <span>Tutors</span>
                            </Button>
                         </div>
                    </CardContent>
                </Card>
            </div>

            {/* Message List */}
            <div className="md:col-span-4">
                 <Card className="h-full flex flex-col">
                    <CardHeader className="p-4 border-b">
                         <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <ScrollArea className="h-full">
                             <div className="divide-y">
                                {messages.map(item => (
                                    <div key={item.id} className="p-3 hover:bg-muted/50 cursor-pointer flex items-start gap-3">
                                        <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", !item.read && "bg-primary")} />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm">{item.from}</p>
                                                <p className="text-xs text-muted-foreground">{item.time}</p>
                                            </div>
                                            <p className="font-medium text-sm truncate">{item.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">{item.snippet}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            
            {/* Message Viewer */}
            <div className="md:col-span-6">
                <Card className="h-full flex flex-col">
                    <CardHeader className="p-4 border-b">
                        <h3 className="font-semibold">{selectedMessage.title}</h3>
                        <p className="text-sm text-muted-foreground">From: {selectedMessage.from}</p>
                    </CardHeader>
                    <CardContent className="flex-1 p-4">
                        <ScrollArea className="h-full">
                            <div className="space-y-6">
                                {selectedMessage.thread.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${msg.from === 'You' ? 'justify-end' : ''}`}>
                                        {msg.from !== 'You' && (
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.from} />
                                                <AvatarFallback>{selectedMessage.from.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="max-w-md">
                                            <div className={`p-3 rounded-lg ${msg.from !== 'You' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                            <p className={`text-xs text-muted-foreground mt-1 ${msg.from === 'You' ? 'text-right' : ''}`}>{msg.time}</p>
                                        </div>
                                        {msg.from === 'You' && (
                                            <Avatar className="h-8 w-8 border">
                                                <AvatarImage src="https://picsum.photos/seed/parent-user/32/32" alt="You" />
                                                <AvatarFallback>Y</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardContent className="p-4 border-t">
                         <div className="w-full relative">
                            <Textarea placeholder="Reply..." className="pr-20" />
                             <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <Paperclip className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">AI Suggestion: "Thanks for the update!"</Button>
                            <Button variant="outline" size="sm">AI Suggestion: "Can we schedule a call?"</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
