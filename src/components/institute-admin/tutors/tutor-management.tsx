
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { tutors } from "./data";
import { TutorCard } from "./tutor-card";
import { TutorListItem } from './tutor-list-item';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, List, Filter, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TutorManagement() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Tutor Management</h1>
                <p className="text-muted-foreground">Manage all tutors in your institute.</p>
            </div>
            <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Tutor
            </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center flex-wrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tutors..." className="pl-8" />
              </div>
              
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <Select defaultValue="name">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="rating">Sort by Performance</SelectItem>
                  <SelectItem value="classes">Sort by Active Classes</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 rounded-md bg-muted p-1 ml-auto">
                <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('grid')}>
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setView('list')}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            ) : (
                <div className="border rounded-md">
                    <div className="hidden md:flex items-center p-3 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                        <div className="flex-1 md:w-1/3">Tutor</div>
                        <div className="md:w-1/4">Subjects</div>
                        <div className="md:w-1/6">Classes</div>
                        <div className="md:w-1/6">Rating</div>
                        <div className="w-auto"></div>
                    </div>
                    {tutors.map((tutor) => (
                        <TutorListItem key={tutor.id} tutor={tutor} />
                    ))}
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
