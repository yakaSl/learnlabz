"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MoreVertical, PlusCircle, Copy, TestTube2, Edit, Trash } from "lucide-react";

const templates = [
  { name: "Welcome Email", type: "Onboarding", lastUpdated: "2 weeks ago" },
  { name: "Password Reset", type: "Account", lastUpdated: "1 month ago" },
  { name: "Subscription Renewal", type: "Billing", lastUpdated: "3 days ago" },
  { name: "New Feature Announcement", type: "Marketing", lastUpdated: "1 day ago" },
];

export function NotificationTemplates() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Template Library</CardTitle>
                    <CardDescription>Manage reusable notification templates and conduct A/B tests.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Template
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                        <Card key={index} className="group flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <TestTube2 className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="font-bold">{template.name}</p>
                                <p className="text-sm text-muted-foreground">{template.type} &bull; Updated {template.lastUpdated}</p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 gap-2">
                                <Button variant="outline" className="w-full"><Edit className="mr-2"/> Edit</Button>
                                <Button variant="secondary" className="w-full"><Copy className="mr-2"/> Duplicate</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
