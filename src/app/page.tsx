'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth, AuthGate, SignInButton, SignUpButton } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Team from '@/components/sections/Team';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import AIDemo from '@/components/sections/AIDemo';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import UnifiedDashboard from '@/components/dashboards/UnifiedDashboard';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

type AppView = 'landing' | 'dashboard';

function LandingPage({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={onNavigate} />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Team />
        <Portfolio />
        <Testimonials />
        <AIDemo />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function AuthRequiredOverlay({ onSignedIn }: { onSignedIn: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-100 w-100 rounded-full bg-brand-accent/15 blur-[100px]" />
      </div>
      <div className="grid-pattern pointer-events-none absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-10 w-full max-w-lg px-4 text-center"
      >
        <div className="glass rounded-3xl p-10">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand/25 blur-[60px]" />

          {/* Icon */}
          <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20 shadow-lg shadow-brand/20">
            <ShieldCheck className="size-8 text-brand" />
          </div>

          <h1 className="heading-display text-2xl text-white mb-2">
            Authentication Required
          </h1>
          <p className="text-sm text-white/40 mb-8 leading-relaxed">
            Sign in or create an account to access the Aditya Labs platform.
            All features including dashboard, AI tools, and project management
            require authentication.
          </p>

          <div className="flex flex-col gap-3">
            <SignInButton>
              <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-[0.98]">
                <ShieldCheck className="size-4" />
                Sign In to Platform
              </span>
            </SignInButton>

            <SignUpButton>
              <span className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 px-6 py-3.5 text-sm font-medium text-white/70 transition-all hover:bg-white/6 hover:text-white active:scale-[0.98]">
                <Sparkles className="size-4" />
                Create New Account
              </span>
            </SignUpButton>
          </div>

          <p className="mt-6 text-xs text-white/20">
            New here? Sign up takes less than 30 seconds.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const { isSignedIn, isLoaded } = useAuth();

  // Auto-navigate to dashboard when user signs in
  useEffect(() => {
    if (isLoaded && isSignedIn && currentView === 'dashboard') {
      // Already on dashboard, do nothing
    }
  }, [isSignedIn, isLoaded, currentView]);

  const handleNavigateToDashboard = useCallback(() => {
    if (isSignedIn) {
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If not signed in, the auth gate will show
  }, [isSignedIn]);

  const handleBackToLanding = useCallback(() => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] as const }}
        className="min-h-screen flex flex-col"
      >
        {currentView === 'landing' && (
          <LandingPage onNavigate={handleNavigateToDashboard} />
        )}
        {currentView === 'dashboard' && (
          <AuthGate
            fallback={<AuthRequiredOverlay onSignedIn={handleNavigateToDashboard} />}
          >
            <UnifiedDashboard onBack={handleBackToLanding} />
          </AuthGate>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

