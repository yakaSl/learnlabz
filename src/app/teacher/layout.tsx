
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, GraduationCap, Folder, Wallet, Megaphone, Bot, BarChart2, Settings, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TutorUserNav from "@/components/tutor/user-nav";
import { ContextSwitcher } from "@/components/tutor/context-switcher";
import { SidebarLogo } from "@/components/ui/sidebar-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TutorProvider } from "@/components/tutor/tutor-provider";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TutorProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/tutor" passHref>
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/classes" passHref>
                  <SidebarMenuButton tooltip="My Classes">
                    <BookOpen />
                    <span>My Classes</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/students" passHref>
                  <SidebarMenuButton tooltip="Students">
                    <GraduationCap />
                    <span>Students</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/materials" passHref>
                  <SidebarMenuButton tooltip="Materials">
                    <Folder />
                    <span>Materials</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/payments" passHref>
                  <SidebarMenuButton tooltip="Payments">
                    <Wallet />
                    <span>Payments</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/communication" passHref>
                  <SidebarMenuButton tooltip="Communication">
                    <Megaphone />
                    <span>Communication</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/reports" passHref>
                  <SidebarMenuButton tooltip="Reports">
                    <BarChart2 />
                    <span>Reports</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teacher/ai-assistant" passHref>
                  <SidebarMenuButton tooltip="AI Assistant">
                    <Bot />
                    <span>AI Assistant</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/teacher/settings" passHref>
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1 flex items-center gap-4">
              <ContextSwitcher />
            </div>
             <div className="flex-1 hidden md:flex">
                <SearchBar />
            </div>
            <div className="flex items-center gap-2">
               <ThemeToggle />
               <Link href="/teacher/notifications" passHref>
                    <Button variant="ghost" size="icon">
                        <Bell />
                        <span className="sr-only">Notifications</span>
                    </Button>
                </Link>
                <Link href="/teacher/settings" passHref>
                    <Button variant="ghost" size="icon">
                        <Settings />
                        <span className="sr-only">Settings</span>
                    </Button>
                </Link>
              <TutorUserNav />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TutorProvider>
  );
}
