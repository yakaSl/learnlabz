
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function SignUpForm() {
  return (
    <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input id="full-name" placeholder="John Doe" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
        </div>
        <div className="flex items-start space-x-2">
            <Checkbox id="terms" required />
            <Label
                htmlFor="terms"
                className="text-sm font-normal text-muted-foreground"
            >
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline">
                    Privacy Policy
                </Link>
                .
            </Label>
        </div>
        <Button type="submit" className="w-full">
            Create an account
        </Button>
        <Button variant="outline" className="w-full">
            Sign up with Google
        </Button>
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
                Login
            </Link>
        </div>
    </div>
  );
}
