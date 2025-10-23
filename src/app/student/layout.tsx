
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Bot, Trophy, User, BarChart2, Folder, Calendar, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StudentUserNav from "@/components/student/user-nav";

export default function StudentLayout({
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
              <Link href="/student" passHref>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/student/classes" passHref>
                <SidebarMenuButton tooltip="My Classes">
                  <BookOpen />
                  <span>My Classes</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/student/attendance" passHref>
                <SidebarMenuButton tooltip="Attendance">
                  <Calendar />
                  <span>Attendance</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/student/materials" passHref>
                <SidebarMenuButton tooltip="Materials">
                  <Folder />
                  <span>Materials</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/student/grades" passHref>
                <SidebarMenuButton tooltip="Grades">
                  <BarChart2 />
                  <span>Grades</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/student/payments" passHref>
                <SidebarMenuButton tooltip="Payments">
                  <Wallet />
                  <span>Payments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/student/ai-tutor" passHref>
                <SidebarMenuButton tooltip="AI Tutor">
                  <Bot />
                  <span>AI Tutor</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/student/achievements" passHref>
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
              <Link href="/student/profile" passHref>
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
          <div className="flex-1">
             <h1 className="text-lg font-semibold">Student Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <StudentUserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
