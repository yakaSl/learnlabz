'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MastersService } from '@/services/masters.service';
import type { AcademicYear, PaginationMeta } from '@/types/masters.types';
import { convertPagination } from '@/types/masters.types';

export default function AcademicYearMasterPage() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoading(true);
        const response = await MastersService.getAcademicYears({
          page: currentPage,
          limit: itemsPerPage,
          sortOrder: 'ASC',
        });

        if (response.success && response.data) {
          setAcademicYears(response.data);
          setPagination(convertPagination(response.metadata?.pagination));
          setError(null);
        } else {
          setError(response.error || 'Failed to fetch academic years');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Failed to fetch academic years:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, [currentPage, itemsPerPage]);

  return (
    <ProtectedRoute requireAuth allowedRoles={[UserRole.SUPER_ADMIN]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Year Master</h1>
            <p className="text-muted-foreground">
              Manage academic years and their duration
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Academic Year
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Academic Years</CardTitle>
            <CardDescription>
              A list of all academic years configured in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : academicYears.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">No academic years found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicYears.map((year) => (
                    <TableRow key={year.id}>
                      <TableCell className="font-medium">{year.code}</TableCell>
                      <TableCell>{year.name}</TableCell>
                      <TableCell>
                        {year.startDate ? new Date(year.startDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {year.endDate ? new Date(year.endDate).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        {year.isCurrent && (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
                            Current
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            year.isActive
                              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                              : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                          }`}
                        >
                          {year.isActive ? 'Active' : 'Inactive'}
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
            )}
            {!loading && !error && academicYears.length > 0 && (
              <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                  {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                  {pagination.totalItems} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={!pagination.hasPreviousPage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
