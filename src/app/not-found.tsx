
'use client';

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || "The page you're looking for doesn't exist or has been moved.";

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground">{message}</p>
        </div>
        <Button asChild>
            <Link href="/">Go to Homepage</Link>
        </Button>
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
