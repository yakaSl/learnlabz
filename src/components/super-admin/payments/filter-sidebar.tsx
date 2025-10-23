"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FilterSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-cc" />
              <Label htmlFor="filter-cc" className="font-normal">Credit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-paypal" />
              <Label htmlFor="filter-paypal" className="font-normal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-bank" />
              <Label htmlFor="filter-bank" className="font-normal">Bank Transfer</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
           <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all" className="font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="status-completed" />
                <Label htmlFor="status-completed" className="font-normal">Completed</Label>
            </div>
             <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="status-pending" />
                <Label htmlFor="status-pending" className="font-normal">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="failed" id="status-failed" />
                <Label htmlFor="status-failed" className="font-normal">Failed</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Transaction Type</Label>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="type-sub" />
              <Label htmlFor="type-sub" className="font-normal">Subscription</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-payout" />
              <Label htmlFor="type-payout" className="font-normal">Payout</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-fee" />
              <Label htmlFor="type-fee" className="font-normal">Platform Fee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-refund" />
              <Label htmlFor="type-refund" className="font-normal">Refund</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
