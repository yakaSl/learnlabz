import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Testimonials() {
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Sarah J.",
      role: "Math Tutor",
      quote: "LearnLabz has been a game-changer for my tutoring business. The enrollment is seamless, and the pay-as-you-go model is exactly what I needed. Highly recommended!",
      avatarImage: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
    },
    {
      id: "testimonial-2",
      name: "Michael B.",
      role: "Science Educator",
      quote: "I've tried multiple platforms, but LearnLabz stands out for its simplicity and tutor-first approach. Managing my classes has never been easier.",
      avatarImage: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
    },
    {
      id: "testimonial-3",
      name: "Emily R.",
      role: "Language Coach",
      quote: "The 5% fee is incredibly fair. I love that I'm not locked into a monthly subscription. The platform is intuitive and my students love it too.",
      avatarImage: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
    },
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Tutors Everywhere</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See what educators are saying about our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full flex flex-col">
              <CardContent className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex text-primary mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {testimonial.avatarImage && (
                    <Avatar>
                      <AvatarImage 
                        src={testimonial.avatarImage.imageUrl}
                        alt={testimonial.avatarImage.description}
                        data-ai-hint={testimonial.avatarImage.imageHint}
                      />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
