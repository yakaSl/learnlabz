
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddBranchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBranchDialog({ isOpen, onOpenChange }: AddBranchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Create a new branch and assign a manager to it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="branch-name">Branch Name</Label>
            <Input id="branch-name" placeholder="e.g., Downtown Campus" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., 123 Main St, Anytown" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager-email">Manager's Email</Label>
            <Input id="manager-email" type="email" placeholder="manager@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create Branch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
