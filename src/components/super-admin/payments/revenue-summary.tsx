"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, Banknote, AlertTriangle } from "lucide-react";
import React from "react";

export function RevenueSummary() {
  const [stats, setStats] = React.useState([
    { title: "Total Revenue", value: "$1,250,345", icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, description: "+5.2% from last month" },
    { title: "Volume (Today)", value: "$45,231", icon: <CreditCard className="h-4 w-4 text-muted-foreground" />, description: "2,345 transactions" },
    { title: "Pending Payouts", value: "$88,900", icon: <Banknote className="h-4 w-4 text-muted-foreground" />, description: "Scheduled for next cycle" },
    { title: "Active Disputes", value: "12", icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />, description: "$1,500 at risk" },
  ]);

  React.useEffect(() => {
    // Mock WebSocket updates
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: stat.title === "Volume (Today)" 
            ? `$${(parseFloat(stat.value.replace('$', '').replace(',', '')) + Math.random() * 100).toLocaleString('en-US', {maximumFractionDigits: 0})}` 
            : stat.value
      })));
    }, 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
