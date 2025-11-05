
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PlusCircle, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { NewExamForm } from "@/components/tutor/classes/details/new-exam-form";

export default function NewExamPage({ params }: { params: { classId: string } }) {
    const { classId } = React.use(params);

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
