"use client";

import { Material } from "./data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Folder, Bookmark } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface FolderItemProps {
    item: Material;
    view: 'grid' | 'list';
}

export function FolderItem({ item, view }: FolderItemProps) {
     if (view === 'list') {
        return (
             <div className="flex items-center gap-4 p-2 rounded-md hover:bg-muted border font-semibold">
                <Folder className="h-6 w-6 text-primary" />
                <div className="flex-1">{item.name}</div>
                <div className="w-32 text-sm text-muted-foreground"></div>
                <div className="w-24 text-sm text-muted-foreground">{item.size}</div>
                <div className="w-32 text-sm text-muted-foreground">{item.lastModified}</div>
                 <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className={cn("h-4 w-4", item.isBookmarked && "fill-current text-yellow-500")} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </div>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Folder className="h-6 w-6 text-primary" />
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                </div>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className={cn("h-4 w-4", item.isBookmarked && "fill-current text-yellow-500")} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </div>
            </CardHeader>
             <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p>{item.size}</p>
                <p>Modified: {item.lastModified}</p>
            </CardContent>
        </Card>
    )
}
