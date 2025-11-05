"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, LayoutGrid, List, Lightbulb, Bookmark } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { materials } from './data';
import { FolderItem } from './folder-item';
import { FileItem } from './file-item';

export default function MaterialsBrowser() {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Materials & Resources</h1>
                <p className="text-muted-foreground">Find all your class materials, notes, and recommended content.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search all materials..." className="pl-8" />
                        </div>
                        <div className="flex items-center gap-2">
                             <Select defaultValue="all-classes">
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Filter by class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-classes">All Classes</SelectItem>
                                    <SelectItem value="algebra-101">Algebra 101</SelectItem>
                                    <SelectItem value="physics">Physics</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all-types">
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-types">All Types</SelectItem>
                                    <SelectItem value="notes">Notes</SelectItem>
                                    <SelectItem value="video">Videos</SelectItem>
                                    <SelectItem value="recording">Recordings</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                                <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('grid')}>
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('list')}>
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Lightbulb className="text-accent" />
                        AI Recommended
                    </h2>
                     <div className={cn("gap-4", view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col')}>
                        {materials.filter(m => m.isRecommended).map(item => (
                            item.type === 'folder' ? <FolderItem key={item.id} item={item} view={view} /> : <FileItem key={item.id} item={item} view={view} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Bookmark />
                        My Bookmarks
                    </h2>
                     <div className={cn("gap-4", view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col')}>
                        {materials.filter(m => m.isBookmarked).map(item => (
                             item.type === 'folder' ? <FolderItem key={item.id} item={item} view={view} /> : <FileItem key={item.id} item={item} view={view} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">All Materials</h2>
                    <div className={cn("gap-4", view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'flex flex-col')}>
                        {materials.map(item => (
                            item.type === 'folder' ? <FolderItem key={item.id} item={item} view={view} /> : <FileItem key={item.id} item={item} view={view} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
