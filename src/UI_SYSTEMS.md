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
  - **Dashboard (`/super-admin`):** Features `StatGrid`, `RevenueChart`, `UserGrowthChart`, `ActivityFeed`, `SystemHealth`, `AlertPanel`, `PredictiveAnalytics`, and `QuickActions` components.
  - **Institute Management (`/super-admin/institutes`):** Uses a `Tabs` component to switch between an `InstituteManagement` view (with `InstituteCard` or `InstituteListItem`) and a `WhiteLabelQueue`.
  - **Institute Detail Page (`/super-admin/institutes/[instituteId]`):** A detailed, tabbed view (`Tabs`) showing `InstituteInfoTab`, `InstituteUsersTab`, and a `BrandingTab`.
  - **User Management (`/super-admin/users`, `/tutors`, `/students`):** A `UserTable` with faceted filters (`DataTableFacetedFilter`) and view options (`DataTableViewOptions`). The component is reused to show all users or filter by "Tutor" or "Student" roles.
  - **Payments (`/super-admin/payments`):** A tabbed view with a `TransactionTable` and a `PayoutsDashboard`, which includes a `PayoutsTable` and `PayoutCalendarView`.
  - **Payout Detail Page (`/super-admin/payments/payouts/[payoutId]`):** A detailed view (`PayoutAdjustmentView`) for reviewing and adjusting individual tutor payouts before approval.
  - **Analytics (`/super-admin/analytics`):** A customizable dashboard view (`DashboardView`) using a `DndContext` for draggable chart widgets (`AreaChartWidget`, `BarChartWidget`, `PieChartWidget`) and an `AiInsights` panel.
  - **Audit Logs (`/super-admin/audit-logs`):** Displays a `LogTable` with an expandable row for details, alongside a `LogFilterPanel` and an `AiAnomalyDetector`.

### 3.2. Institute Admin Portal (`/institute-admin`)

- **Purpose:** Managing a single educational institute.
- **Key UI Patterns:**
  - **Dashboard (`/institute-admin`):** Composed of `StatCards`, `QuickActions`, `RevenueChart`, `ClassCalendar`, `AiInsights`, and an `ActivityFeed`.
  - **Tutor Management (`/institute-admin/tutors`):** A view with `TutorCard` and `TutorListItem` components. Includes an `InviteTutorDialog`.
  - **Tutor Detail Page (`/institute-admin/tutors/[tutorId]`):** Shows a detailed profile with stats and a list of assigned classes.
  - **Class Management (`/institute-admin/classes`):** Features a toggle between a `ClassCalendarView` and a list view.
  - **Class Detail Page (`/institute-admin/classes/[classId]`):** A tabbed interface to manage `StudentsTab` and `AttendanceTab` for a specific class.
  - **Student Management (`/institute-admin/students`):** A `Table`-based view for managing all students in the institute.

### 3.3. Tutor Portal (`/tutor`)

- **Purpose:** For tutors to manage their classes, students, and materials.
- **Key UI Patterns:**
  - **ContextSwitcher:** Allows the tutor to toggle between a "Personal Workspace" and an "Institute" context, which changes the data and available actions.
  - **Dashboard (`/tutor`):** A workspace with `EarningsSummary`, `TodaysSchedule`, `AttendanceStats`, `AiAssistantWidget`, and `StudentPerformance` widgets.
  - **Class Management (`/tutor/classes`):** Displays `ClassCard` components for a visual overview of classes. The `CreateClassForm` at `/tutor/classes/new` allows tutors to create their own classes in their personal context.
  - **Class Detail Page (`/tutor/classes/[classId]`):** A comprehensive, tabbed view including `OverviewTab`, `StudentsTab`, `AttendanceTab` (with a `AttendanceSessionDialog`), `MaterialsTab` (with `UploadMaterialDialog`), `AssessmentsTab`, an `ExamsTab`, and a `FinancialsTab`.
  - **Assessment/Exam Creation (`/tutor/classes/[classId]/assessments/new`, `.../exams/new`):** Multi-column forms (`NewAssessmentPage`, `NewExamForm`) for creating assignments and exams.
  - **Grading View (`/tutor/classes/.../submissions/[submissionId]`):** A two-pane layout with a `SubmissionViewer` for the student's work and a `GradingPanel` for feedback and grades.
  - **Student Management (`/tutor/students`):** A grid of `StudentCard` components for all enrolled students.
  - **Student Profile Page (`/tutor/students/[studentId]`):** A detailed, tabbed view of a single student, including `OverviewTab`, `StudentAttendanceView`, and a `Performance` tab.

### 3.4. Student Portal (`/student`)

- **Purpose:** For students to access their classes, grades, and learning materials.
- **Key UI Patterns:**
  - **Dashboard (`/student`):** Focuses on immediate tasks with `UpcomingClasses`, `RecentGrades`, `AssignmentDeadlines`, `GamificationSummary`, `AiChatTutorWidget`, and `CourseProgress`.
  - **Class Management (`/student/classes`):** A grid of `StudentClassCard` components.
  - **Class Detail Page (`/student/classes/[classId]`):** A tabbed view for students to see a class `Overview`, `Materials`, `Assignments`, `Grades`, and a `Discussion` forum.
  - **Assignment Submission (`/student/assignments/[assignmentId]`):** A dedicated view (`AssignmentView`) for a single assignment, showing instructions, status, and a file submission area.
  - **Gamification (`/student/achievements`):** A `GamificationHub` that includes a class `Leaderboard`, a `BadgeGallery`, a `PointsSummary`, and `AiSuggestions`.
  - **AI Tutor (`/student/ai-tutor`):** An interactive `AiTutorChat` interface with context selection and chat history.

### 3.5. Parent Portal (`/parent`)

- **Purpose:** For parents to monitor their children's progress.
- **Key UI Patterns:**
  - **ChildSelector:** A key component in the header that allows the parent to switch between different children's dashboards.
  - **Dashboard (`/parent`):** A summary view with `PerformanceSummary`, `UpcomingClassesWidget`, `RecentGradesWidget`, a `PaymentStatusPanel`, and `CommunicationWidget`.
  - **Performance (`/parent/performance`):** A `PerformanceDashboard` with `PerformanceTrendChart` and `SubjectGradeBreakdown` charts.
  - **Messages (`/parent/messages`):** A three-pane `CommunicationHub` for messaging tutors.
  - **Gamification (`/parent/achievements`):** A read-only view of the child's progress, including `PointsSummary`, `BadgeGallery`, `Leaderboard`, and `AiMotivationSuggestions`.

### 3.6. Tutor Assistant Portal (`/tutor-assistant`)

- **Purpose:** A simplified view for assistants to perform delegated tasks.
- **Key UI Patterns:**
  - **Dashboard (`/tutor-assistant`):** A task-oriented view with `TaskList`, `TodaysSchedule`, and `Notifications`.
  - **Attendance Marking (`/tutor-assistant/attendance`):** A dedicated UI (`AttendanceMarking`) with a list of students and radio buttons to mark them "Present" or "Absent."

## 4. Theming and Styling

- **`src/app/globals.css`:** This file defines the core color palette using CSS variables for both light and dark modes. This allows for consistent theming across all components.
- **`ThemeProvider` (`src/components/theme-provider.tsx`):** This component, using the `next-themes` library, wraps the entire application to enable theme switching.
- **`ThemeToggle` (`src/components/ui/theme-toggle.tsx`):** A simple button that allows the user to toggle between light and dark themes.
