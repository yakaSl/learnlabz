"use client";

import { Material } from "./data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Download, Bookmark, File, FileText, Video, FileType } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface FileItemProps {
    item: Material;
    view: 'grid' | 'list';
}

const fileIcons = {
    pdf: <FileText className="h-6 w-6 text-red-500" />,
    video: <Video className="h-6 w-6 text-blue-500" />,
    docx: <FileType className="h-6 w-6 text-blue-700" />,
    default: <File className="h-6 w-6 text-muted-foreground" />
}

export function FileItem({ item, view }: FileItemProps) {
    const icon = fileIcons[item.type as keyof typeof fileIcons] || fileIcons.default;
    
    if (view === 'list') {
        return (
             <div className="flex items-center gap-4 p-2 rounded-md hover:bg-muted border">
                <div className="p-2 bg-muted/50 rounded-md">{icon}</div>
                <div className="flex-1 font-semibold">{item.name}</div>
                <div className="w-32 text-sm text-muted-foreground">{item.class}</div>
                <div className="w-24 text-sm text-muted-foreground">{item.size}</div>
                <div className="w-32 text-sm text-muted-foreground">{item.lastModified}</div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className={cn("h-4 w-4", item.isBookmarked && "fill-current text-yellow-500")} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </div>
            </div>
        )
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    {icon}
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-xs text-muted-foreground">
                <p>Class: {item.class}</p>
                <p>Size: {item.size}</p>
                <p>Modified: {item.lastModified}</p>
            </CardContent>
             <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full"><Download className="h-4 w-4 mr-2" />Download</Button>
                    <Button variant="ghost" size="icon"><Bookmark className={cn("h-4 w-4", item.isBookmarked && "fill-current text-yellow-500")} /></Button>
                </div>
            </CardContent>
        </Card>
    )
}
