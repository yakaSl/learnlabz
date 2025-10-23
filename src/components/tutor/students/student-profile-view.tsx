
"use client";

import { notFound } from 'next/navigation';
import { students } from "./data";
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface StudentProfileViewProps {
    studentId: string;
}

function ProfileHeader({ student }: { student: (typeof students)[0] }) {
    return (
        <Card>
            <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row items-start gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{student.name}</h1>
                        <p className="text-muted-foreground">{student.grade}</p>
                         <div className="flex flex-wrap gap-2 mt-4">
                            <Button variant="outline" size="sm"><Mail className="mr-2" /> Message Student</Button>
                            <Button variant="outline" size="sm"><Phone className="mr-2" /> Call Parent</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function PlaceholderTab({ title }: { title: string }) {
    return (
        <Card>
            <CardContent className="p-6">
                <p>{title} placeholder content.</p>
            </CardContent>
        </Card>
    )
}

export default function StudentProfileView({ studentId }: StudentProfileViewProps) {
    const student = students.find(s => s.id === studentId);

    if (!student) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
            <ProfileHeader student={student} />
            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="assessments">Assessments</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <PlaceholderTab title="Overview" />
                </TabsContent>
                <TabsContent value="attendance" className="mt-4">
                    <PlaceholderTab title="Attendance" />
                </TabsContent>
                <TabsContent value="performance" className="mt-4">
                    <PlaceholderTab title="Performance" />
                </TabsContent>
                <TabsContent value="assessments" className="mt-4">
                    <PlaceholderTab title="Assessments" />
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                    <PlaceholderTab title="Notes" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
