
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const students = [
  { id: 'S001', name: 'Alice Johnson', grade: '10th', enrolledClasses: 5, status: 'Active', paymentStatus: 'Paid' },
  { id: 'S002', name: 'Bob Williams', grade: '9th', enrolledClasses: 3, status: 'Active', paymentStatus: 'Overdue' },
  { id: 'S003', name: 'Charlie Brown', grade: '11th', enrolledClasses: 4, status: 'Withdrawn', paymentStatus: 'N/A' },
];

export default function StudentManagement() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">Enroll, manage, and track all students.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import</Button>
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Enroll Student</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-8" />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Enrolled Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.enrolledClasses}</TableCell>
                    <TableCell><Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>{student.status}</Badge></TableCell>
                    <TableCell><Badge variant={student.paymentStatus === 'Paid' ? 'default' : 'destructive'}>{student.paymentStatus}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
