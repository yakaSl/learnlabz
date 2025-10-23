
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  { id: 1, user: { name: 'John Doe', avatar: 'https://picsum.photos/seed/u1/32/32' }, action: 'enrolled in Math 101', type: 'student', time: '2m ago' },
  { id: 2, user: { name: 'Emily Davis', avatar: 'https://picsum.photos/seed/u4/32/32' }, action: 'posted a new announcement', type: 'tutor', time: '10m ago' },
  { id: 3, user: { name: 'Admin', avatar: 'https://picsum.photos/seed/ia-user/32/32' }, action: 'updated billing information', type: 'admin', time: '1h ago' },
  { id: 4, user: { name: 'System', avatar: 'https://picsum.photos/seed/s1/32/32' }, action: 'sent payment reminders', type: 'system', time: '3h ago' },
  { id: 5, user: { name: 'Michael Johnson', avatar: 'https://picsum.photos/seed/u3/32/32' }, action: 'completed "Intro to Algebra"', type: 'student', time: 'yesterday' },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A feed of recent events in your institute.</CardDescription>
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
