
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Wallet } from "lucide-react";

export function PaymentStatusPanel() {
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="text-amber-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-amber-900">Payment Due</CardTitle>
            <CardDescription className="text-amber-800">An invoice requires your attention.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-amber-900">Physics 101 Fee</span>
            <span className="text-2xl font-bold text-amber-900">$75.00</span>
        </div>
        <p className="text-xs text-amber-700">Due: August 5, 2024</p>
      </CardContent>
       <CardFooter>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Wallet className="mr-2 h-4 w-4" />
                Pay Now
            </Button>
       </CardFooter>
    </Card>
  );
}
