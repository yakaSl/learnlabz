
'use client';

import { AppProvider } from '@/hooks/use-context';

export function TutorProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
