
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Banknote, PlusCircle } from "lucide-react";
import { ApplyScholarshipDialog } from "./apply-scholarship-dialog";
import { type Student } from "../data";

export function FinancialsTab({ student }: { student: Student }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    // Mock state, in a real app this would come from the student's data
    const hasScholarship = false;
    const scholarshipDetails = {
        type: 'Partial (25%)',
        validUntil: 'Dec 31, 2024'
    };

    return (
        <>
            <ApplyScholarshipDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} student={student} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Banknote />
                                Scholarship Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {hasScholarship ? (
                                <div className="space-y-2">
                                    <p>This student has a scholarship applied.</p>
                                    <Badge>{scholarshipDetails.type}</Badge>
                                    <p className="text-sm text-muted-foreground">Valid until: {scholarshipDetails.validUntil}</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No active scholarship. You can apply one here.</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            {hasScholarship ? (
                                <Button variant="outline" className="w-full">Edit Scholarship</Button>
                            ) : (
                                <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                                    <PlusCircle className="mr-2" />
                                    Apply Scholarship
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                     <Card>
                        <CardHeader>
                            <CardTitle>Payment History</CardTitle>
                            <CardDescription>A log of all payments and fees for this student.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Payment history will be displayed here.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
