"use client";

import { Institute } from "./data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, BarChart, FileText, Palette } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
    Active: "bg-green-500",
    Pending: "bg-yellow-500",
    Suspended: "bg-red-500",
}

const getChurnRiskColor = (risk: number) => {
    if (risk > 75) return 'text-red-500';
    if (risk > 25) return 'text-yellow-500';
    return 'text-green-500';
};

export function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-4">
          <Image src={institute.logo} alt={`${institute.name} logo`} width={48} height={48} className="rounded-lg" />
          <div>
            <h3 className="text-lg font-bold">{institute.name}</h3>
            <p className="text-sm text-muted-foreground">Admin: {institute.admin}</p>
          </div>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
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
        <div className="flex w-full justify-around">
            <Button variant="ghost" size="sm" className="flex-col h-auto">
                <FileText className="h-4 w-4 mb-1" />
                <span className="text-xs">Info</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto">
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Users</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto">
                <BarChart className="h-4 w-4 mb-1" />
                <span className="text-xs">Stats</span>
            </Button>
             <Button variant="ghost" size="sm" className="flex-col h-auto">
                <Palette className="h-4 w-4 mb-1" />
                <span className="text-xs">Branding</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
