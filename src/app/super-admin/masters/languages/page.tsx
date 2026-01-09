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

export default function LanguageMasterPage() {
  // Temporary mock data - replace with API call
  const languages = [
    { id: 1, code: 'EN', name: 'English', nativeName: 'English', isDefault: true, isActive: true },
    { id: 2, code: 'SI', name: 'Sinhala', nativeName: 'සිංහල', isDefault: false, isActive: true },
    { id: 3, code: 'TA', name: 'Tamil', nativeName: 'தமிழ்', isDefault: false, isActive: true },
  ];

  return (
    <ProtectedRoute requireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Language Master</h1>
            <p className="text-muted-foreground">
              Manage languages available in the system
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Language
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Languages</CardTitle>
            <CardDescription>
              A list of all languages configured in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Native Name</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {languages.map((language) => (
                  <TableRow key={language.id}>
                    <TableCell className="font-medium">{language.code}</TableCell>
                    <TableCell>{language.name}</TableCell>
                    <TableCell>{language.nativeName}</TableCell>
                    <TableCell>
                      {language.isDefault && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
                          Default
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          language.isActive
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        }`}
                      >
                        {language.isActive ? 'Active' : 'Inactive'}
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
