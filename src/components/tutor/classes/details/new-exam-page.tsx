
'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Link from "next/link";
import { NewExamForm } from "@/components/tutor/classes/details/new-exam-form";

export default function NewExamPage({ classId }: { classId: string }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Exam</h1>
                    <p className="text-muted-foreground">Build and configure a new online exam for your class.</p>
                </div>
                 <div className="flex gap-2">
                     <Button variant="outline" asChild>
                        <Link href={`/tutor/classes/${classId}`}>Cancel</Link>
                    </Button>
                    <Button variant="outline">
                        <Save className="mr-2" />
                        Save as Draft
                    </Button>
                    <Button>Publish Exam</Button>
                </div>
            </div>
            
           <NewExamForm />
        </div>
    );
}
