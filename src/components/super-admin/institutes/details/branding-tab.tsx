
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye } from "lucide-react";
import Image from "next/image";

export function BrandingTab() {
  const brandingRequest = {
    logo: "https://picsum.photos/seed/bma-logo/128/128",
    primaryColor: "#4A90E2",
    secondaryColor: "#50E3C2",
    customDomain: "learn.brightminds.com",
    contactEmail: "support@brightminds.com"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>White-Label Request</CardTitle>
            <CardDescription>Review and approve the requested branding assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="p-4 border rounded-md flex items-center justify-center">
                  <Image src={brandingRequest.logo} alt="Requested Logo" width={96} height={96} className="rounded-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: brandingRequest.primaryColor }} />
                    <Input value={brandingRequest.primaryColor} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: brandingRequest.secondaryColor }} />
                    <Input value={brandingRequest.secondaryColor} readOnly />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
                <Label>Custom Domain</Label>
                <Input value={brandingRequest.customDomain} readOnly />
            </div>
            <div className="space-y-2">
                <Label>Support Email</Label>
                <Input value={brandingRequest.contactEmail} readOnly />
            </div>
          </CardContent>
          <CardFooter className="gap-4">
             <Button variant="destructive">
                <X className="mr-2" />
                Reject
            </Button>
            <Button>
                <Check className="mr-2" />
                Approve Branding
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>How the login page will look.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="rounded-lg border bg-background p-4 w-full aspect-[9/16] flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
                     <Image src={brandingRequest.logo} alt="Preview Logo" width={80} height={80} className="rounded-lg" />
                     <div className="space-y-2">
                        <h2 className="text-2xl font-bold" style={{ color: brandingRequest.primaryColor }}>Welcome Back!</h2>
                        <p className="text-muted-foreground">Sign in to your Bright Minds account</p>
                    </div>
                    <div className="w-full space-y-4 px-4">
                        <Input placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button className="w-full text-white" style={{ backgroundColor: brandingRequest.primaryColor }}>Login</Button>
                    </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">Powered by LearnLabz</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
