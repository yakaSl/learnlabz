
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Building, Settings, BarChart3, Bell, CreditCard, Languages, Trophy, ShieldCheck, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserNav from "@/components/super-admin/user-nav";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center p-2 group-data-[collapsible=icon]:p-0">
            <div className="bg-white p-1 rounded-md group-data-[collapsible=icon]:hidden">
                <Image src="/logo/logo.png" alt="LearnLabz Logo" width={140} height={28} />
            </div>
             <div className="hidden group-data-[collapsible=icon]:block p-1 bg-white rounded-lg">
                <Image src="/logo/logo.png" alt="LearnLabz Logo Icon" width={36} height={36}  />
            </div>
          </div>
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
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
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
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden"/>
          <div className="flex-1">
             <h1 className="text-lg font-semibold">Super Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
