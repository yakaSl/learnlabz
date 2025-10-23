import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function UINavigator() {
  const pages = [
    { href: "/login", name: "Login Page" },
    { href: "/signup", name: "Signup Page" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Links</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        <p>Use these buttons to navigate to the full pages.</p>
        <div className="flex gap-4">
            {/* As we create pages, the links will be added here. For now, they are placeholders. */}
            <Button asChild variant="outline">
                <Link href="#">Login</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="#">Sign Up</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
