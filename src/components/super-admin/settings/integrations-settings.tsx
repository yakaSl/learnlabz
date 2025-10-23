"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

const apiKeys = [
    { service: 'Stripe', key: 'sk_test_...xyz', status: 'Active' },
    { service: 'SendGrid', key: 'SG....xyz', status: 'Active' },
    { service: 'Google Analytics', key: 'G-...xyz', status: 'Inactive' },
]

export function IntegrationsSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Integrations & API Keys</CardTitle>
                <CardDescription>Manage third-party service integrations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>API Key</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apiKeys.map(key => (
                                <TableRow key={key.service}>
                                    <TableCell className="font-medium">{key.service}</TableCell>
                                    <TableCell className="font-mono">{key.key}</TableCell>
                                    <TableCell>
                                        <Badge variant={key.status === 'Active' ? 'default' : 'secondary'}>{key.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Test Connection</Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
