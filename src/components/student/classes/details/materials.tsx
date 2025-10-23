
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Folder } from "lucide-react";

const materials = [
    { name: 'Week 1 Slides.pdf', type: 'file', category: 'Lectures' },
    { name: 'Homework 1.docx', type: 'file', category: 'Assignments' },
    { name: 'Additional Readings', type: 'folder', category: 'Resources' },
]

export default function MaterialsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Download lectures, readings, and other resources.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {materials.map(item => (
                         <div key={item.name} className="flex items-center gap-4 p-3 rounded-md border">
                            {item.type === 'folder' ? <Folder className="h-6 w-6 text-primary" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
