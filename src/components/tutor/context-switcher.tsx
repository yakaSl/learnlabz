
'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, User, Building, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Context = {
  label: string;
  type: 'personal' | 'institute';
};

const contexts: Context[] = [
  { label: 'Personal Workspace', type: 'personal' },
  { label: 'Innovate Learning Co.', type: 'institute' },
];

export function ContextSwitcher() {
  const [selectedContext, setSelectedContext] = React.useState<Context>(
    contexts[0]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-auto min-w-[220px] justify-between text-base"
        >
          <div className="flex items-center gap-2">
            {selectedContext.type === 'personal' ? (
              <User className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Building className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="truncate font-semibold">{selectedContext.label}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuLabel>Switch Context</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {contexts.map((context) => (
          <DropdownMenuItem
            key={context.label}
            onSelect={() => setSelectedContext(context)}
          >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    {context.type === 'personal' ? (
                        <User className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Building className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{context.label}</span>
                </div>
                {selectedContext.label === context.label && <Check className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
