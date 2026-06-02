'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  useMemo,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useAuth as useClerkAuthHook,
  useUser as useClerkUserHook,
  SignInButton as ClerkSignInBtn,
  SignUpButton as ClerkSignUpBtn,
  UserButton as ClerkUserBtn,
} from '@clerk/nextjs';
import {
  LogOut,
  Mail,
  User as UserIcon,
  Chrome,
  X,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ---------------------------------------------------------------------------
// Detect if Clerk is available (publishable key is configured)
// ---------------------------------------------------------------------------

const CLERK_AVAILABLE = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  primaryEmailAddress: string;
  createdAt: string;
}

interface AuthContextValue {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string | null;
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

// ---------------------------------------------------------------------------
// Constants (for mock auth)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'clerk_auth_user';
const USERS_KEY = 'clerk_auth_users';

// ---------------------------------------------------------------------------
// External store for localStorage-based mock auth
// ---------------------------------------------------------------------------

interface AuthSnapshot {
  user: AuthUser | null;
  isLoaded: boolean;
}

const storeListeners = new Set<() => void>();

function subscribeToStore(listener: () => void): () => void {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

function emitStoreChange() {
  storeListeners.forEach((l) => l());
}

let cachedRaw: string | null | undefined = undefined;
let cachedSnapshot: AuthSnapshot = { user: null, isLoaded: true };

function getStoreSnapshot(): AuthSnapshot {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const user = raw ? (JSON.parse(raw) as AuthUser) : null;
      cachedSnapshot = { user, isLoaded: true };
    }
    return cachedSnapshot;
  } catch {
    return cachedSnapshot;
  }
}

const SERVER_SNAPSHOT: AuthSnapshot = { user: null, isLoaded: false };
function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

function writeToStore(user: AuthUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Silent fail
  }
  cachedRaw = undefined;
  emitStoreChange();
}

function getRegisteredUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUser(user: AuthUser) {
  try {
    const users = getRegisteredUsers();
    const existing = users.find((u) => u.primaryEmailAddress === user.primaryEmailAddress);
    if (!existing) {
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  } catch {
    // Silent fail
  }
}

function findUserByEmail(email: string): AuthUser | null {
  const users = getRegisteredUsers();
  return users.find((u) => u.primaryEmailAddress === email) || null;
}

// ---------------------------------------------------------------------------
// Context (shared between Clerk and mock auth)
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// MockAuthProvider
// ---------------------------------------------------------------------------

function MockAuthProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToStore,
    getStoreSnapshot,
    getServerSnapshot,
  );

  const signIn = useCallback((newUser: AuthUser) => {
    writeToStore(newUser);
  }, []);

  const signOut = useCallback(() => {
    writeToStore(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoaded: snapshot.isLoaded,
      isSignedIn: snapshot.user !== null,
      userId: snapshot.user?.id ?? null,
      user: snapshot.user,
      signIn,
      signOut,
    }),
    [snapshot, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// ClerkAuthProvider — wraps real Clerk hooks into our AuthContext
// Uses STATIC imports so React context works correctly with ClerkProvider
// ---------------------------------------------------------------------------

function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, userId, signOut: clerkSignOut } = useClerkAuthHook();
  const { user: clerkUser } = useClerkUserHook();

  const mappedUser = useMemo<AuthUser | null>(() => {
    if (!clerkUser) return null;
    return {
      id: clerkUser.id,
      fullName: clerkUser.fullName ?? '',
      firstName: clerkUser.firstName ?? '',
      lastName: clerkUser.lastName ?? '',
      imageUrl: clerkUser.imageUrl ?? '',
      primaryEmailAddress: clerkUser.primaryEmailAddress?.emailAddress ?? '',
      createdAt: clerkUser.createdAt?.toISOString?.() ?? '',
    };
  }, [clerkUser]);

  const signOut = useCallback(() => {
    clerkSignOut();
  }, [clerkSignOut]);

  const signIn = useCallback((_user: AuthUser) => {
    // With Clerk, sign-in is handled by Clerk's UI, not programmatically
    console.warn('signIn() is not available when using Clerk. Use Clerk UI instead.');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoaded: isLoaded ?? false,
      isSignedIn: isSignedIn ?? false,
      userId: userId ?? null,
      user: mappedUser,
      signIn,
      signOut,
    }),
    [isLoaded, isSignedIn, userId, mappedUser, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------------------------------------------------------------------
// AuthProvider (exported) — routes to Clerk or mock based on configuration
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  if (CLERK_AVAILABLE) {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
  }
  return <MockAuthProvider>{children}</MockAuthProvider>;
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useAuth(): {
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  signOut: () => void;
} {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return {
    isSignedIn: ctx.isSignedIn,
    isLoaded: ctx.isLoaded,
    userId: ctx.userId,
    signOut: ctx.signOut,
  };
}

export function useUser(): {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: AuthUser | null;
} {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useUser must be used within an <AuthProvider>');
  }
  return {
    isLoaded: ctx.isLoaded,
    isSignedIn: ctx.isSignedIn,
    user: ctx.user,
  };
}

// ---------------------------------------------------------------------------
// SignedIn / SignedOut components
// ---------------------------------------------------------------------------

export function SignedIn({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : null;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? null : <>{children}</>;
}

// ---------------------------------------------------------------------------
// AuthModal - Unified Sign Up / Sign In (mock mode only)
// ---------------------------------------------------------------------------

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'choose' | 'email'>('choose');
  const ctx = useContext(AuthContext);

  if (!ctx) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setShowPassword(false);
    setError('');
    setStep('choose');
    setMode('signin');
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500));

    const mockUser: AuthUser = {
      id: `user_google_${Date.now()}`,
      fullName: email.split('@')[0] || 'User',
      firstName: (email.split('@')[0] || 'User').charAt(0).toUpperCase() + (email.split('@')[0] || 'User').slice(1),
      lastName: '',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      primaryEmailAddress: email || 'user@gmail.com',
      createdAt: new Date().toISOString(),
    };

    saveRegisteredUser(mockUser);
    ctx.signIn(mockUser);
    setIsLoading(false);
    handleClose();
  };

  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1200));

    if (mode === 'signup') {
      if (!firstName.trim()) {
        setError('Please enter your name');
        setIsLoading(false);
        return;
      }

      const existing = findUserByEmail(email.trim().toLowerCase());
      if (existing) {
        setError('An account with this email already exists. Please sign in instead.');
        setIsLoading(false);
        return;
      }

      const newUser: AuthUser = {
        id: `user_${Date.now()}`,
        fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
        primaryEmailAddress: email.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
      };

      saveRegisteredUser(newUser);
      ctx.signIn(newUser);
    } else {
      const existing = findUserByEmail(email.trim().toLowerCase());
      if (existing) {
        ctx.signIn(existing);
      } else {
        const name = email.split('@')[0] || 'User';
        const parts = name.includes('.') ? name.split('.') : name.includes('_') ? name.split('_') : [name, ''];
        const newUser: AuthUser = {
          id: `user_${Date.now()}`,
          fullName: `${parts[0]} ${parts[1] || ''}`.trim(),
          firstName: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
          lastName: parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '',
          imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
          primaryEmailAddress: email.trim().toLowerCase(),
          createdAt: new Date().toISOString(),
        };
        saveRegisteredUser(newUser);
        ctx.signIn(newUser);
      }
    }

    setIsLoading(false);
    handleClose();
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-110 overflow-hidden rounded-2xl border border-white/8 bg-[#0B0F1A]/90 shadow-2xl shadow-black/50 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          >
            {/* Decorative gradient glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 right-0 h-32 w-32 rounded-full bg-brand-accent/15 blur-[60px]" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/6 hover:text-white/70"
              type="button"
            >
              <X className="size-4" />
            </button>

            {/* Content */}
            <div className="relative px-8 pt-10 pb-8">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                  {mode === 'signup' ? (
                    <UserPlus className="size-6 text-brand" />
                  ) : (
                    <ShieldCheck className="size-6 text-brand" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-white">
                  {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="mt-1.5 text-sm text-white/40">
                  {mode === 'signup'
                    ? 'Sign up to access the Aditya Labs platform'
                    : 'Sign in to your Aditya Labs account'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === 'choose' ? (
                  <motion.div
                    key="choose"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Google OAuth */}
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/15 hover:bg-white/6 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                    >
                      {isLoading ? (
                        <motion.div
                          className="size-5 rounded-full border-2 border-white/20 border-t-brand"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: [0, 0, 1, 1] as const }}
                        />
                      ) : (
                        <Chrome className="size-5 text-brand-accent" />
                      )}
                      {isLoading ? 'Connecting...' : `Continue with Google`}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                      <div className="h-px flex-1 bg-white/6" />
                      <span className="text-xs text-white/25">or</span>
                      <div className="h-px flex-1 bg-white/6" />
                    </div>

                    {/* Email option */}
                    <button
                      onClick={() => setStep('email')}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/15 hover:bg-white/6 active:scale-98 disabled:opacity-50"
                      type="button"
                    >
                      <Mail className="size-5 text-brand" />
                      Continue with Email
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Back button */}
                    <button
                      onClick={() => { setStep('choose'); setError(''); }}
                      disabled={isLoading}
                      className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/60"
                      type="button"
                    >
                      ← Back
                    </button>

                    {/* Name fields for signup */}
                    {mode === 'signup' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label htmlFor="auth-firstname" className="block text-sm font-medium text-white/60">
                            First name
                          </label>
                          <input
                            id="auth-firstname"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            disabled={isLoading}
                            className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="auth-lastname" className="block text-sm font-medium text-white/60">
                            Last name
                          </label>
                          <input
                            id="auth-lastname"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            disabled={isLoading}
                            className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="auth-email" className="block text-sm font-medium text-white/60">
                        Email address
                      </label>
                      <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEmailAuth();
                        }}
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                        autoFocus
                      />
                    </div>

                    {/* Password input */}
                    <div className="space-y-2">
                      <label htmlFor="auth-password" className="block text-sm font-medium text-white/60">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="auth-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEmailAuth();
                          }}
                          placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                          disabled={isLoading}
                          className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 pr-10 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          type="button"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <button
                      onClick={handleEmailAuth}
                      disabled={isLoading || !email.trim() || !password.trim()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand disabled:hover:shadow-brand/25"
                      type="button"
                    >
                      {isLoading ? (
                        <motion.div
                          className="size-4 rounded-full border-2 border-white/20 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: [0, 0, 1, 1] as const }}
                        />
                      ) : mode === 'signup' ? (
                        <UserPlus className="size-4" />
                      ) : (
                        <ArrowRight className="size-4" />
                      )}
                      {isLoading
                        ? mode === 'signup' ? 'Creating account...' : 'Signing in...'
                        : mode === 'signup' ? 'Create Account' : 'Sign In'}
                    </button>

                    {/* Switch mode */}
                    <p className="text-center text-sm text-white/30">
                      {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                      <button
                        onClick={switchMode}
                        className="text-brand hover:text-brand-secondary font-medium transition-colors"
                        type="button"
                      >
                        {mode === 'signup' ? 'Sign in' : 'Sign up'}
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <p className="mt-6 text-center text-[11px] leading-relaxed text-white/20">
                By continuing, you agree to our{' '}
                <span className="text-white/30 hover:text-white/50 cursor-pointer transition-colors">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-white/30 hover:text-white/50 cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Clerk-aware sign-in button (uses STATIC import — works with ClerkProvider)
// ---------------------------------------------------------------------------

function ClerkSignInButtonWrapper({ children }: { children?: ReactNode }) {
  return (
    <ClerkSignInBtn mode="modal">
      {children ?? (
        <span className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-97">
          <ShieldCheck className="size-4" />
          Sign In
        </span>
      )}
    </ClerkSignInBtn>
  );
}

// ---------------------------------------------------------------------------
// Clerk-aware sign-up button
// ---------------------------------------------------------------------------

function ClerkSignUpButtonWrapper({ children }: { children?: ReactNode }) {
  return (
    <ClerkSignUpBtn mode="modal">
      {children ?? (
        <span className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-97">
          <UserPlus className="size-4" />
          Sign Up
        </span>
      )}
    </ClerkSignUpBtn>
  );
}

// ---------------------------------------------------------------------------
// Clerk-aware user button
// ---------------------------------------------------------------------------

function ClerkUserButtonWrapper({ showName }: { showName?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <ClerkUserBtn
        appearance={{
          elements: {
            avatarBox: 'size-9 ring-2 ring-white/8 transition-all hover:ring-brand/40',
          },
        }}
      />
      {showName && (
        <span className="hidden text-sm font-medium text-white/70 sm:block">
          Account
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MockSignInButton (opens custom AuthModal)
// ---------------------------------------------------------------------------

function MockSignInButton({ children, className }: { children?: ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
        type="button"
      >
        {children ?? (
          <span className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-97">
            <ShieldCheck className="size-4" />
            Sign In
          </span>
        )}
      </button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialMode="signin" />
    </>
  );
}

// ---------------------------------------------------------------------------
// MockSignUpButton
// ---------------------------------------------------------------------------

function MockSignUpButton({ children, className }: { children?: ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
        type="button"
      >
        {children ?? (
          <span className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-97">
            <UserPlus className="size-4" />
            Sign Up
          </span>
        )}
      </button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialMode="signup" />
    </>
  );
}

// ---------------------------------------------------------------------------
// MockUserButton (custom dropdown with avatar)
// ---------------------------------------------------------------------------

function MockUserButton({ showName = false, className }: { showName?: boolean; className?: string }) {
  const { isSignedIn, user } = useUser();
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    throw new Error('UserButton must be used within an <AuthProvider>');
  }

  if (!isSignedIn || !user) {
    return null;
  }

  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() ||
    'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`group flex items-center gap-2.5 rounded-full p-1 transition-all hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${className ?? ''}`}
          type="button"
        >
          <Avatar className="size-9 ring-2 ring-white/8 transition-all group-hover:ring-brand/40">
            <AvatarImage
              src={user.imageUrl}
              alt={user.fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-brand/20 text-xs font-semibold text-brand">
              {initials}
            </AvatarFallback>
          </Avatar>
          {showName && (
            <span className="hidden text-sm font-medium text-white/70 sm:block">
              {user.firstName}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl border-white/8 bg-[#0B0F1A]/95 backdrop-blur-xl shadow-2xl shadow-black/50"
      >
        {/* User info header */}
        <div className="flex items-center gap-3 p-3">
          <Avatar className="size-10 ring-2 ring-brand/20">
            <AvatarImage
              src={user.imageUrl}
              alt={user.fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-brand/20 text-sm font-semibold text-brand">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-white/40">
              {user.primaryEmailAddress}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-white/6" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-white/60 focus:bg-white/4 focus:text-white/80"
          >
            <UserIcon className="size-4" />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/6" />

        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-400/70 focus:bg-red-500/10 focus:text-red-400"
          onClick={() => {
            authCtx.signOut();
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// SignInButton (exported) — Routes to Clerk or mock based on configuration
// ---------------------------------------------------------------------------

interface SignInButtonProps {
  mode?: 'modal' | 'redirect';
  children?: ReactNode;
  className?: string;
}

export function SignInButton({ mode = 'modal', children, className }: SignInButtonProps) {
  void mode;

  if (CLERK_AVAILABLE) {
    return <ClerkSignInButtonWrapper>{children}</ClerkSignInButtonWrapper>;
  }

  return <MockSignInButton className={className}>{children}</MockSignInButton>;
}

// ---------------------------------------------------------------------------
// SignUpButton (exported)
// ---------------------------------------------------------------------------

interface SignUpButtonProps {
  children?: ReactNode;
  className?: string;
}

export function SignUpButton({ children, className }: SignUpButtonProps) {
  if (CLERK_AVAILABLE) {
    return <ClerkSignUpButtonWrapper>{children}</ClerkSignUpButtonWrapper>;
  }

  return <MockSignUpButton className={className}>{children}</MockSignUpButton>;
}

// ---------------------------------------------------------------------------
// UserButton (exported)
// ---------------------------------------------------------------------------

interface UserButtonProps {
  afterSignOutUrl?: string;
  showName?: boolean;
  className?: string;
}

export function UserButton({ afterSignOutUrl, showName = false, className }: UserButtonProps) {
  void afterSignOutUrl;

  if (CLERK_AVAILABLE) {
    return <ClerkUserButtonWrapper showName={showName} />;
  }

  return <MockUserButton showName={showName} className={className} />;
}

// ---------------------------------------------------------------------------
// AuthGate - Shows sign-in prompt when not authenticated
// ---------------------------------------------------------------------------

interface AuthGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGate({ children, fallback }: AuthGateProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <motion.div
          className="size-8 rounded-full border-2 border-white/20 border-t-brand"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: [0, 0, 1, 1] as const }}
        />
      </div>
    );
  }

  if (!isSignedIn) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// Re-export types
// ---------------------------------------------------------------------------

export type { AuthUser, AuthContextValue };

