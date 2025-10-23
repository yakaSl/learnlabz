
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
import { Search, LayoutGrid, List, Filter, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddInstituteDialog } from './add-institute-dialog';

export default function InstituteManagement() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Tabs defaultValue="institutes" className="flex flex-col flex-1">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institute Management</h1>
          <p className="text-muted-foreground">Oversee all educational organizations on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Institute
            </Button>
            <TabsList>
              <TabsTrigger value="institutes">All Institutes</TabsTrigger>
              <TabsTrigger value="white-label">White-Label Queue</TabsTrigger>
            </TabsList>
        </div>
      </div>
      <AddInstituteDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <TabsContent value="institutes">
        <Card>
          <CardHeader>
            <div className="flex items-center flex-wrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search institutes..." className="pl-8" />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
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
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="users">Sort by Active Users</SelectItem>
                  <SelectItem value="risk">Sort by Churn Risk</SelectItem>
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
                {institutes.map((institute) => (
                  <InstituteCard key={institute.id} institute={institute} />
                ))}
              </div>
            ) : (
                <div className="border rounded-md hidden md:block">
                    <div className="flex items-center p-4 border-b bg-muted/50 text-sm font-medium text-muted-foreground">
                        <div className="w-1/3">Institute</div>
                        <div className="w-1/6">Tier</div>
                        <div className="w-1/6">Status</div>
                        <div className="w-1/6">Users</div>
                        <div className="w-1/6">Churn Risk</div>
                        <div className="w-[52px]"></div>
                    </div>
                    {institutes.map((institute) => (
                        <InstituteListItem key={institute.id} institute={institute} />
                    ))}
              </div>
            )}
            {/* Mobile list view */}
            {view === 'list' && (
                 <div className="md:hidden space-y-4">
                    {institutes.map((institute) => (
                        <InstituteCard key={institute.id} institute={institute} />
                    ))}
                 </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="white-label">
        <WhiteLabelQueue requests={whiteLabelRequests} />
      </TabsContent>
    </Tabs>
  );
}
