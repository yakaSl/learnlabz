import {
  LayoutDashboard,
  Users,
  Building,
  Settings,
  BarChart3,
  Bell,
  CreditCard,
  Languages,
  Trophy,
  ShieldCheck,
  GraduationCap,
  Database,
  BookOpen,
  Calendar,
  DollarSign,
  Globe,
  MessageSquare,
  LucideIcon,
  FileText,
  UserPlus,
  ListChecks,
  Briefcase,
  ClipboardList,
  FolderOpen,
  Package,
} from 'lucide-react';

/**
 * Map of icon names to Lucide React icon components
 */
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Building,
  Settings,
  BarChart3,
  Bell,
  CreditCard,
  Languages,
  Trophy,
  ShieldCheck,
  GraduationCap,
  Database,
  BookOpen,
  Calendar,
  DollarSign,
  Globe,
  MessageSquare,
  FileText,
  UserPlus,
  ListChecks,
  Briefcase,
  ClipboardList,
  FolderOpen,
  Package,
};

/**
 * Get icon component by name
 * @param iconName - Name of the icon from database
 * @returns Lucide icon component or default icon
 */
export const getIcon = (iconName: string | null): LucideIcon => {
  if (!iconName) {
    return FileText; // Default icon
  }

  return iconMap[iconName] || FileText;
};
