"use client";

import { Institute } from "./data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface InstituteListItemProps {
  institute: Institute;
}

const tierColors: { [key in Institute['subscriptionTier']]: string } = {
  Free: "bg-gray-500 hover:bg-gray-500/90",
  Basic: "bg-blue-500 hover:bg-blue-500/90",
  Premium: "bg-purple-500 hover:bg-purple-500/90",
  Enterprise: "bg-black hover:bg-black/90",
};

const statusColors: { [key in Institute['status']]: string } = {
    Active: "text-success-foreground",
    Pending: "text-yellow-500",
    Suspended: "text-destructive",
}

const getChurnRiskColor = (risk: number) => {
    if (risk > 75) return 'bg-destructive';
    if (risk > 25) return 'bg-yellow-500';
    return 'bg-success-foreground';
};

export function InstituteListItem({ institute }: InstituteListItemProps) {
  return (
    <div className="flex items-center p-4 border-b hover:bg-muted/50">
      <div className="flex items-center gap-4 w-1/3">
        <Image src={institute.logo} alt={`${institute.name} logo`} width={40} height={40} className="rounded-md" />
        <div className="flex-grow">
          <p className="font-bold">{institute.name}</p>
          <p className="text-sm text-muted-foreground">Admin: {institute.admin}</p>
        </div>
      </div>
      <div className="w-1/6">
        <Badge className={cn("text-white", tierColors[institute.subscriptionTier])}>{institute.subscriptionTier}</Badge>
      </div>
      <div className="w-1/6">
        <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", statusColors[institute.status].replace('text-','bg-'))} />
            <span className={cn(statusColors[institute.status])}>{institute.status}</span>
        </div>
      </div>
      <div className="w-1/6 font-medium">{institute.activeUsers.toLocaleString()}</div>
      <div className="w-1/6">
        <div className="flex items-center gap-2">
            <Progress value={institute.churnRisk} className="w-2/3 h-2" indicatorClassName={getChurnRiskColor(institute.churnRisk)} />
            <span className="text-sm font-medium">{institute.churnRisk}%</span>
        </div>
      </div>
      <div className="w-auto flex justify-end">
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
      </div>
    </div>
  );
}
