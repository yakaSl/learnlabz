"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Institute } from "../data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InstituteInfoTabProps {
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
    if (risk > 75) return 'text-destructive';
    if (risk > 25) return 'text-yellow-500';
    return 'text-success-foreground';
};

export function InstituteInfoTab({ institute }: InstituteInfoTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Core Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Institute ID</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{institute.id}</span>
          </div>
           <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Primary Administrator</span>
            <span className="font-medium">{institute.admin}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", statusColors[institute.status].replace('text-','bg-'))} />
                <span className={cn("font-medium", statusColors[institute.status])}>{institute.status}</span>
            </div>
          </div>
           <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subscription Tier</span>
            <Badge className={cn("text-white", tierColors[institute.subscriptionTier])}>{institute.subscriptionTier}</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
         <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-medium">{institute.activeUsers.toLocaleString()}</span>
          </div>
           <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">AI Health / Churn Risk</span>
            <span className={cn("font-bold", getChurnRiskColor(institute.churnRisk))}>{institute.churnRisk}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Monthly Revenue</span>
            <span className="font-medium">$4,500</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Student Engagement</span>
            <span className="font-medium">82%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
