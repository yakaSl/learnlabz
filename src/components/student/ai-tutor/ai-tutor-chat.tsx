
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Mic, Sparkles, Folder, PlusCircle, Paperclip, ThumbsUp, ThumbsDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const quickPrompts = [
    "Explain Newton's Second Law in simple terms.",
    "Give me a 5-question quiz on World War II.",
    "Help me brainstorm ideas for an essay on 'The Great Gatsby'."
];

export default function AiTutorChat() {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Hello Alex! I'm your personal AI Tutor. What subject are we focusing on today?"
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { role: 'user', content: input }]);
            // Mock AI response with typing indicator
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: "That's a great question! Let me think..." }]);
            }, 1000);
            setInput('');
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
             <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight">AI Chat Tutor</h1>
                <p className="text-muted-foreground">Your personal AI-powered learning assistant.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
                {/* Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Context</CardTitle>
                            <CardDescription>Focus the AI on a specific topic.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Select defaultValue="general">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a class or topic..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Knowledge</SelectItem>
                                    <SelectItem value="algebra-101">Algebra 101</SelectItem>
                                    <SelectItem value="physics-beginners">Physics for Beginners</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Chat History</CardTitle>
                                <CardDescription>Your recent conversations.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon"><PlusCircle className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px]">
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">Newton's Second Law</Button>
                                    <Button variant="ghost" className="w-full justify-start">WWII Quiz</Button>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Chat Panel */}
                <div className="lg:col-span-3 flex flex-col">
                    <Card className="flex-1 flex flex-col">
                        <CardHeader>
                             <div className="flex items-center gap-2">
                                {quickPrompts.map((prompt, i) => (
                                    <Button key={i} variant="outline" size="sm" onClick={() => handleQuickPrompt(prompt)}>
                                        {prompt.split(' ').slice(0, 3).join(' ')}...
                                    </Button>
                                ))}
                            </div>
                        </CardHeader>
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
                                            <div className="max-w-xl">
                                                <div className={`p-3 rounded-lg ${msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                                    <p className="text-sm prose dark:prose-invert max-w-none">{msg.content}</p>
                                                </div>
                                                 {msg.role === 'ai' && index > 0 && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                         <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsUp className="h-4 w-4" /></Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p>Helpful</p></TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsDown className="h-4 w-4" /></Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent><p>Not Helpful</p></TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                )}
                                            </div>
                                             {msg.role === 'user' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="https://picsum.photos/seed/student-user/32/32" alt="Alex Smith" />
                                                    <AvatarFallback>AS</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="relative">
                                <Textarea
                                    placeholder="Ask about anything... For example, 'Can you explain quantum physics in simple terms?'"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                    className="pr-24 min-h-[60px]"
                                />
                                <div className="absolute bottom-3 right-3 flex items-center gap-1">
                                     <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Attach an image</p></TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                     <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Mic className="h-4 w-4" /></Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Use voice input</p></TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button size="icon" className="h-8 w-8" onClick={handleSend}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
