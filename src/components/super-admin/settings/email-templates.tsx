"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic, Underline, List } from "lucide-react";

export function EmailTemplates() {
  const [content, setContent] = useState("<h1>Welcome to LearnLabz, {{user.name}}!</h1><p>We're excited to have you on board.</p>");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
        <CardDescription>Customize automated emails sent to users.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="template-select">Select Template to Edit</Label>
                <Select defaultValue="welcome">
                    <SelectTrigger id="template-select">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="welcome">Welcome Email</SelectItem>
                        <SelectItem value="password-reset">Password Reset</SelectItem>
                        <SelectItem value="payout-notification">Payout Notification</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-editor">Template Content (HTML)</Label>
                <div className="flex items-center gap-2 p-2 rounded-t-md border bg-muted">
                    <Button variant="outline" size="icon" className="h-8 w-8"><Bold className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Italic className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Underline className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><List className="h-4 w-4" /></Button>
                </div>
                <Textarea
                    id="email-editor"
                    className="min-h-[300px] rounded-t-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
        <div className="space-y-4">
            <Label>Live Preview</Label>
            <div className="rounded-md border min-h-[400px] p-4 bg-gray-100" dangerouslySetInnerHTML={{ __html: content.replace("{{user.name}}", "John Doe") }}>
            </div>
            <p className="text-xs text-muted-foreground">
                This is a rendered preview of your template. Use placeholders like `{{user.name}}` or `{{payout.amount}}`.
            </p>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button>Save Template</Button>
        <Button variant="outline">Send Test Email</Button>
      </CardFooter>
    </Card>
  );
}
