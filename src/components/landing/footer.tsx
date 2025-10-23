import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo/logo.png" alt="LearnLabz Logo" width={160} height={32} />
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-medium">
            <Link href="#about" className="hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#contact" className="hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Privacy Policy
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:scale-110 transition-transform" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:scale-110 transition-transform" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/80">
          © {currentYear} LearnLabz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
