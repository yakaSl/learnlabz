
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitBranch, Star, Zap, Lightbulb } from "lucide-react";
import React from "react";

type TreeNode = {
    name: string;
    icon: React.ReactNode;
    children?: TreeNode[];
};

const tree: TreeNode = {
  name: "Master Learner",
  icon: <Star />,
  children: [
    { name: "Course Completer", icon: <Zap />, children: [
        { name: "First Course Finish", icon: <Zap /> },
        { name: "Five Course Finish", icon: <Zap /> },
    ]},
    { name: "Community Leader", icon: <GitBranch />, children: [
        { name: "Helpful Hand", icon: <GitBranch /> },
        { name: "Mentor", icon: <GitBranch /> },
    ]},
  ],
};

const suggestions = [
    "Streak Keeper: Log in for 7 consecutive days.",
    "Night Owl: Complete a lesson after 10 PM.",
    "Early Bird: Complete a lesson before 7 AM."
];

const renderTree = (node: TreeNode, level = 0) => (
  <div key={node.name} style={{ marginLeft: `${level * 2}rem` }}>
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
        <div className="bg-primary/10 text-primary p-2 rounded-lg">{node.icon}</div>
        <span className="font-medium">{node.name}</span>
    </div>
    {node.children && node.children.map((child: TreeNode) => renderTree(child, level + 1))}
  </div>
);

export function AchievementTree() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Achievement Tree</CardTitle>
                    <CardDescription>Visualize the hierarchy of achievements users can unlock.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderTree(tree)}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>AI Suggestions</CardTitle>
                    <CardDescription>Milestone ideas to boost engagement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-accent/10 text-accent-foreground border border-accent/20">
                            <Lightbulb className="h-5 w-5 mt-1 text-accent flex-shrink-0" />
                            <p className="text-sm">{s}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>What a student sees on their profile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-lg bg-muted">
                        <h4 className="font-bold mb-3">My Achievements</h4>
                        <div className="flex items-center gap-4 p-2 rounded-md bg-background">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-500 text-white">
                                <Star className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Super Learner</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
