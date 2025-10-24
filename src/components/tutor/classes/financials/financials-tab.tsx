
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useAppContext } from "@/hooks/use-context";
import { FeeStructureCard } from "./fee-structure-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function FinancialsTab() {
    const { selectedContext } = useAppContext();
    const isPersonalContext = selectedContext.type === 'personal';

    if (isPersonalContext) {
        return <FeeStructureCard />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Financials</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Read-Only: Institute Managed</AlertTitle>
                    <AlertDescription>
                        Fee structure is managed by the {selectedContext.label} admin. Contact the admin to request changes.
                    </AlertDescription>
                </Alert>
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Student Scholarships</h3>
                    <p className="text-sm text-muted-foreground mb-4">You can apply scholarships to individual students from their profile pages.</p>
                    <Button variant="outline">View Students</Button>
                </div>
            </CardContent>
        </Card>
    );
}
