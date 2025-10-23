"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  { id: 1, user: { name: 'Admin One', avatar: 'https://picsum.photos/seed/a1/32/32' }, action: 'updated system configuration', type: 'config', time: '2m ago' },
  { id: 2, user: { name: 'Institute ABC', avatar: 'https://picsum.photos/seed/i1/32/32' }, action: 'was approved', type: 'institute', time: '10m ago' },
  { id:3, user: { name: 'John Doe', avatar: 'https://picsum.photos/seed/u1/32/32' }, action: 'reported an issue', type: 'user', time: '1h ago' },
  { id: 4, user: { name: 'System', avatar: 'https://picsum.photos/seed/s1/32/32' }, action: 'generated a weekly revenue report', type: 'system', time: '3h ago' },
  { id: 5, user: { name: 'Admin Two', avatar: 'https://picsum.photos/seed/a2/32/32' }, action: 'triggered a manual backup', type: 'system', time: 'yesterday' },
  { id: 6, user: { name: 'Jane Smith', avatar: 'https://picsum.photos/seed/u2/32/32' }, action: 'upgraded their plan', type: 'payment', time: 'yesterday' },
  { id: 7, user: { name: 'Institute XYZ', avatar: 'https://picsum.photos/seed/i2/32/32' }, action: 'added 5 new instructors', type: 'institute', time: '2 days ago' },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Activity Feed</CardTitle>
        <CardDescription>An infinite scroll feed of platform events.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-bold">{activity.user.name}</span> {activity.action}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge variant="secondary">{activity.type}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
