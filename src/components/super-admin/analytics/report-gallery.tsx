"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MoreVertical, PlusCircle } from "lucide-react";
import Image from "next/image";

const templates = [
  { name: "Monthly Revenue Summary", version: "v2.1", author: "Admin", preview: "https://picsum.photos/seed/report1/400/250" },
  { name: "User Churn Analysis", version: "v1.8", author: "AI Bot", preview: "https://picsum.photos/seed/report2/400/250" },
  { name: "Institute Performance", version: "v3.0", author: "Admin", preview: "https://picsum.photos/seed/report3/400/250" },
  { name: "Daily Engagement Metrics", version: "v1.2", author: "Admin", preview: "https://picsum.photos/seed/report4/400/250" },
]

export function ReportGallery() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Report Template Gallery</CardTitle>
                    <CardDescription>Browse, manage, and create report templates.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Template
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {templates.map((template, index) => (
                        <Card key={index} className="group flex flex-col">
                            <CardHeader className="p-0">
                                <Image 
                                    src={template.preview} 
                                    alt={`${template.name} preview`} 
                                    width={400} 
                                    height={250} 
                                    className="rounded-t-lg object-cover" 
                                />
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <CardDescription>
                                    Version {template.version} by {template.author}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button variant="outline" className="w-full">Use Template</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
