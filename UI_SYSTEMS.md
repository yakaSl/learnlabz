# UI Systems and Component Documentation

This document provides an overview of the UI systems, core components, and design patterns used in the LearnLabz platform. The UI is built using Next.js, React, TypeScript, and styled with Tailwind CSS, leveraging the component library from **shadcn/ui**.

## Core Technology Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Icons:** lucide-react

## 1. Core UI Components (`src/components/ui`)

The foundation of the UI is a set of reusable, unstyled components provided by `shadcn/ui`. These components form the building blocks for all user interfaces across the platform.

Key components include:
- **`Button`:** For all interactive actions. Variants include `default`, `destructive`, `outline`, `secondary`, `ghost`, and `link`.
- **`Card`:** The primary container for grouping related content. Used extensively in dashboards and detail pages.
- **`Input`:** For all text-based user input.
- **`Label`:** Provides accessible labels for form elements.
- **`Select`:** Dropdown menus for single-choice selections.
- **`Table`:** For displaying tabular data, used for lists of users, institutes, transactions, etc.
- **`Tabs`:** For organizing content within a page into different sections.
- **`Dialog` and `AlertDialog`:** For modal pop-ups and confirmation prompts.
- **`DropdownMenu`:** For contextual menus (e.g., action menus on table rows).
- **`Avatar`:** Displays user and institute profile images with fallbacks.
- **`Badge`:** For status indicators (e.g., "Active", "Pending", "Paid").
- **`Progress`:** Used for showing completion status, like in course progress bars.
- **`Separator`:** For visually separating content sections.

## 2. Layout System

The application uses a consistent layout system for all authenticated user portals.

### 2.1. Main Sidebar Layout (`src/components/ui/sidebar.tsx`)

This is a powerful, custom-built, responsive sidebar component that provides the main navigation structure for all user roles.

- **Desktop View:** On desktop, the sidebar can be either expanded (showing icons and labels) or collapsed (showing only icons). The state is saved in a cookie.
- **Mobile View:** On mobile devices, the sidebar automatically collapses into a slide-out "sheet" menu.
- **Context:** The sidebar's state and behavior are managed by the `SidebarProvider` and `useSidebar` hook.

### 2.2. Header Structure

Each authenticated portal features a consistent header layout containing:
- **`SidebarTrigger`:** A hamburger menu icon to toggle the sidebar on mobile.
- **`ContextSwitcher` / `ChildSelector`:** A dropdown for tutors or parents to switch between different contexts (their personal workspace vs. an institute, or different children).
- **`SearchBar`:** A universal search bar for navigating the application.
- **`ThemeToggle`:** A button to switch between light and dark modes.
- **User Profile Nav:** An avatar that opens a dropdown menu with user-specific actions and a logout link.

## 3. Role-Based Portals

The application is divided into several distinct portals, each tailored to a specific user role.

### 3.1. Super Admin Portal (`/super-admin`)

- **Purpose:** Platform-wide management and oversight.
- **Key UI Patterns:**
  - Extensive use of `Table` with sorting, filtering, and pagination for managing users, institutes, and payments.
  - Data visualization widgets using `recharts` for analytics.
  - Multi-tabbed interfaces (`Tabs`) for complex settings pages (e.g., System Settings).

### 3.2. Institute Admin Portal (`/institute-admin`)

- **Purpose:** Managing a single educational institute.
- **Key UI Patterns:**
  - Dashboards with `Card`-based statistics.
  - Management pages for tutors, students, and classes.
  - A calendar view (`ClassCalendarView`) for scheduling.

### 3.3. Tutor Portal (`/tutor`)

- **Purpose:** For tutors to manage their classes, students, and materials.
- **Key UI Patterns:**
  - `ContextSwitcher` to toggle between a "Personal Workspace" and an "Institute" context.
  - `ClassCard` grid for a visual overview of classes.
  - Detailed class view with tabs for managing students, attendance, materials, and assessments.

### 3.4. Student Portal (`/student`)

- **Purpose:** For students to access their classes, grades, and learning materials.
- **Key UI Patterns:**
  - Dashboard focused on upcoming deadlines and progress.
  - Gamification elements like `PointsSummary` and `BadgeGallery`.
  - An `AiTutorChat` interface for interactive learning.

### 3.5. Parent Portal (`/parent`)

- **Purpose:** For parents to monitor their children's progress.
- **Key UI Patterns:**
  - `ChildSelector` to switch between different children's dashboards.
  - Read-only views of performance analytics, attendance, and schedules.
  - A three-pane `CommunicationHub` for messaging tutors.

### 3.6. Tutor Assistant Portal (`/tutor-assistant`)

- **Purpose:** A simplified view for assistants to perform delegated tasks.
- **Key UI Patterns:**
  - A task-oriented dashboard (`TaskList`).
  - Read-only views of schedules.
  - A dedicated UI for marking attendance.

## 4. Theming and Styling

- **`src/app/globals.css`:** This file defines the core color palette using CSS variables for both light and dark modes. This allows for consistent theming across all components.
- **`ThemeProvider` (`src/components/theme-provider.tsx`):** This component, using the `next-themes` library, wraps the entire application to enable theme switching.
- **`ThemeToggle` (`src/components/ui/theme-toggle.tsx`):** A simple button that allows the user to toggle between light and dark themes.
