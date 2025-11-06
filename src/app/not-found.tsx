import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        </div>
        <Button asChild>
            <Link href="/">Go to Homepage</Link>
        </Button>
    </div>
  );
}