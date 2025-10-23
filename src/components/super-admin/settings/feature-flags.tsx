"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const features = [
    { id: 'new-dashboard-ui', name: 'New Dashboard UI', description: 'Enable the redesigned analytics dashboard.', enabled: true, rollout: 100 },
    { id: 'ai-tutor-bot', name: 'AI Tutor Bot', description: 'Beta feature for automated student assistance.', enabled: true, rollout: 25 },
    { id: 'gamification', name: 'Gamification Elements', description: 'Introduce points and badges for student engagement.', enabled: false, rollout: 0 },
]

export function FeatureFlags() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
                <CardDescription>Toggle experimental features and manage gradual rollouts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {features.map(feature => (
                    <div key={feature.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Label htmlFor={feature.id} className="font-semibold text-base">{feature.name}</Label>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                            <Switch id={feature.id} defaultChecked={feature.enabled} />
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <Label htmlFor={`${feature.id}-rollout`}>Rollout Percentage</Label>
                                <span className="font-medium">{feature.rollout}%</span>
                            </div>
                            <Slider id={`${feature.id}-rollout`} defaultValue={[feature.rollout]} max={100} step={5} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
