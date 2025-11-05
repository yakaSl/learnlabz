'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { AlertTriangle } from 'lucide-react';

export default function Error({

  error,

  reset,

}: {

  error: Error & { digest?: string };

  reset: () => void;

}) {

  useEffect(() => {

    console.error('Application error:', error);

  }, [error]);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">

      <div className="max-w-md w-full text-center space-y-6">

        <AlertTriangle className="w-16 h-16 mx-auto text-destructive" />

        <div className="space-y-2">

          <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>

          <p className="text-muted-foreground">

            {error.message || 'An unexpected error occurred'}

          </p>

          {error.digest && (

            <p className="text-xs text-muted-foreground">

              Error ID: {error.digest}

            </p>

          )}

        </div>

        <Button onClick={reset}>

          Try again

        </Button>

      </div>

    </div>

  );

}
