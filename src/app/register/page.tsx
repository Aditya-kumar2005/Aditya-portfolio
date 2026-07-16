
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, ArrowLeft, Loader2, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { RegisterSchema } from '@/lib/validators';

type FormData = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    const result = RegisterSchema.safeParse(formData);

    if (!result.success) {
      setValidationErrors(result.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await signUp(result.data);
      router.push('/login'); // Redirect to login page after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 glass rounded-2xl"
      >
        <div className="flex flex-col items-center text-center">
            <motion.div
                animate={{ rotate: [0, 360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-brand/10 rounded-full"
            >
                <Cpu className="w-10 h-10 text-brand" />
            </motion.div>
          <h1 className="mt-4 text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-sm text-white/70">Join us and start your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute w-5 h-5 text-white/40 left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
            />
            {validationErrors.name && <p className="mt-2 text-xs text-red-500">{validationErrors.name[0]}</p>}
          </div>

          <div className="relative">
            <Mail className="absolute w-5 h-5 text-white/40 left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
            />
            {validationErrors.email && <p className="mt-2 text-xs text-red-500">{validationErrors.email[0]}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute w-5 h-5 text-white/40 left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
            />
            {validationErrors.password && <p className="mt-2 text-xs text-red-500">{validationErrors.password[0]}</p>}
          </div>

          {error && (
            <div className="p-3 text-center text-white bg-red-500 rounded-md">
              <p>{error}</p>
            </div>
          )}

          <div>
            <Button type="submit" className="w-full rounded-lg bg-brand px-6 py-4 font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <UserPlus className="w-5 h-5 mr-2" />}
              Sign Up
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-brand hover:text-brand-secondary">
              Sign In
            </Link>
          </p>
          <Link href="/" className="inline-flex items-center mt-4 text-sm text-white/70 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
