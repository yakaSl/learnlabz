'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function GradeMasterPage() {
  // Temporary mock data - replace with API call
  const grades = [
    { id: 1, code: 'G01', name: 'Grade 1', description: 'Primary Level Grade 1', order: 1, isActive: true },
    { id: 2, code: 'G06', name: 'Grade 6', description: 'Middle School Grade 6', order: 6, isActive: true },
    { id: 3, code: 'G10', name: 'Grade 10', description: 'O/L Grade 10', order: 10, isActive: true },
    { id: 4, code: 'G11', name: 'Grade 11', description: 'A/L Grade 11', order: 11, isActive: true },
  ];

  return (
    <ProtectedRoute requireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Grade Master</h1>
            <p className="text-muted-foreground">
              Manage academic grades and levels
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Grade
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Grades</CardTitle>
            <CardDescription>
              A list of all academic grades configured in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.code}</TableCell>
                    <TableCell>{grade.name}</TableCell>
                    <TableCell>{grade.description}</TableCell>
                    <TableCell>{grade.order}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          grade.isActive
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        }`}
                      >
                        {grade.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
