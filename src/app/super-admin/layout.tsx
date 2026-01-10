'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { ChevronDown, Settings, Bell } from "lucide-react";
import Link from "next/link";
import UserNav from "@/components/super-admin/user-nav";
import { SidebarLogo } from "@/components/ui/sidebar-logo";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MenuService } from "@/services/menu.service";
import { MenuItem } from "@/types/menu.types";
import { getIcon } from "@/utils/icon-mapper";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsibleState, setCollapsibleState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMenu = async () => {
      // Don't fetch if no user or if user has temp ID
      if (!user?.id || user.id === 'temp-id') {
        setLoading(false);
        return;
      }

      try {
        const response = await MenuService.getMenu(user.id, user.instituteId);
        console.log('Menu API Response:', response);

        if (response.success && response.data && Array.isArray(response.data)) {
          console.log('Menu Items:', response.data);
          setMenuItems(response.data);

          // Initialize collapsible state for parent menus
          const initialState: Record<string, boolean> = {};
          response.data.forEach(item => {
            if (item.children.length > 0) {
              initialState[item.menu_code] = false;
            }
          });
          setCollapsibleState(initialState);
        } else {
          console.log('Menu fetch failed or no data:', response);
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [user?.id, user?.instituteId]);

  const toggleCollapsible = (menuCode: string) => {
    setCollapsibleState(prev => ({
      ...prev,
      [menuCode]: !prev[menuCode]
    }));
  };

  const renderMenuItem = (item: MenuItem) => {
    console.log('Rendering menu item:', item.menu_name, item);
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
                        <Link href={`/super-admin${child.path}`}>
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
        <Link href={`/super-admin${item.path}`} passHref>
          <SidebarMenuButton tooltip={item.menu_name}>
            <Icon />
            <span>{item.menu_name}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  console.log('Render - Loading:', loading, 'MenuItems count:', menuItems.length, 'MenuItems:', menuItems);

  return (
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
