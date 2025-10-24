
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, DollarSign, Users, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/hooks/use-context";

const stats = [
    { title: "Your Classes' Contribution", value: "$1,820.50", icon: <DollarSign />, description: "This month so far" },
    { title: "Student Payment Rate", value: "95%", icon: <Users />, description: "85/90 students paid" },
    { title: "Outstanding Fees", value: "$450.00", icon: <AlertTriangle className="text-destructive"/>, description: "From 5 students" },
];

export function InstituteIncomeView() {
    const { selectedContext } = useAppContext();

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Institute Income (Informational)</h1>
                <p className="text-muted-foreground">This is a summary of income contributed by your classes to {selectedContext.label}.</p>
            </div>

             <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Informational Only</AlertTitle>
                <AlertDescription>
                    All income shown here is collected by and paid out to {selectedContext.label}. For your personal earnings from your own classes, please switch to your 'Personal Workspace' context.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Class Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">A breakdown of revenue per class will be shown here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
