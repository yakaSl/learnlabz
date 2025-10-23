import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap, Percent, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "30-Second Enrollment",
      description: "Students join your class instantly with a simple link or QR code. No complicated sign-ups, no friction.",
    },
    {
      icon: <Percent className="h-8 w-8 text-primary" />,
      title: "Pay 5%, Not Fixed Fees",
      description: "Our success is tied to yours. We only charge a small, transparent percentage when you get paid. No monthly surprises.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Teach Anywhere",
      description: "Effortlessly manage your personal classes and work with multiple institutes, all from a single, unified dashboard.",
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Focus on teaching, we'll handle the rest. Our platform is designed to be powerful yet simple.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-center bg-primary/10 rounded-full w-16 h-16 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
