
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './useAuth';

export type Context = {
  label: string;
  type: 'personal' | 'institute';
  instituteId?: string;
  instituteCode?: string;
};

interface AppContextType {
  selectedContext: Context;
  setSelectedContext: (context: Context) => void;
  availableContexts: Context[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedContext, setSelectedContext] = useState<Context>({
    label: 'Personal Workspace',
    type: 'personal'
  });
  const [availableContexts, setAvailableContexts] = useState<Context[]>([
    { label: 'Personal Workspace', type: 'personal' }
  ]);

  useEffect(() => {
    if (user?.availableInstitutes && user.availableInstitutes.length > 0) {
      // Build contexts from user's available institutes
      const instituteContexts: Context[] = user.availableInstitutes.map(institute => ({
        label: institute.instituteName,
        type: 'institute' as const,
        instituteId: institute.instituteId,
        instituteCode: institute.instituteCode,
      }));

      // Always include Personal Workspace first
      const allContexts = [
        { label: 'Personal Workspace', type: 'personal' as const },
        ...instituteContexts
      ];

      setAvailableContexts(allContexts);

      // Auto-select first institute if user has one
      if (user.instituteId) {
        const currentInstitute = instituteContexts.find(
          ctx => ctx.instituteId === user.instituteId
        );
        if (currentInstitute) {
          setSelectedContext(currentInstitute);
        }
      }
    }
  }, [user?.availableInstitutes, user?.instituteId]);

  return (
    <AppContext.Provider value={{ selectedContext, setSelectedContext, availableContexts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
