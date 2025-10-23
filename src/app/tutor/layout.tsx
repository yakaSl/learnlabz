
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, GraduationCap, DollarSign, Bot, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TutorUserNav from "@/components/tutor/user-nav";

export default function TutorLayout({
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
              <Link href="/tutor" passHref>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/tutor/classes" passHref>
                <SidebarMenuButton tooltip="My Classes">
                  <BookOpen />
                  <span>My Classes</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/tutor/students" passHref>
                <SidebarMenuButton tooltip="Students">
                  <GraduationCap />
                  <span>Students</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/tutor/payments" passHref>
                <SidebarMenuButton tooltip="Payments">
                  <DollarSign />
                  <span>Payments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/tutor/ai-assistant" passHref>
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
              <Link href="/tutor/settings" passHref>
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
             <h1 className="text-lg font-semibold">Tutor Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <TutorUserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
