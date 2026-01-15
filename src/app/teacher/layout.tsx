'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { ChevronDown, Settings, Bell } from "lucide-react";
import Link from "next/link";
import TutorUserNav from "@/components/tutor/user-nav";
import { ContextSwitcher } from "@/components/tutor/context-switcher";
import { SidebarLogo } from "@/components/ui/sidebar-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TutorProvider } from "@/components/tutor/tutor-provider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppContext } from "@/hooks/use-context";
import { MenuService } from "@/services/menu.service";
import { MenuItem } from "@/types/menu.types";
import { getIcon } from "@/utils/icon-mapper";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { selectedContext } = useAppContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsibleState, setCollapsibleState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMenu = async () => {
      if (!user?.id || user.id === 'temp-id') {
        setLoading(false);
        return;
      }

      // Use selected institute from context, fallback to user's instituteId
      const instituteId = selectedContext.type === 'institute'
        ? selectedContext.instituteId
        : user.instituteId;

      try {
        const response = await MenuService.getMenu(user.id, instituteId);

        if (response.success && response.data && Array.isArray(response.data)) {
          setMenuItems(response.data);

          const initialState: Record<string, boolean> = {};
          response.data.forEach(item => {
            if (item.children.length > 0) {
              initialState[item.menu_code] = false;
            }
          });
          setCollapsibleState(initialState);
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [user?.id, user?.instituteId, selectedContext]);

  const toggleCollapsible = (menuCode: string) => {
    setCollapsibleState(prev => ({
      ...prev,
      [menuCode]: !prev[menuCode]
    }));
  };

  const renderMenuItem = (item: MenuItem) => {
    const Icon = getIcon(item.icon);
    const hasChildren = item.children.length > 0;
    const isOpen = collapsibleState[item.menu_code] || false;

    if (hasChildren) {
      return (
        <Collapsible
          key={item.menu_code}
          open={isOpen}
          onOpenChange={() => toggleCollapsible(item.menu_code)}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.menu_name}>
                <Icon />
                <span>{item.menu_name}</span>
                <ChevronDown className={`ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children.map(child => {
                  const ChildIcon = getIcon(child.icon);
                  return (
                    <SidebarMenuSubItem key={child.menu_code}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/teacher${child.path}`}>
                          <ChildIcon className="mr-2 h-4 w-4" />
                          <span>{child.menu_name}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.menu_code}>
        <Link href={`/teacher${item.path}`} passHref>
          <SidebarMenuButton tooltip={item.menu_name}>
            <Icon />
            <span>{item.menu_name}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  return (
    <TutorProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {loading ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <span>Loading menu...</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : menuItems.length === 0 ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <span>No menu items</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                menuItems.map(item => renderMenuItem(item))
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
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
