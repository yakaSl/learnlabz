'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/useAuth';
import { AppProvider } from '@/hooks/use-context';
import { QueryProvider } from '@/components/providers/query-provider';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
