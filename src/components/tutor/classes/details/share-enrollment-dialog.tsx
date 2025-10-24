
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
import QRCode from "qrcode.react";
import { Copy, Download, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

interface ShareEnrollmentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  enrollmentLink: string;
  className: string;
}

export function ShareEnrollmentDialog({ isOpen, onOpenChange, enrollmentLink, className }: ShareEnrollmentDialogProps) {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enrollmentLink);
    toast({
      title: "Copied to clipboard!",
      description: "Enrollment link has been copied.",
    });
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current?.querySelector('canvas');
    if (canvas) {
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${className}-enrollment-qr.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
         toast({
          title: "QR Code Downloading",
        });
    } else {
         toast({
          variant: "destructive",
          title: "Could not download QR Code",
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Enrollment Link</DialogTitle>
          <DialogDescription>
            Share this link with students to allow them to enroll in your class.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-4 border rounded-lg" ref={qrCodeRef}>
                    <QRCode value={enrollmentLink} size={160} />
                </div>
                <Button variant="outline" size="sm" onClick={downloadQRCode}>
                    <Download className="mr-2" />
                    Download QR Code
                </Button>
            </div>

            <div className="space-y-2">
                <Label htmlFor="enrollment-link">Copy Link</Label>
                <div className="flex items-center space-x-2">
                    <Input id="enrollment-link" value={enrollmentLink} readOnly />
                    <Button type="button" size="sm" onClick={copyToClipboard}>
                        <Copy className="mr-2" />
                        Copy
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <a href={`mailto:?subject=Join my class: ${className}&body=Use this link to enroll: ${enrollmentLink}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full">
                        <Mail className="mr-2" /> Email
                    </Button>
                </a>
                <a href={`https://wa.me/?text=Join my class, ${className}, using this link: ${enrollmentLink}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full">
                        <MessageCircle className="mr-2" /> WhatsApp
                    </Button>
                </a>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
