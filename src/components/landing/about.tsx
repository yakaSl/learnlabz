import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">About LearnLabz</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our mission is to empower educators by providing a simple, flexible, and powerful platform to manage their teaching business. We believe in fair pricing and putting tutors first, so you can focus on what you do best: teaching.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
