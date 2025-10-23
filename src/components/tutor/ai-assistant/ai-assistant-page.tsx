
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Mic, Sparkles } from "lucide-react";
import { Separator } from '@/components/ui/separator';

const quickActions = [
    "Generate a 5-question quiz on Algebra basics.",
    "Summarize the performance of my 'Physics 101' class.",
    "Draft a positive progress update for Alice Johnson's parents."
];

export default function AiAssistantPage() {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Hello! I'm your AI assistant. How can I help you be more productive today?"
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { role: 'user', content: input }]);
            // Mock AI response
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: "Here's a draft for that quiz..." }]);
            }, 1000);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
                <p className="text-muted-foreground">Your smart partner for lesson planning, student insights, and more.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
                <div className="lg:col-span-2 flex flex-col">
                    <Card className="flex-1 flex flex-col">
                        <CardContent className="p-4 flex-1 flex flex-col">
                            <ScrollArea className="flex-1 mb-4 pr-4">
                                <div className="space-y-6">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                            {msg.role === 'ai' && (
                                                <Avatar className="h-8 w-8 border bg-accent/20 text-accent">
                                                    <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={`p-3 rounded-lg max-w-lg ${msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                             {msg.role === 'user' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="https://picsum.photos/seed/tutor-user/32/32" alt="John Doe" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="relative">
                                <Textarea
                                    placeholder="Ask me anything... e.g., 'Create a lesson plan for intro to calculus'"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                    className="pr-20 min-h-[60px]"
                                />
                                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                     <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Mic className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" className="h-8 w-8" onClick={handleSend}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Try these common prompts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quickActions.map((action, i) => (
                                <Button key={i} variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2" onClick={() => setInput(action)}>
                                    {action}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Weekly Summary</CardTitle>
                            <CardDescription>An AI-generated overview of your last week.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                           <p>Overall attendance was <strong>94%</strong>, up 2% from the previous week.</p>
                           <p><strong>Alice Johnson</strong> showed the most improvement in assessment scores.</p>
                           <p>Consider reviewing 'Newton's Laws' as several students struggled with it.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
