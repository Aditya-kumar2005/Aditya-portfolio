'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard, UserPlus } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@/lib/auth';

interface NavbarProps {
  onNavigate?: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Glass background */}
      <div className="absolute inset-0 bg-dark/70 backdrop-blur-xl border-b border-white/5" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <BrandLogo size="sm" showSubtitle={false} />

        {/* Center: Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/4"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Auth: Signed Out */}
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/6 hover:text-white">
                <UserPlus className="size-4" />
                Sign Up
              </span>
            </SignUpButton>
          </SignedOut>

          {/* Auth: Signed In */}
          <SignedIn>
            <button
              onClick={() => onNavigate?.()}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-colors hover:text-white/80 hover:bg-white/4"
            >
              <LayoutDashboard className="size-3.5" />
              Dashboard
            </button>
            <UserButton />
          </SignedIn>

          {/* CTA */}
          <motion.button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary hover:shadow-brand/40 active:scale-[0.97]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Let&apos;s Talk
            <ArrowRight className="size-4" />
          </motion.button>
        </div>

        {/* Mobile: Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-white/60 transition-colors hover:bg-white/[]hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile: Full overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-dark/80 backdrop-blur-lg"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="relative mx-4 mt-4 rounded-2xl border border-white/8 bg-surface/95 p-6 backdrop-blur-xl shadow-2xl shadow-black/50"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-xl px-4 py-3 text-left text-base font-medium text-white/70 transition-colors hover:bg-white/4 hover:text-white"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="my-4 h-px bg-white/6" />

              <div className="flex flex-col gap-3">
                {/* Dashboard (Signed In only) */}
                <SignedIn>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition-colors hover:bg-white/4 hover:text-white/80"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </button>
                </SignedIn>

                {/* Auth */}
                <div className="flex items-center gap-3 px-4">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/6 hover:text-white">
                        <UserPlus className="size-4" />
                        Sign Up
                      </span>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton showName />
                  </SignedIn>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => handleNavClick('#contact')}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
                  whileTap={{ scale: 0.97 }}
                >
                  Free Consultation
                  <ArrowRight className="size-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
