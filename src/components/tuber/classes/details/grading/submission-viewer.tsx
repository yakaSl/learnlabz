
'use client';

import React from 'react';

export function SubmissionViewer({ documentUrl }: { documentUrl: string }) {
  return (
    <div className="w-full h-full p-4">
      <iframe
        src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        className="w-full h-full rounded-md border"
        title="Submission Document"
      />
      <p className="text-xs text-muted-foreground text-center mt-2">
        Showing a sample PDF. In a real application, this would display the student's submission from: {documentUrl}
      </p>
    </div>
  );
}
