
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

export default function CommunicationHub() {
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Communication Hub</h1>
            <p className="text-muted-foreground">Send announcements and messages to your community.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipients">Recipients</Label>
                        <Select>
                            <SelectTrigger id="recipients">
                                <SelectValue placeholder="Select audience..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-students">All Students</SelectItem>
                                <SelectItem value="all-tutors">All Tutors</SelectItem>
                                <SelectItem value="all-parents">All Parents</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="channel">Channel</Label>
                        <Select>
                            <SelectTrigger id="channel">
                                <SelectValue placeholder="Select channel..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="in-app">In-app Notification</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." className="min-h-[200px]" />
                </div>
                 <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
