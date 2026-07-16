
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, ArrowLeft, Loader2, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { LoginSchema } from '@/lib/validators';

type FormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
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

    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      setValidationErrors(result.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await signIn(result.data);
      router.push('/'); // Redirect to a protected page on successful login
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div className="flex flex-col items-center text-center">
            <motion.div
                animate={{ rotate: [0, 360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-indigo-500 rounded-full"
            >
                <Cpu className="w-10 h-10 text-white" />
            </motion.div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to continue to your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
            />
            {validationErrors.email && <p className="mt-2 text-xs text-red-500">{validationErrors.email[0]}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
            />
            {validationErrors.password && <p className="mt-2 text-xs text-red-500">{validationErrors.password[0]}</p>}
          </div>

          {error && (
            <div className="p-3 text-center text-white bg-red-500 rounded-md">
              <p>{error}</p>
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ShieldCheck className="w-5 h-5 mr-2" />}
              Sign In
            </Button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign Up
            </Link>
          </p>
          <Link href="/" className="inline-flex items-center mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
