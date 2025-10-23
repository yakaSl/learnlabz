'use client';

import React from 'react';
import AssignmentView from '@/components/student/assignments/assignment-view';

export default function AssignmentDetailPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  const { assignmentId } = React.use(params);
  return <AssignmentView assignmentId={assignmentId} />;
}
