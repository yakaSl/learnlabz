import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function UINavigator() {
  const publicPages = [
    { href: "/", name: "Landing Page" },
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
          <h3 className="text-lg font-semibold mb-2">Super Admin Role</h3>
          <div className="flex flex-wrap gap-4">
            {superAdminPages.map((page) => (
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