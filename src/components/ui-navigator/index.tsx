
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function UINavigator() {
  const publicPages = [
    { href: "/", name: "Landing Page" },
  ];

  const devPages = [
    { href: "/ui", name: "UI Components" },
  ];

  const superAdminPages = [
    { href: "/super-admin", name: "Dashboard" },
    { href: "/super-admin/users", name: "User Management" },
    { href: "/super-admin/institutes", name: "Institute Management" },
    { href: "/super-admin/payments", name: "Payment Management" },
    { href: "/super-admin/analytics", name: "Analytics & Reports" },
    { href: "/super-admin/settings", name: "System Settings" },
    { href: "/super-admin/notifications", name: "Notification Center" },
    { href: "/super-admin/localization", name: "Localization" },
    { href: "/super-admin/gamification", name: "Gamification" },
    { href: "/super-admin/audit-logs", name: "Audit Logs" },
  ];

  const instituteAdminPages = [
    { href: "/institute-admin", name: "Dashboard" },
    { href: "/institute-admin/tutors", name: "Tutor Management" },
    { href: "/institute-admin/classes", name: "Class Management" },
    { href: "/institute-admin/students", name: "Student Management" },
    { href: "/institute-admin/billing", name: "Billing" },
    { href: "/institute-admin/reports", name: "Reports" },
    { href: "/institute-admin/communication", name: "Communication" },
    { href: "/institute-admin/settings", name: "Settings" },
  ];

  const tutorPages = [
    { href: "/tutor", name: "Tutor Dashboard" },
    { href: "/tutor/classes", name: "Class Management" },
    { href: "/tutor/students", name: "Student Management" },
    { href: "/tutor/materials", name: "Materials" },
    { href: "/tutor/payments", name: "Payments" },
    { href: "/tutor/communication", name: "Communication" },
    { href: "/tutor/reports", name: "Reports" },
    { href: "/tutor/ai-assistant", name: "AI Assistant" },
    { href: "/tutor/settings", name: "Settings" },
  ];

  const studentPages = [
    { href: "/student", name: "Student Dashboard" },
    { href: "/student/classes", name: "My Classes" },
    { href: "/student/materials", name: "Materials" },
    { href: "/student/grades", name: "Grades & Performance" },
    { href: "/student/ai-tutor", name: "AI Tutor" },
    { href: "/student/achievements", name: "Achievements" },
    { href: "/student/profile", name: "My Profile" },
    { href: "/student/assignments/1", name: "View Assignment" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>UI Page Links</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Public Pages</h3>
          <div className="flex flex-wrap gap-4">
            {publicPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Development Pages</h3>
          <div className="flex flex-wrap gap-4">
            {devPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Super Admin Role</h3>
          <div className="flex flex-wrap gap-4">
            {superAdminPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Institute Admin Role</h3>
          <div className="flex flex-wrap gap-4">
            {instituteAdminPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Independent Tutor Role</h3>
          <div className="flex flex-wrap gap-4">
            {tutorPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Student Role</h3>
          <div className="flex flex-wrap gap-4">
            {studentPages.map((page) => (
              <Button asChild variant="outline" key={page.href}>
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
