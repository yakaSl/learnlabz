
"use client";

import React, { useState, useEffect, useRef } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Check, ChevronsUpDown, QrCode, List } from 'lucide-react';
import { format } from "date-fns";
import { cn } from '@/lib/utils';
import { students } from '../students/data';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import QRCode from "qrcode.react";

interface RecordPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecordPaymentDialog({ open, onOpenChange }: RecordPaymentDialogProps) {
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [studentOpen, setStudentOpen] = React.useState(false);
  const [studentValue, setStudentValue] = React.useState("");
  
  const [showScanner, setShowScanner] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const platformFee = amount ? (parseFloat(amount) * 0.05).toFixed(2) : '0.00';
  const netPayout = amount ? (parseFloat(amount) * 0.95).toFixed(2) : '0.00';

  useEffect(() => {
    if (open && showScanner) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings.",
          });
        }
      };
      getCameraPermission();
    } else {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }
  }, [open, showScanner, toast]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            setShowScanner(false); // Reset scanner view on close
        }
        onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record Offline Payment</DialogTitle>
          <DialogDescription>
            Log a payment received outside of the LearnLabz platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="student">Student</Label>
                     <Button variant="ghost" size="sm" onClick={() => setShowScanner(!showScanner)}>
                        {showScanner ? <List className="mr-2" /> : <QrCode className="mr-2" />}
                        {showScanner ? 'Manual Select' : 'Scan QR'}
                    </Button>
                </div>
                 {showScanner ? (
                    <div className="space-y-2">
                        <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
                        {hasCameraPermission === false && (
                             <Alert variant="destructive">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature. You may need to grant permissions in your browser settings.
                                </AlertDescription>
                            </Alert>
                        )}
                        <p className="text-center text-sm text-muted-foreground">Point the camera at the student's QR code.</p>
                    </div>
                ) : (
                    <Popover open={studentOpen} onOpenChange={setStudentOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={studentOpen}
                        className="w-full justify-between"
                        >
                        {studentValue
                            ? students.find((student) => student.name.toLowerCase() === studentValue)?.name
                            : "Select a student..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                        <CommandInput placeholder="Search student..." />
                        <CommandEmpty>No student found.</CommandEmpty>
                        <CommandGroup>
                            {students.map((student) => (
                            <CommandItem
                                key={student.id}
                                value={student.name}
                                onSelect={(currentValue) => {
                                setStudentValue(currentValue === studentValue ? "" : currentValue)
                                setStudentOpen(false)
                                }}
                            >
                                <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    studentValue === student.name.toLowerCase() ? "opacity-100" : "opacity-0"
                                )}
                                />
                                {student.name}
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </Command>
                    </PopoverContent>
                    </Popover>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="amount">Amount Received</Label>
                    <Input id="amount" type="number" placeholder="50.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select defaultValue="cash">
                        <SelectTrigger id="payment-method">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                             <SelectItem value="cheque">Cheque</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="payment-date">Payment Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
                <Label htmlFor="reference">Reference Number (Optional)</Label>
                <Input id="reference" placeholder="e.g., transaction ID" />
            </div>

            <div className="p-4 rounded-md bg-muted/50 border space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee (5%)</span>
                    <span className="font-medium">- ${platformFee}</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Net Payout</span>
                    <span>${netPayout}</span>
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit">Record Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
