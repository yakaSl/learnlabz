
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const submissions = [
  { id: '1', student: 'Alice Johnson', status: 'Graded', submittedAt: 'July 27, 10:15 AM', grade: '92/100' },
  { id: '2', student: 'Bob Williams', status: 'Submitted', submittedAt: 'July 28, 08:30 AM', grade: null },
  { id: '3', student: 'Charlie Brown', status: 'Late', submittedAt: 'July 29, 09:00 AM', grade: null },
  { id: '4', student: 'Diana Miller', status: 'Not Submitted', submittedAt: null, grade: null },
];

export default function AssignmentSubmissionsPage({ params }: { params: { classId: string, assessmentId: string } }) {
  const { classId, assessmentId } = params;

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild className="-ml-4">
          <Link href={`/tutor/classes/${classId}`}>
            <ArrowLeft className="mr-2" />
            Back to Class
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Submissions for Mid-Term Quiz</h1>
        <p className="text-muted-foreground">Review and grade all student submissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <User />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3 / 4</div>
                <p className="text-xs text-muted-foreground">students have submitted</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Due Date</CardTitle>
                <Calendar />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">July 28, 2024</div>
                 <p className="text-xs text-muted-foreground">11:59 PM</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grading Progress</CardTitle>
                <CheckCircle />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1 / 3</div>
                <p className="text-xs text-muted-foreground">submissions graded</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map(submission => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.student}</TableCell>
                    <TableCell>
                      <Badge variant={
                        submission.status === 'Graded' ? 'default' :
                        submission.status === 'Submitted' ? 'secondary' :
                        submission.status === 'Late' ? 'destructive' : 'outline'
                      }>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{submission.submittedAt || '—'}</TableCell>
                    <TableCell>{submission.grade || '—'}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" disabled={!submission.submittedAt}>
                        <Link href={`/tutor/classes/${classId}/assessments/${assessmentId}/submissions/${submission.id}`}>
                          {submission.grade ? 'View Grade' : 'Grade'}
                        </Link>
                      </Button>
                    </TableCell>
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
