"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { institutes, whiteLabelRequests } from "@/components/super-admin/institutes/data";
import { InstituteCard } from "./institute-card";
import { InstituteListItem } from './institute-list-item';
import { WhiteLabelQueue } from './white-label-queue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Search, LayoutGrid, List, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InstituteManagement() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Institute Management</CardTitle>
                <CardDescription>Oversee all educational organizations on the platform.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search institutes..." className="pl-8 h-9" />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Subscription Tier</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Select defaultValue="name">
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="users">Active Users</SelectItem>
                    <SelectItem value="risk">Churn Risk</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                  <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('grid')}>
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutes.map((institute) => (
                  <InstituteCard key={institute.id} institute={institute} />
                ))}
              </div>
            ) : (
                <div className="border rounded-md">
                    <div className="flex items-center p-4 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                        <div className="w-1/3">Institute</div>
                        <div className="w-1/6">Tier</div>
                        <div className="w-1/6">Status</div>
                        <div className="w-1/6">Users</div>
                        <div className="w-1/6">Churn Risk</div>
                        <div className="w-auto"></div>
                    </div>
                    {institutes.map((institute) => (
                        <InstituteListItem key={institute.id} institute={institute} />
                    ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <aside className="w-full max-w-sm hidden lg:block">
        <WhiteLabelQueue requests={whiteLabelRequests} />
      </aside>
    </div>
  );
}
