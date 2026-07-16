'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Aditya-kumar2005', label: 'GitHub' },
  { icon: Linkedin, href: 'http://www.linkedin.com/in/aditya-kumar-b4874235b', label: 'LinkedIn' },
];

const agencyLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
];

const resourceLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isHomePage) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={isHomePage ? handleClick : undefined}
      className="text-sm text-white/40 transition-colors hover:text-white/70"
    >
      {label}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Col 1-2: Brand & Description */}
          <div className="sm:col-span-2">
            <Link href="/">
              <BrandLogo size="default" showSubtitle />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
              We build quantum-grade digital experiences that push the boundaries
              of what&apos;s possible. From AI-powered platforms to immersive
              interfaces, we engineer the future.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/6 bg-white/2 text-white/40 transition-all hover:border-white/12 hover:bg-white/5 hover:text-white/70"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 3: Agency */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Agency
            </h4>
            <ul className="space-y-2.5">
              {agencyLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Aditya Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/30 transition-colors hover:text-white/50">
              Terms of Service
            </Link>
            <span className="text-white/10">|</span>
            <Link href="/" className="text-xs text-white/30 transition-colors hover:text-white/50">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
