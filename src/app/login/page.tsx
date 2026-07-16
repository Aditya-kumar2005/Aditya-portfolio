'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowLeft, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuthContext } from '@/lib/auth-context';
import Link from 'next/link';

export default function LoginPage() {
  const { signIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    setError('');

    const res = await signIn(email.trim(), password);
    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-4 sm:px-6">
      {/* Cosmic background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-120 w-120 rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-accent/10 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="grid-pattern pointer-events-none absolute inset-0" />

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-3xl p-8 md:p-10 border border-white/5 bg-surface/50 backdrop-blur-xl">
          {/* Logo Icon */}
          <div className="relative mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20 shadow-lg shadow-brand/20">
            <Cpu className="size-7 text-brand" />
            <span className="absolute -top-0.5 -right-0.5">
              <span className="absolute inline-flex size-2 rounded-full bg-brand-accent opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
            </span>
          </div>

          {/* Title */}
          <h1 className="heading-display mb-1 text-center text-2xl font-bold text-white">
            Access <span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">Portal</span>
          </h1>
          <p className="mb-8 text-center text-sm text-white/40">
            Sign in to your command center
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="login-email" className="block text-sm font-medium text-white/60">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-white/3 py-3 pl-11 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                  placeholder="name@company.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="block text-sm font-medium text-white/60">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-white/3 py-3 pl-11 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <motion.p
                className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary hover:shadow-brand/40 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              {isLoading ? 'Connecting...' : 'Sign In'}
            </button>
          </form>

          {/* Footer toggle & back link */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-white/40">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-brand hover:underline font-medium">
                Register
              </Link>
            </p>
            <div className="h-px bg-white/5" />
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="size-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
