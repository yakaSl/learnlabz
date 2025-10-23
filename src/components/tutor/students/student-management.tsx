
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { StudentCard } from './student-card';
import { students } from './data';

export default function StudentManagement() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Students</h1>
          <p className="text-muted-foreground">Manage your students' profiles and track their performance.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-classes">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-classes">All Classes</SelectItem>
                  <SelectItem value="algebra-101">Algebra 101</SelectItem>
                  <SelectItem value="physics">Physics for Beginners</SelectItem>
                </SelectContent>
              </Select>
               <Select defaultValue="all-performance">
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Filter by performance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-performance">All Performance</SelectItem>
                    <SelectItem value="exceeding">Exceeding</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
