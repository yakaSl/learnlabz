
"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "./button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchBar() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])


  return (
    <>
        <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground md:w-2/3 lg:w-1/3"
            onClick={() => setOpen(true)}
        >
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
             <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
         <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                <CommandItem>Dashboard</CommandItem>
                <CommandItem>Students</CommandItem>
                <CommandItem>Settings</CommandItem>
            </CommandGroup>
            </CommandList>
        </CommandDialog>
    </>
  );
}
