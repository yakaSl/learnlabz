
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { AddBranchDialog } from './add-branch-dialog';
import { Badge } from '@/components/ui/badge';

const branches = [
    { id: '1', name: 'Main Campus', location: 'Downtown', manager: 'John Doe', status: 'Active' },
    { id: '2', name: 'North Branch', location: 'Uptown', manager: 'Jane Smith', status: 'Active' },
    { id: '3', name: 'Westside Center', location: 'West End', manager: 'Carlos Rodriguez', status: 'Inactive' },
];

export function BranchManagementTab() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <AddBranchDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Branch Management</CardTitle>
                        <CardDescription>Manage your institute's various branches.</CardDescription>
                    </div>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Branch
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Branch Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Assigned Manager</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {branches.map((branch) => (
                                    <TableRow key={branch.id}>
                                        <TableCell className="font-medium">{branch.name}</TableCell>
                                        <TableCell>{branch.location}</TableCell>
                                        <TableCell>{branch.manager}</TableCell>
                                        <TableCell>
                                            <Badge variant={branch.status === 'Active' ? 'default' : 'secondary'}>
                                                {branch.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
