
'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { institutes } from '@/components/super-admin/institutes/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, MoreVertical, Building, Users, BarChart, CreditCard, Palette, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react';
import { InstituteInfoTab } from '@/components/super-admin/institutes/details/institute-info-tab';
import { InstituteUsersTab } from '@/components/super-admin/institutes/details/institute-users-tab';
import { BrandingTab } from '@/components/super-admin/institutes/details/branding-tab';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface InstituteProfilePageProps {
    params: {
        instituteId: string;
    };
}

function PlaceholderTab({ title }: { title: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Content for {title} coming soon.</p>
            </CardContent>
        </Card>
    );
}


export default function InstituteProfilePage({ params }: InstituteProfilePageProps) {
    const { instituteId } = React.use(params);
    const institute = institutes.find(i => i.id === instituteId);
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'info';

    if (!institute) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Button variant="ghost" size="icon" asChild>
                        <Link href="/super-admin/institutes">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <Image src={institute.logo} alt={`${institute.name} logo`} width={48} height={48} className="rounded-lg" />
                    <div>
                        <h1 className="text-2xl font-bold">{institute.name}</h1>
                        <p className="text-muted-foreground">Managing institute profile and performance.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Institute
                    </Button>
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Change Tier</DropdownMenuItem>
                                <DropdownMenuItem>Approve White-Label</DropdownMenuItem>
                                 <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive">
                                        <ShieldAlert className="mr-2 h-4 w-4" />
                                        Suspend Institute
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will suspend the institute and all associated user accounts. They will not be able to access the platform. This action can be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Yes, Suspend Institute
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <Tabs defaultValue={defaultTab}>
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="info"><Building className="mr-2 h-4 w-4" />Info</TabsTrigger>
                    <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />Users</TabsTrigger>
                    <TabsTrigger value="stats"><BarChart className="mr-2 h-4 w-4" />Stats</TabsTrigger>
                    <TabsTrigger value="billing"><CreditCard className="mr-2 h-4 w-4" />Billing</TabsTrigger>
                    <TabsTrigger value="branding"><Palette className="mr-2 h-4 w-4" />Branding</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                    <InstituteInfoTab institute={institute} />
                </TabsContent>
                <TabsContent value="users" className="mt-4">
                    <InstituteUsersTab />
                </TabsContent>
                <TabsContent value="stats" className="mt-4">
                    <PlaceholderTab title="Stats" />
                </TabsContent>
                <TabsContent value="billing" className="mt-4">
                    <PlaceholderTab title="Billing" />
                </TabsContent>
                <TabsContent value="branding" className="mt-4">
                    <BrandingTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
