
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { paymentMethods } from "./data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";

export function PaymentMethods() {
  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved cards and bank accounts.</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2"/> Add New Method</Button>
        </CardHeader>
        <CardContent className="space-y-4">
            {paymentMethods.map(method => (
                 <div key={method.id} className="flex items-center p-4 border rounded-lg">
                    <Image src={method.icon} alt={method.type} width={40} height={25} className="mr-4" />
                    <div className="flex-1">
                        <p className="font-semibold">{method.details}</p>
                        <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            {!method.isDefault && (
                                <DropdownMenuItem>Set as Default</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                                 <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </CardContent>
      </Card>
  );
}
