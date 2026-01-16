
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './useAuth';

export type MetaInstituteType = {
  id: string;
  name: string;
  code: 'INSTITUTE' | 'INDIVIDUAL';
  description: string;
};

export type Context = {
  label: string;
  type: 'personal' | 'institute';
  instituteId?: string;
  instituteCode?: string;
  metaInstituteType?: MetaInstituteType;
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
    label: 'Loading...',
    type: 'personal'
  });
  const [availableContexts, setAvailableContexts] = useState<Context[]>([]);

  useEffect(() => {
    if (user?.availableInstitutes && user.availableInstitutes.length > 0) {
      // Build contexts from user's available institutes (don't add extra Personal Workspace)
      const instituteContexts: Context[] = user.availableInstitutes.map(institute => ({
        label: institute.instituteName,
        type: institute.metaInstituteType.code === 'INDIVIDUAL' ? 'personal' : 'institute',
        instituteId: institute.instituteId,
        instituteCode: institute.instituteCode,
        metaInstituteType: institute.metaInstituteType,
      }));

      setAvailableContexts(instituteContexts);

      // Auto-select current institute or first available
      if (user.instituteId) {
        const currentInstitute = instituteContexts.find(
          ctx => ctx.instituteId === user.instituteId
        );
        if (currentInstitute) {
          setSelectedContext(currentInstitute);
        } else {
          // Fallback to first institute if current not found
          setSelectedContext(instituteContexts[0]);
        }
      } else {
        // No current institute, select first one
        setSelectedContext(instituteContexts[0]);
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
