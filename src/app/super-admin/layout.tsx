
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Building, Settings, BarChart3, Bell, CreditCard, Languages, Trophy, ShieldCheck, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserNav from "@/components/super-admin/user-nav";
import { SidebarLogo } from "@/components/ui/sidebar-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function SuperAdminLayout({
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
              <Link href="/super-admin" passHref>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/institutes" passHref>
                <SidebarMenuButton tooltip="Institutes">
                  <Building />
                  <span>Institutes</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/tutors" passHref>
                <SidebarMenuButton tooltip="Tutors">
                  <Users />
                  <span>Tutors</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/students" passHref>
                <SidebarMenuButton tooltip="Students">
                  <GraduationCap />
                  <span>Students</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/payments" passHref>
                <SidebarMenuButton tooltip="Payments">
                  <CreditCard />
                  <span>Payments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/super-admin/analytics" passHref>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <Link href="/super-admin/localization" passHref>
                <SidebarMenuButton tooltip="Localization">
                  <Languages />
                  <span>Localization</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/super-admin/gamification" passHref>
                <SidebarMenuButton tooltip="Gamification">
                  <Trophy />
                  <span>Gamification</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <Link href="/super-admin/audit-logs" passHref>
                <SidebarMenuButton tooltip="Audit Logs">
                  <ShieldCheck />
                  <span>Audit Logs</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/super-admin/users" passHref>
                <SidebarMenuButton tooltip="All Users">
                  <Users />
                  <span>All Users</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarSeparator />
             <SidebarMenuItem>
              <Link href="/super-admin/notifications" passHref>
                <SidebarMenuButton tooltip="Notifications">
                  <Bell />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/super-admin/settings" passHref>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden"/>
          <div className="flex-1">
             <SearchBar />
          </div>
          <div className="flex items-center gap-2">
             <ThemeToggle />
             <Link href="/super-admin/notifications" passHref>
                <Button variant="ghost" size="icon">
                    <Bell />
                    <span className="sr-only">Notifications</span>
                </Button>
            </Link>
             <Link href="/super-admin/settings" passHref>
                <Button variant="ghost" size="icon">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Button>
            </Link>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
