
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FeeStructureCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
                <CardDescription>Manage the payment details for this class.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="monthly-fee">Monthly Fee ($)</Label>
                        <Input id="monthly-fee" type="number" defaultValue="150" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="due-day">Payment Due Day</Label>
                        <Input id="due-day" type="text" defaultValue="5th of each month" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="late-policy">Late Fee Policy</Label>
                    <Input id="late-policy" defaultValue="A late fee of $15 will be applied after 7 days." />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    );
}
