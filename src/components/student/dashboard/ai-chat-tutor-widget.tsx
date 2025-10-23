
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AiChatTutorWidget() {
  return (
    <Card className="h-full flex flex-col bg-accent/10 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI Chat Tutor</CardTitle>
            <CardDescription>Stuck on a problem? Ask me anything!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm p-3 rounded-lg bg-background">
            "Can you explain Newton's Second Law in simple terms?"
        </p>
      </CardContent>
      <CardFooter>
        <div className="w-full relative">
            <Input placeholder="Ask a question..." className="pr-10 bg-background" />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Send className="h-4 w-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
