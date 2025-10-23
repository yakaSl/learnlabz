import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function UINavigator() {
  const pages = [
    { href: "/", name: "Landing Page" },
    { href: "/super-admin", name: "Super Admin Dashboard" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Links</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        <p>Use these buttons to navigate to the full pages.</p>
        <div className="flex flex-wrap gap-4">
          {pages.map((page) => (
            <Button asChild variant="outline" key={page.href}>
              <Link href={page.href}>{page.name}</Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
