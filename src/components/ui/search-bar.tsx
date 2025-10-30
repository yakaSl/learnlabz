"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";

export function SearchBar() {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
  );
}
