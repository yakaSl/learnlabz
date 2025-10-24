
"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud } from "lucide-react";

interface UploadMaterialDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function UploadMaterialDialog({ isOpen, onOpenChange }: UploadMaterialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload New Material</DialogTitle>
          <DialogDescription>
            Add files, notes, or links for your students.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center space-y-2">
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <p className="font-semibold">Drag & drop files here</p>
                <p className="text-sm text-muted-foreground">or</p>
                <Button type="button" variant="outline" size="sm">Browse Files</Button>
            </div>
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Week 5 Lecture Notes" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="A brief summary of what this material contains." />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lecture">Lecture Notes</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                            <SelectItem value="reference">Reference Material</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select>
                        <SelectTrigger id="visibility">
                            <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Students</SelectItem>
                            <SelectItem value="selected">Selected Students</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Upload & Notify</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
