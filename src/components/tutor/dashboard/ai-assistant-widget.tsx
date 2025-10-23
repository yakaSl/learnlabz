
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Send } from "lucide-react";

const suggestions = [
  "Summarize last week's student performance.",
  "Suggest a new schedule for next month.",
  "Draft a message to parents of at-risk students.",
];

export function AiAssistantWidget() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 text-accent p-2 rounded-lg">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Your smart productivity partner.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
            {suggestions.map((s, i) => (
                <Button key={i} variant="outline" size="sm" className="w-full justify-start text-left h-auto">
                    {s}
                </Button>
            ))}
        </div>
        <div className="relative">
            <Textarea placeholder="Ask the AI assistant..." className="pr-10" />
            <Button size="icon" className="absolute bottom-2 right-2 h-7 w-7">
                <Send className="h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
