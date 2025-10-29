
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TestTube2, Upload, History } from "lucide-react";
import React from "react";

function AIModelConfigForm() {
    const [temperature, setTemperature] = React.useState([0.7]);
    const [topP, setTopP] = React.useState([0.9]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
            <Label htmlFor="primary-model">Language Model</Label>
            <Select defaultValue="gemini-2.5-flash">
                <SelectTrigger id="primary-model">
                <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                </SelectContent>
            </Select>
            </div>
            
            <div className="space-y-4 rounded-lg border p-4">
                <Label className="font-semibold">Model Parameters</Label>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="temperature">Temperature</Label>
                        <span className="text-sm font-medium">{temperature}</span>
                    </div>
                    <Slider id="temperature" defaultValue={temperature} onValueChange={setTemperature} max={1} step={0.1} />
                    <p className="text-xs text-muted-foreground">Controls randomness. Lower is more deterministic.</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="top-p">Top-P</Label>
                        <span className="text-sm font-medium">{topP}</span>
                    </div>
                    <Slider id="top-p" defaultValue={topP} onValueChange={setTopP} max={1} step={0.1} />
                    <p className="text-xs text-muted-foreground">Nucleus sampling. Considers tokens with top p probability mass.</p>
                </div>
            </div>
        </div>
    );
}


export function AiConfig() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>Configure models and parameters for AI features across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat-tutor">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat-tutor">AI Chat Tutor</TabsTrigger>
            <TabsTrigger value="tutor-assistant">AI Tutor Assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="chat-tutor" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Chat Tutor Settings</CardTitle>
                <CardDescription>Configuration for the student-facing AI tutor.</CardDescription>
              </CardHeader>
              <CardContent>
                <AIModelConfigForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tutor-assistant" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Tutor Assistant Settings</CardTitle>
                <CardDescription>Configuration for the tutor's AI assistant.</CardDescription>
              </CardHeader>
              <CardContent>
                <AIModelConfigForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Training Data Management</CardTitle>
                    <CardDescription>Upload new documents to fine-tune your models.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/50">
                        <div className="flex-grow">
                        <p className="font-medium">User Feedback Dataset</p>
                        <p className="text-sm text-muted-foreground">Last updated: 2 hours ago. 1,200 entries.</p>
                        </div>
                        <Button variant="outline"><Upload className="mr-2"/> Upload New Data</Button>
                        <Button>Start Fine-Tuning Job</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>A/B Testing</CardTitle>
                    <CardDescription>Test different model configurations on a subset of users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <TestTube2 className="h-4 w-4" />
                        <AlertTitle>No Active A/B Tests</AlertTitle>
                        <AlertDescription>
                            Create a new A/B test to compare model performance.
                            <Button variant="link" className="p-0 h-auto ml-2">Start a New Test</Button>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Configuration History</CardTitle>
                    <CardDescription>Review and rollback to previous settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                        <p className="text-sm">
                            <span className="font-semibold">Version 3.1:</span> Deployed on July 28, 2024 by admin@learnlabz.com
                        </p>
                        <Button variant="outline"><History className="mr-2" /> Rollback</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save All AI Configurations</Button>
      </CardFooter>
    </Card>
  );
}
