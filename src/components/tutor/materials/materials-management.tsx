
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Folder, File, Upload, Search, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

function FileItem({ item, view }: { item: any, view: 'grid' | 'list' }) {
    const isFolder = item.type === 'folder';

    if (view === 'list') {
        return (
            <div className="flex items-center p-2 border-b last:border-b-0 hover:bg-muted/50">
                <div className="flex items-center gap-3 flex-1">
                    {isFolder ? <Folder className="h-5 w-5 text-primary" /> : <File className="h-5 w-5 text-muted-foreground" />}
                    <span className="font-medium">{item.name}</span>
                </div>
                <div className="w-24 text-sm text-muted-foreground">{item.size}</div>
                <div className="w-32 text-muted-foreground text-sm">3 days ago</div>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
        )
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    {isFolder ? <Folder className="h-6 w-6 text-primary" /> : <File className="h-6 w-6 text-muted-foreground" />}
                    <div className="flex-1">
                        <p className="font-semibold truncate">{item.name}</p>
                        {item.size && <p className="text-sm text-muted-foreground">{item.size}</p>}
                    </div>
                </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
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
                 {view === 'list' && (
                    <div className="border rounded-md">
                        <div className="flex items-center p-2 border-b bg-muted/50 text-sm font-medium">
                            <div className="flex-1">Name</div>
                            <div className="w-24">Size</div>
                            <div className="w-32">Last Modified</div>
                            <div className="w-12"></div>
                        </div>
                        {fileSystem.children.map(item => <FileItem key={item.name} item={item} view={view} />)}
                    </div>
                )}
                {view === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                         {fileSystem.children.map(item => <FileItem key={item.name} item={item} view={view} />)}
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
