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

export default function MediumMasterPage() {
  // Temporary mock data - replace with API call
  const mediums = [
    { id: 1, code: 'ENG', name: 'English Medium', description: 'Classes conducted in English', isActive: true },
    { id: 2, code: 'SIN', name: 'Sinhala Medium', description: 'Classes conducted in Sinhala', isActive: true },
    { id: 3, code: 'TAM', name: 'Tamil Medium', description: 'Classes conducted in Tamil', isActive: true },
  ];

  return (
    <ProtectedRoute requireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medium Master</h1>
            <p className="text-muted-foreground">
              Manage teaching mediums available in the system
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Medium
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Mediums</CardTitle>
            <CardDescription>
              A list of all teaching mediums configured in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mediums.map((medium) => (
                  <TableRow key={medium.id}>
                    <TableCell className="font-medium">{medium.code}</TableCell>
                    <TableCell>{medium.name}</TableCell>
                    <TableCell>{medium.description}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          medium.isActive
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        }`}
                      >
                        {medium.isActive ? 'Active' : 'Inactive'}
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
