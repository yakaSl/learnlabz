import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Testimonials from '@/components/landing/testimonials';
import Footer from '@/components/landing/footer';
import Pricing from '@/components/landing/pricing';
import About from '@/components/landing/about';

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
}
