
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Search, Filter, Languages, Upload, Download, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const translations = [
    { key: "dashboard.title", english: "Dashboard", spanish: "Tablero", french: "Tableau de bord", arabic: "لوحة القيادة", module: "Dashboard", status: "Translated" },
    { key: "users.newUser", english: "New User", spanish: "Nuevo Usuario", french: "Nouvel utilisateur", arabic: "", module: "Users", status: "Partial" },
    { key: "billing.invoice", english: "Invoice", spanish: "Factura", french: "", arabic: "", module: "Billing", status: "Untranslated" },
];

export default function LocalizationManagement() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Localization Management</h1>
        <p className="text-muted-foreground">Manage translations and internationalization for the platform.</p>
      </div>
      <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <CardTitle>Translation Grid</CardTitle>
                    <CardDescription>Search, edit, and manage all translation keys.</CardDescription>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                    <Button variant="outline"><Upload className="mr-2" /> Import</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button><Download className="mr-2" /> Export</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                            <DropdownMenuItem>Export as XLIFF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
             <div className="flex items-center flex-wrap gap-2 mt-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search keys or text..." className="pl-8 h-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-auto h-9">
                    <SelectValue placeholder="Filter by module" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Languages className="mr-2 h-4 w-4" />
                    Languages
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Visible Languages</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>English</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Spanish</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>French</DropdownMenuCheckboxItem>
                   <DropdownMenuCheckboxItem checked>Arabic</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>German</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center space-x-2 ml-auto">
                <Label htmlFor="rtl-toggle">RTL Preview</Label>
                <Switch id="rtl-toggle" />
              </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]">Key</TableHead>
                            <TableHead>English</TableHead>
                            <TableHead>Spanish</TableHead>
                            <TableHead>French</TableHead>
                            <TableHead>Arabic</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {translations.map((item) => (
                            <TableRow key={item.key} className="hover:bg-muted/50">
                                <TableCell className="font-mono text-xs">{item.key}</TableCell>
                                <TableCell>
                                    <Input defaultValue={item.english} className="h-8" />
                                </TableCell>
                                <TableCell>
                                    <div className="relative">
                                        <Input defaultValue={item.spanish} className="h-8" />
                                        {!item.spanish && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Globe className="absolute right-2 top-2 h-4 w-4 text-accent cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>AI Suggestion</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                     <div className="relative">
                                        <Input defaultValue={item.french} className="h-8" />
                                        {!item.french && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Globe className="absolute right-2 top-2 h-4 w-4 text-accent cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>AI Suggestion</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell dir="rtl">
                                     <div className="relative">
                                        <Input defaultValue={item.arabic} className="h-8" />
                                         {!item.arabic && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Globe className="absolute left-2 top-2 h-4 w-4 text-accent cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>AI Suggestion</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                         )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        item.status === 'Translated' ? 'default' : item.status === 'Partial' ? 'secondary' : 'destructive'
                                    }>{item.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <div className="flex items-center justify-between mt-4">
                <div className="w-64">
                    <p className="text-sm font-medium">Overall Progress</p>
                    <Progress value={60} className="mt-1 h-2" />
                    <p className="text-xs text-muted-foreground mt-1">60% translated across all languages.</p>
                </div>
                <Button>Save Changes</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
