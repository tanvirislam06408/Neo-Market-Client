import Link from "next/link";
import { Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A281E] pt-20 pb-10 text-[#E7E1D9]">
      <div className="container mx-auto px-4">
        <StaggerContainer>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <StaggerItem>
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition-colors hover:opacity-90">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3E5F47]">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <span>NeoMarket</span>
                </Link>
                <p className="max-w-xs text-sm leading-relaxed text-[#B0B3A6]">
                  Your trusted circular marketplace for pre-owned electronics, furniture, and fashion. Join us in making commerce sustainable.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#273B2D] transition-colors hover:bg-[#3E5F47] hover:text-white">
                    <FacebookIcon className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#273B2D] transition-colors hover:bg-[#3E5F47] hover:text-white">
                    <TwitterIcon className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#273B2D] transition-colors hover:bg-[#3E5F47] hover:text-white">
                    <InstagramIcon className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#273B2D] transition-colors hover:bg-[#3E5F47] hover:text-white">
                    <LinkedinIcon className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
                <ul className="space-y-4 text-sm text-[#B0B3A6]">
                  <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
                  <li><Link href="/products" className="transition-colors hover:text-white">Shop Products</Link></li>
                  <li><Link href="/categories" className="transition-colors hover:text-white">Categories</Link></li>
                  <li><Link href="/about" className="transition-colors hover:text-white">About Us</Link></li>
                  <li><Link href="/sell" className="transition-colors hover:text-white">Start Selling</Link></li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <h3 className="mb-6 text-lg font-semibold text-white">Support</h3>
                <ul className="space-y-4 text-sm text-[#B0B3A6]">
                  <li><Link href="/faq" className="transition-colors hover:text-white">Help Center & FAQ</Link></li>
                  <li><Link href="/shipping" className="transition-colors hover:text-white">Shipping & Returns</Link></li>
                  <li><Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/trust" className="transition-colors hover:text-white">Trust & Safety</Link></li>
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <h3 className="mb-6 text-lg font-semibold text-white">Contact Info</h3>
                <ul className="space-y-4 text-sm text-[#B0B3A6]">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#3E5F47]" />
                    <span>123 Market Avenue,<br />San Francisco, CA 94103</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-[#3E5F47]" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-[#3E5F47]" />
                    <a href="mailto:hello@neomarket.com" className="transition-colors hover:text-white">hello@neomarket.com</a>
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        <FadeIn>
          <div className="mt-16 border-t border-[#273B2D] pt-8 text-center text-sm text-[#B0B3A6]">
            <p>&copy; {currentYear} NeoMarket. All rights reserved.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
