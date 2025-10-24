
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import QRCode from "qrcode.react";
import { students } from "@/components/tutor/students/data";
import type { Student } from "@/components/tutor/students/data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const statusColors: { [key: string]: 'default' | 'destructive' | 'secondary' } = {
    Present: 'default',
    Absent: 'destructive',
    Pending: 'secondary'
}

function LiveStudentList({ studentList }: { studentList: Student[] }) {
    return (
        <div className="space-y-3">
            {studentList.map(student => (
                <div key={student.id} className="flex items-center gap-4 p-3 rounded-md border">
                    <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 font-medium">{student.name}</div>
                    <Checkbox defaultChecked={student.status === 'Present'} />
                    <Badge variant={statusColors[student.status || 'Pending']}>{student.status}</Badge>
                </div>
            ))}
        </div>
    );
}

function QRCodeView({ enrollmentLink }: { enrollmentLink: string }) {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="p-4 border-4 border-muted rounded-lg">
                <QRCode value={enrollmentLink} size={256} />
            </div>
            <p className="font-bold text-lg">Scan to Mark Attendance</p>
            <div className="text-2xl font-mono font-bold text-destructive">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground">This QR code will expire when the timer runs out.</p>
        </div>
    );
}

export function AttendanceSessionDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  const [useQRCode, setUseQRCode] = useState(true);
  
  // This would come from the class data
  const enrollmentLink = "https://learnlabz.app/attend/aBcDeF123";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Live Attendance Session</DialogTitle>
          <DialogDescription>
            Mark attendance for Algebra 101 - July 28, 2024
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-center space-x-2">
            <Label htmlFor="qr-mode">Manual List</Label>
            <Switch id="qr-mode" checked={useQRCode} onCheckedChange={setUseQRCode} />
            <Label htmlFor="qr-mode">QR Code</Label>
          </div>
          
          {useQRCode ? <QRCodeView enrollmentLink={enrollmentLink} /> : <LiveStudentList studentList={students} />}

        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
           <Button type="button" variant="destructive" onClick={() => onOpenChange(false)}>
            Close Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
