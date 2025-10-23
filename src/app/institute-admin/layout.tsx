
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, BookOpen, GraduationCap, BarChart2, CreditCard, Megaphone, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InstituteAdminUserNav from "@/components/institute-admin/user-nav";

export default function InstituteAdminLayout({
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
                <Image src="https://picsum.photos/seed/bma-logo/140/28" alt="Institute Logo" width={140} height={28} />
            </div>
             <div className="hidden group-data-[collapsible=icon]:block p-1 bg-white rounded-lg">
                <Image src="https://picsum.photos/seed/bma-logo/36/36" alt="Institute Logo Icon" width={36} height={36}  />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/institute-admin" passHref>
                <SidebarMenuButton tooltip="Dashboard" isActive>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/institute-admin/tutors" passHref>
                <SidebarMenuButton tooltip="Tutors">
                  <Users />
                  <span>Tutors</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/institute-admin/students" passHref>
                <SidebarMenuButton tooltip="Students">
                  <GraduationCap />
                  <span>Students</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/institute-admin/classes" passHref>
                <SidebarMenuButton tooltip="Classes">
                  <BookOpen />
                  <span>Classes</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/institute-admin/billing" passHref>
                <SidebarMenuButton tooltip="Billing">
                  <CreditCard />
                  <span>Billing</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/institute-admin/reports" passHref>
                <SidebarMenuButton tooltip="Reports">
                  <BarChart2 />
                  <span>Reports</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/institute-admin/communication" passHref>
                <SidebarMenuButton tooltip="Communication">
                  <Megaphone />
                  <span>Communication</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/institute-admin/settings" passHref>
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
             <h1 className="text-lg font-semibold">Institute Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <InstituteAdminUserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
