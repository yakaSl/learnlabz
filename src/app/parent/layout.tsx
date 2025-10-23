
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, BarChart2, Wallet, MessageSquare, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ParentUserNav from "@/components/parent/user-nav";
import { ChildSelector } from "@/components/parent/child-selector";

export default function ParentLayout({
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
          <div className="flex items-center gap-4">
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
