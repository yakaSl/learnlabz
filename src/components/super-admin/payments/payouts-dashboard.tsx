"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns } from "./payout-columns";
import { payouts } from "./payouts-data";
import { PayoutsTable } from "./payouts-table";
import { CheckCircle, Clock, Download, Users } from "lucide-react";

function PayoutSummary() {
    const stats = [
        { title: "Total Pending Payout", value: "$4,925.75", icon: <Clock /> },
        { title: "Tutors in Queue", value: "4", icon: <Users /> },
        { title: "Next Payout Date", value: "Aug 2, 2024", icon: <Clock /> },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}


export function PayoutsDashboard() {
    return (
        <div className="space-y-8">
            <PayoutSummary />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payout Queue</CardTitle>
                        <CardDescription>Review and approve pending payouts for the next cycle.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Download className="mr-2" /> Export List</Button>
                        <Button><CheckCircle className="mr-2" /> Approve All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <PayoutsTable columns={columns} data={payouts} />
                </CardContent>
            </Card>
        </div>
    )
}
