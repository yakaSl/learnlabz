
'use client';

import { notFound } from 'next/navigation';
import { tutors } from '@/components/institute-admin/tutors/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, MessageSquare, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';

function TutorProfilePage({ params }: { params: { tutorId: string } }) {
    const tutor = tutors.find(t => t.id === params.tutorId);

    if (!tutor) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/institute-admin/tutors">
                        <ArrowLeft className="mr-2" />
                        Back to All Tutors
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={tutor.avatar} alt={tutor.name} />
                            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{tutor.name}</h1>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {tutor.subjects.map(subject => <Badge key={subject} variant="secondary">{subject}</Badge>)}
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline"><MessageSquare className="mr-2" />Send Message</Button>
                        <Button><Edit className="mr-2" />Edit Profile</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BookOpen className="text-muted-foreground" />
                            Active Classes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{tutor.activeClasses}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Star className="text-muted-foreground" />
                            Performance Rating
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{tutor.performanceRating > 0 ? tutor.performanceRating.toFixed(1) : 'N/A'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                           Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant={tutor.status === 'Active' ? 'default' : 'secondary'}>{tutor.status}</Badge>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Assigned Classes</CardTitle>
                    <CardDescription>A list of classes this tutor is currently teaching.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Class assignment functionality coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default TutorProfilePage;
