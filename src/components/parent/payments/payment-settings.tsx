
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const children = [
    { name: "Alex Garcia", avatar: "https://picsum.photos/seed/student-user/32/32" },
    { name: "Sofia Garcia", avatar: "https://picsum.photos/seed/student2/32/32" },
];

export function PaymentSettings() {
  return (
      <Card>
        <CardHeader>
            <CardTitle>Auto-Pay Settings</CardTitle>
            <CardDescription>Enable auto-pay for each child to handle recurring fees automatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {children.map(child => (
                <div key={child.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={child.avatar} alt={child.name} />
                            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <Label htmlFor={`autopay-${child.name.split(' ')[0]}`} className="font-semibold text-base">{child.name}</Label>
                             <p className="text-sm text-muted-foreground">Auto-pay is currently disabled.</p>
                        </div>
                    </div>
                    <Switch id={`autopay-${child.name.split(' ')[0]}`} />
                </div>
            ))}
        </CardContent>
        <CardFooter>
            <Button>Save Settings</Button>
        </CardFooter>
      </Card>
  );
}
