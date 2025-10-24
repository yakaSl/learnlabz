
"use client";

import React, { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { type Student } from '../data';

interface ApplyScholarshipDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  student: Student;
}

export function ApplyScholarshipDialog({ isOpen, onOpenChange, student }: ApplyScholarshipDialogProps) {
  const [scholarshipType, setScholarshipType] = useState<'full' | 'partial'>('partial');
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
  const [validity, setValidity] = useState<'indefinite' | 'daterange'>('indefinite');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 90),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply Scholarship to {student.name}</DialogTitle>
          <DialogDescription>
            Provide a full or partial discount on this student's class fees.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="space-y-2">
                <Label>Scholarship Type</Label>
                <RadioGroup value={scholarshipType} onValueChange={(value) => setScholarshipType(value as 'full' | 'partial')} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="type-full" />
                        <Label htmlFor="type-full" className="font-normal">Full Scholarship (100%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial" id="type-partial" />
                        <Label htmlFor="type-partial" className="font-normal">Partial Scholarship</Label>
                    </div>
                </RadioGroup>
            </div>

            {scholarshipType === 'partial' && (
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Discount Type</Label>
                        <Select value={discountType} onValueChange={(value) => setDiscountType(value as 'percentage' | 'amount')}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage</SelectItem>
                                <SelectItem value="amount">Fixed Amount</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount-value">Discount Value</Label>
                        <Input id="discount-value" type="number" placeholder={discountType === 'percentage' ? "e.g., 25" : "e.g., 500"} />
                    </div>
                </div>
            )}

             <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select>
                    <SelectTrigger id="reason">
                        <SelectValue placeholder="Select a reason..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="merit">Merit-based</SelectItem>
                        <SelectItem value="financial">Financial Hardship</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="space-y-2">
                <Label>Validity</Label>
                 <RadioGroup value={validity} onValueChange={(value) => setValidity(value as 'indefinite' | 'daterange')} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="indefinite" id="valid-indefinite" />
                        <Label htmlFor="valid-indefinite" className="font-normal">Indefinite</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daterange" id="valid-daterange" />
                        <Label htmlFor="valid-daterange" className="font-normal">Set Date Range</Label>
                    </div>
                </RadioGroup>
            </div>

            {validity === 'daterange' && (
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date range</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={1}
                        />
                    </PopoverContent>
                </Popover>
            )}

            <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes (Optional)</Label>
                <Textarea id="notes" placeholder="For your records only. Not visible to student/parent." />
            </div>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                     <div className="flex justify-between">
                        <span>Original Fee:</span>
                        <span className="font-medium">Rs. 5,000</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Discount (30%):</span>
                        <span className="font-medium text-destructive">- Rs. 1,500</span>
                    </div>
                     <div className="flex justify-between font-bold border-t pt-2">
                        <span>New Fee:</span>
                        <span>Rs. 3,500</span>
                    </div>
                     <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Platform Fee (5% of New Fee):</span>
                        <span>Rs. 175</span>
                    </div>
                </CardContent>
            </Card>

        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">
            Apply Scholarship
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
