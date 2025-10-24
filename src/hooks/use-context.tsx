
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Context = {
  label: string;
  type: 'personal' | 'institute';
};

const contexts: Context[] = [
  { label: 'Personal Workspace', type: 'personal' },
  { label: 'Innovate Learning Co.', type: 'institute' },
];

interface AppContextType {
  selectedContext: Context;
  setSelectedContext: (context: Context) => void;
  availableContexts: Context[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedContext, setSelectedContext] = useState<Context>(contexts[0]);

  return (
    <AppContext.Provider value={{ selectedContext, setSelectedContext, availableContexts: contexts }}>
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
