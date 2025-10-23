
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Folder, File, Upload, Search, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';

const fileSystem = {
  name: 'Root',
  type: 'folder',
  children: [
    {
      name: 'Algebra 101',
      type: 'folder',
      children: [
        { name: 'Syllabus.pdf', type: 'file', size: '1.2MB' },
        { name: 'Lecture 1.mp4', type: 'file', size: '150MB' },
      ],
    },
    {
      name: 'Physics for Beginners',
      type: 'folder',
      children: [
        { name: 'Lab Safety.pdf', type: 'file', size: '500KB' },
      ],
    },
    { name: 'Worksheet_Template.docx', type: 'file', size: '25KB' },
  ],
};

function FileItem({ item }: { item: any }) {
    const isFolder = item.type === 'folder';
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
                {isFolder ? <Folder className="h-8 w-8 text-primary" /> : <File className="h-8 w-8 text-muted-foreground" />}
                <div className="flex-1">
                    <p className="font-semibold truncate">{item.name}</p>
                    {item.size && <p className="text-sm text-muted-foreground">{item.size}</p>}
                </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}


export default function MaterialsManagement() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    
  return (
    <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Materials & Resources</h1>
            <p className="text-muted-foreground">Organize, upload, and share all your teaching materials.</p>
        </div>

        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search materials..." className="pl-8" />
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('grid')}>
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('list')}>
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Path: /Algebra 101</p>
                <div className={cn(
                    "gap-4",
                    view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex flex-col'
                )}>
                    {fileSystem.children.map(item => <FileItem key={item.name} item={item} />)}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
