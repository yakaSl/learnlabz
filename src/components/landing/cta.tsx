import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Cta() {
  const ctaImage = PlaceHolderImages.find((p) => p.id === "cta-image");
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Transform Your Teaching?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of educators who are simplifying their admin work and
            focusing on what truly matters.
          </p>
        </div>
        {ctaImage && (
            <div className="flex justify-center">
                <Image
                src={ctaImage.imageUrl}
                alt={ctaImage.description}
                width={600}
                height={400}
                className="rounded-xl object-cover"
                data-ai-hint={ctaImage.imageHint}
                />
            </div>
        )}
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Button asChild size="lg">
            <Link href="/register">Start for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
