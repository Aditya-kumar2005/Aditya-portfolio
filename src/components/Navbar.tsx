'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard, UserPlus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { authClient } from '@/lib/auth-client';

interface NavbarProps {
  onNavigate?: () => void;
}

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authClient.getSession();
        setSession(data.data);
      } catch (error) {
        console.log('No session');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    router.refresh();
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
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!loading && (
            <>
              {!session ? (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/4"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/6 hover:text-white"
                  >
                    <UserPlus className="size-4" />
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/4"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              )}
            </>
          )}

          {/* CTA */}
          <motion.button
            onClick={() => router.push('/contact')}
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
                  <motion.div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-left text-base font-medium text-white/70 transition-colors hover:bg-white/4 hover:text-white"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="my-4 h-px bg-white/6" />

              <div className="flex flex-col gap-3">
                {!loading && (
                  <>
                    {!session ? (
                      <>
                        <Link
                          href="/sign-in"
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/4 hover:text-white"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/sign-up"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/6 hover:text-white"
                        >
                          <UserPlus className="size-4" />
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/4 hover:text-white"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    )}
                  </>
                )}

                {/* CTA */}
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push('/contact');
                  }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
                  whileTap={{ scale: 0.97 }}
                >
                  Let&apos;s Talk
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
