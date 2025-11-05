
"use client";

import { Institute } from "./data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, BarChart, FileText, Palette } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

interface InstituteCardProps {
  institute: Institute;
}

const tierColors: { [key in Institute['subscriptionTier']]: string } = {
  Free: "bg-gray-500 hover:bg-gray-500/90",
  Basic: "bg-blue-500 hover:bg-blue-500/90",
  Premium: "bg-purple-500 hover:bg-purple-500/90",
  Enterprise: "bg-black hover:bg-black/90",
};

const statusColors: { [key in Institute['status']]: string } = {
    Active: "bg-success-foreground",
    Pending: "bg-yellow-500",
    Suspended: "bg-destructive",
}

const getChurnRiskColor = (risk: number) => {
    if (risk > 75) return 'text-destructive';
    if (risk > 25) return 'text-yellow-500';
    return 'text-success-foreground';
};

export function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-row items-start justify-between pb-2">
        <Link href={`/super-admin/institutes/${institute.id}`} className="flex items-center gap-4">
          <Image src={institute.logo} alt={`${institute.name} logo`} width={48} height={48} className="rounded-lg" />
          <div>
            <h3 className="text-lg font-bold">{institute.name}</h3>
            <p className="text-sm text-muted-foreground">Admin: {institute.admin}</p>
          </div>
        </Link>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/super-admin/institutes/${institute.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", statusColors[institute.status])} />
                <span>{institute.status}</span>
            </div>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-medium">{institute.activeUsers.toLocaleString()}</span>
        </div>
         <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">AI Health / Churn Risk</span>
            <span className={cn("font-bold", getChurnRiskColor(institute.churnRisk))}>{institute.churnRisk}%</span>
        </div>
        <div>
          <Badge className={cn("text-white", tierColors[institute.subscriptionTier])}>{institute.subscriptionTier}</Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-around gap-2">
            <Button variant="ghost" size="sm" className="flex-col h-auto p-2" asChild>
                <Link href={`/super-admin/institutes/${institute.id}?tab=info`}>
                    <FileText className="h-4 w-4 mb-1" />
                    <span className="text-xs">Info</span>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto p-2" asChild>
                 <Link href={`/super-admin/institutes/${institute.id}?tab=users`}>
                    <Users className="h-4 w-4 mb-1" />
                    <span className="text-xs">Users</span>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto p-2" asChild>
                <Link href={`/super-admin/institutes/${institute.id}?tab=stats`}>
                    <BarChart className="h-4 w-4 mb-1" />
                    <span className="text-xs">Stats</span>
                </Link>
            </Button>
             <Button variant="ghost" size="sm" className="flex-col h-auto p-2" asChild>
                <Link href={`/super-admin/institutes/${institute.id}?tab=branding`}>
                    <Palette className="h-4 w-4 mb-1" />
                    <span className="text-xs">Branding</span>
                </Link>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
