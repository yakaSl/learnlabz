
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, BarChart2, Wallet, MessageSquare, User, Calendar, CalendarDays, Trophy, Settings, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ParentUserNav from "@/components/parent/user-nav";
import { ChildSelector } from "@/components/parent/child-selector";
import { SidebarLogo } from "@/components/ui/sidebar-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/parent" passHref>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/parent/performance" passHref>
                <SidebarMenuButton tooltip="Performance">
                  <BarChart2 />
                  <span>Performance</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/parent/attendance" passHref>
                <SidebarMenuButton tooltip="Attendance">
                  <Calendar />
                  <span>Attendance</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/parent/schedule" passHref>
                <SidebarMenuButton tooltip="Schedule">
                  <CalendarDays />
                  <span>Schedule</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/parent/payments" passHref>
                <SidebarMenuButton tooltip="Payments">
                  <Wallet />
                  <span>Payments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/parent/messages" passHref>
                <SidebarMenuButton tooltip="Messages">
                  <MessageSquare />
                  <span>Messages</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/parent/achievements" passHref>
                <SidebarMenuButton tooltip="Achievements">
                  <Trophy />
                  <span>Achievements</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/parent/profile" passHref>
                <SidebarMenuButton tooltip="My Profile">
                  <User />
                  <span>My Profile</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden"/>
          <div className="flex flex-1 items-center gap-4">
             <h1 className="text-lg font-semibold">Parent Portal</h1>
             <ChildSelector />
          </div>
          <div className="flex-1 hidden md:block">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/parent/notifications" passHref>
                <Button variant="ghost" size="icon">
                    <Bell />
                    <span className="sr-only">Notifications</span>
                </Button>
            </Link>
             <Link href="/parent/profile" passHref>
                <Button variant="ghost" size="icon">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Button>
            </Link>
            <ParentUserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
