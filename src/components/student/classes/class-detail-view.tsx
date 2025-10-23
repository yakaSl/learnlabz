
"use client";

import { notFound } from 'next/navigation';
import { classes } from "./data";
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, BookOpen, CheckSquare, MessageSquare, BarChart2, LayoutDashboard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import OverviewTab from './details/overview';
import MaterialsTab from './details/materials';
import AssignmentsTab from './details/assignments';
import GradesTab from './details/grades';
import DiscussionTab from './details/discussion';

interface ClassDetailViewProps {
    classId: string;
}

function ClassHeader({ classInfo }: { classInfo: (typeof classes)[0] }) {
    return (
        <Card>
            <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{classInfo.name}</h1>
                        <p className="text-muted-foreground">Taught by {classInfo.tutor}</p>
                         <div className="flex flex-wrap gap-2 mt-4">
                            <Button variant="accent" disabled={classInfo.status !== 'Live Now'}>Join Live Class</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ClassDetailView({ classId }: ClassDetailViewProps) {
    const classInfo = classes.find(s => s.id === classId);

    if (!classInfo) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
            <ClassHeader classInfo={classInfo} />
            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview"><LayoutDashboard className="mr-2 h-4 w-4" />Overview</TabsTrigger>
                    <TabsTrigger value="materials"><BookOpen className="mr-2 h-4 w-4" />Materials</TabsTrigger>
                    <TabsTrigger value="assignments"><CheckSquare className="mr-2 h-4 w-4" />Assignments</TabsTrigger>
                    <TabsTrigger value="grades"><BarChart2 className="mr-2 h-4 w-4" />Grades</TabsTrigger>
                    <TabsTrigger value="discussion"><MessageSquare className="mr-2 h-4 w-4" />Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <OverviewTab classInfo={classInfo} />
                </TabsContent>
                 <TabsContent value="materials" className="mt-4">
                    <MaterialsTab />
                </TabsContent>
                 <TabsContent value="assignments" className="mt-4">
                    <AssignmentsTab />
                </TabsContent>
                <TabsContent value="grades" className="mt-4">
                    <GradesTab />
                </TabsContent>
                <TabsContent value="discussion" className="mt-4">
                    <DiscussionTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
