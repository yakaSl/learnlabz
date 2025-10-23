"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function AiConfig() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>Manage generative AI models and their parameters.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="primary-model">Primary LLM for Insights</Label>
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
                    <span className="text-sm font-medium">0.7</span>
                </div>
                <Slider id="temperature" defaultValue={[0.7]} max={1} step={0.1} />
                <p className="text-xs text-muted-foreground">Controls randomness. Lower is more deterministic.</p>
            </div>
             <div className="space-y-2">
                <div className="flex justify-between">
                    <Label htmlFor="top-p">Top-P</Label>
                    <span className="text-sm font-medium">0.9</span>
                </div>
                <Slider id="top-p" defaultValue={[0.9]} max={1} step={0.1} />
                 <p className="text-xs text-muted-foreground">Nucleus sampling. Considers tokens with top p probability mass.</p>
            </div>
        </div>

        <div className="space-y-2">
          <Label>Training Data Management</Label>
          <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/50">
            <div className="flex-grow">
              <p className="font-medium">User Feedback Dataset</p>
              <p className="text-sm text-muted-foreground">Last updated: 2 hours ago</p>
            </div>
            <Button variant="outline">Upload New Data</Button>
             <Button>Start Fine-Tuning Job</Button>
          </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button>Save AI Configuration</Button>
      </CardFooter>
    </Card>
  );
}
