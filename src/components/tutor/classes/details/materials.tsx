"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Folder, FileText, Download, MoreVertical } from "lucide-react";

const materials = [
    { id: 1, name: "Syllabus.pdf", type: "file", size: "1.2MB", lastModified: "3 days ago" },
    { id: 2, name: "Lecture Slides", type: "folder", items: 5 },
    { id: 3, name: "Homework Assignments", type: "folder", items: 3 },
    { id: 4, name: "Reference_Book_Chapter_1.pdf", type: "file", size: "5.8MB", lastModified: "1 week ago" },
];

export default function MaterialsTab() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Class Materials</CardTitle>
                    <CardDescription>Upload and organize materials for this class.</CardDescription>
                </div>
                 <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                </Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <div className="flex items-center p-3 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                        <div className="flex-1">Name</div>
                        <div className="w-32 hidden md:block">Size</div>
                        <div className="w-40 hidden md:block">Last Modified</div>
                        <div className="w-20"></div>
                    </div>
                    {materials.map(item => (
                        <div key={item.id} className="flex items-center p-3 border-b last:border-b-0 hover:bg-muted/50">
                            <div className="flex items-center gap-3 flex-1">
                                {item.type === 'folder' ? <Folder className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="w-32 text-sm text-muted-foreground hidden md:block">
                                {item.type === 'folder' ? `${item.items} items` : item.size}
                            </div>
                            <div className="w-40 text-sm text-muted-foreground hidden md:block">
                                {item.lastModified}
                            </div>
                             <div className="w-20 flex justify-end gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
