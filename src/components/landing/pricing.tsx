import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Pricing</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            No subscriptions. No hidden fees. Only pay when you earn.
          </p>
        </div>
        <div className="mx-auto flex justify-center">
          <Card className="w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pay-as-you-go</CardTitle>
              <CardDescription>Perfect for tutors of all sizes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-5xl font-bold">5%</span>
                <span className="text-muted-foreground"> / transaction</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  All features included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Unlimited students
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Unlimited classes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Secure payment processing
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg" variant="accent">
                <Link href="#">Get Started for Free</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
