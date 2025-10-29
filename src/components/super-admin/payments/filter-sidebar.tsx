"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TransactionFilters } from "./payment-management";
import React from "react";

interface FilterSidebarProps {
    filters: TransactionFilters;
    setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {

    const handleCheckedChange = (filterKey: 'paymentMethods' | 'transactionTypes', value: string) => {
        setFilters(prev => {
            const currentValues = prev[filterKey] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [filterKey]: newValues };
        });
    };

    const paymentMethodOptions = ["Credit Card", "PayPal", "Bank Transfer"];
    const transactionTypeOptions = ["Subscription", "Payout", "Platform Fee", "Refund"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="space-y-1">
             {paymentMethodOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                        id={`filter-${option.toLowerCase().replace(' ', '-')}`}
                        checked={filters.paymentMethods.includes(option)}
                        onCheckedChange={() => handleCheckedChange('paymentMethods', option)}
                    />
                    <Label htmlFor={`filter-${option.toLowerCase().replace(' ', '-')}`} className="font-normal">{option}</Label>
                </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
           <RadioGroup value={filters.status} onValueChange={(value) => setFilters(prev => ({...prev, status: value}))}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="status-all" />
                <Label htmlFor="status-all" className="font-normal">All</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Completed" id="status-completed" />
                <Label htmlFor="status-completed" className="font-normal">Completed</Label>
            </div>
             <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pending" id="status-pending" />
                <Label htmlFor="status-pending" className="font-normal">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Failed" id="status-failed" />
                <Label htmlFor="status-failed" className="font-normal">Failed</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Transaction Type</Label>
          <div className="space-y-1">
            {transactionTypeOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                        id={`type-${option.toLowerCase().replace(' ', '-')}`}
                        checked={filters.transactionTypes.includes(option)}
                        onCheckedChange={() => handleCheckedChange('transactionTypes', option)}
                    />
                    <Label htmlFor={`type-${option.toLowerCase().replace(' ', '-')}`} className="font-normal">{option}</Label>
                </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
