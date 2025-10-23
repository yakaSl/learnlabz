
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CommunicationWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>1 unread message</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
            <Avatar>
                <AvatarImage src="https://picsum.photos/seed/tutor1/32/32" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-semibold">From: Mr. John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Regarding Alex's progress in Algebra...</p>
            </div>
        </div>
        <Button variant="outline" className="w-full">View All Messages</Button>
      </CardContent>
    </Card>
  );
}
