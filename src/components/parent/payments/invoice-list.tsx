
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Wallet, AlertCircle } from "lucide-react";
import { invoices } from "./data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function InvoiceList() {
    const getStatusVariant = (status: string) => {
        switch(status) {
            case 'Paid': return 'default';
            case 'Pending': return 'secondary';
            case 'Overdue': return 'destructive';
            default: return 'outline';
        }
    }

  return (
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>A consolidated record of all payments for your children.</CardDescription>
            </div>
            <Button variant="accent"><Wallet className="mr-2" /> Pay All Outstanding</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-900">
            <AlertCircle className="h-4 w-4 !text-amber-600" />
            <AlertTitle>AI Payment Suggestion</AlertTitle>
            <AlertDescription>
                You have multiple payments due soon. Consider setting up Auto-Pay to avoid late fees.
            </AlertDescription>
        </Alert>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Child</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.child}</TableCell>
                    <TableCell>{invoice.class}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(invoice.status)}>{invoice.status}</Badge>
                    </TableCell>
                     <TableCell className="text-right">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <CardFooter className="justify-center">
            <Button variant="outline">Load More</Button>
        </CardFooter>
      </Card>
  );
}
