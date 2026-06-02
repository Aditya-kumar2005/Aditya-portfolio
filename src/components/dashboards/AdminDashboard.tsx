'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  TrendingUp,
  Clock,
  CheckCircle,
  ExternalLink,
  Search,
  RefreshCw,
  LogOut,
  Eye,
  Users,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Wifi,
  WifiOff,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AdminDashboardProps {
  onBack: () => void;
}

type InquiryStatus = 'PENDING' | 'REVIEWED' | 'REPLIED' | 'ARCHIVED';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  _source?: string;
}

interface Stats {
  totalInquiries: number;
  statusCounts: Record<string, number>;
  source: string;
}

type NavTab = 'overview' | 'inquiries' | 'clients';

// ---------------------------------------------------------------------------
// Admin Auth (localStorage)
// ---------------------------------------------------------------------------

const ADMIN_CREDS_KEY = 'admin_portal_creds';

function getStoredCreds(): { email: string; password: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_CREDS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeCreds(email: string, password: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({ email, password }));
  } catch {
    // silent
  }
}

function clearCreds() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ADMIN_CREDS_KEY);
  } catch {
    // silent
  }
}

// ---------------------------------------------------------------------------
// Login Screen Component
// ---------------------------------------------------------------------------

function LoginScreen({
  onLogin,
  onBack,
}: {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('nanuadityakumar@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        headers: {
          'x-admin-email': email,
          'x-admin-password': password,
        },
      });

      if (res.ok) {
        storeCreds(email, password);
        onLogin(email, password);
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark">
      {/* Cosmic background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-100 w-100 rounded-full bg-brand-accent/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="grid-pattern pointer-events-none absolute inset-0" />

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="glass rounded-3xl p-8 md:p-10">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand/25 blur-[60px]" />

          {/* Icon */}
          <div className="relative mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20 shadow-lg shadow-brand/20">
            <Cpu className="size-7 text-brand" />
            <span className="absolute -top-0.5 -right-0.5">
              <span className="absolute inline-flex size-2 rounded-full bg-brand-accent opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
            </span>
          </div>

          {/* Title */}
          <h1 className="heading-display mb-1 text-center text-2xl text-white">
            Admin<span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">Portal</span>
          </h1>
          <p className="mb-8 text-center text-sm text-white/40">
            System Access Required
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-white/60"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-white/60"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                placeholder="Enter admin password"
                required
              />
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              {isLoading ? 'Connecting...' : 'Connect to Core System'}
            </button>
          </form>

          {/* Back link */}
          <button
            onClick={onBack}
            className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
            type="button"
          >
            <ArrowLeft className="size-3.5" />
            Back to site
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar Component
// ---------------------------------------------------------------------------

function Sidebar({
  activeTab,
  onTabChange,
  onSignOut,
}: {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onSignOut: () => void;
}) {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Eye className="size-4" /> },
    { id: 'inquiries', label: 'Inquiries', icon: <Search className="size-4" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="size-4" /> },
  ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/6 bg-surface lg:flex">
      {/* Logo */}
      <div className="border-b border-white/6 p-6">
        <BrandLogo size="sm" showSubtitle={false} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === item.id
                ? 'bg-brand/10 text-brand ring-1 ring-brand/20'
                : 'text-white/40 hover:bg-white/3 hover:text-white/70'
            }`}
            type="button"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-white/6 p-4">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-red-500/10 hover:text-red-400"
          type="button"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Stats Card Component
// ---------------------------------------------------------------------------

function StatsCard({
  title,
  value,
  icon,
  colorClass,
  delay,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  colorClass: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bento-card rounded-2xl! p-5!"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            {title}
          </p>
          <p className="heading-display mt-2 text-3xl text-white">{value}</p>
        </div>
        <div
          className={`flex size-10 items-center justify-center rounded-xl ${colorClass}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: InquiryStatus }) {
  const config: Record<InquiryStatus, { label: string; className: string }> = {
    PENDING: {
      label: 'PENDING',
      className: 'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20',
    },
    REVIEWED: {
      label: 'REVIEWED',
      className: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
    },
    REPLIED: {
      label: 'REPLIED',
      className: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
    },
    ARCHIVED: {
      label: 'ARCHIVED',
      className: 'bg-white/5 text-white/40 ring-1 ring-white/10',
    },
  };

  const { label, className } = config[status] || config.PENDING;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${className}`}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Inquiry Table Component
// ---------------------------------------------------------------------------

function InquiryTable({
  inquiries,
  onToggleStatus,
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: {
  inquiries: Inquiry[];
  onToggleStatus: (id: string, currentStatus: InquiryStatus) => void;
  filter: 'ALL' | 'PENDING' | 'REPLIED';
  searchQuery: string;
  onFilterChange: (f: 'ALL' | 'PENDING' | 'REPLIED') => void;
  onSearchChange: (q: string) => void;
}) {
  const filtered = inquiries.filter((inq) => {
    const matchesFilter =
      filter === 'ALL' || inq.status === filter;
    const matchesSearch =
      !searchQuery ||
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      className="bento-card rounded-2xl! overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/6 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="heading-display text-lg text-white">Inquiries</h3>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full rounded-xl border border-white/8 bg-white/3 py-2 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/20 sm:w-64"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-1">
            {(['ALL', 'PENDING', 'REPLIED'] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  filter === f
                    ? 'bg-brand/15 text-brand ring-1 ring-brand/25'
                    : 'text-white/30 hover:bg-white/4 hover:text-white/60'
                }`}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          <thead>
            <tr className="border-b border-white/6">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Founder / Company
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Service Needs
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Date
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Status
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-white/25"
                >
                  No inquiries found
                </td>
              </tr>
            ) : (
              filtered.map((inq, index) => (
                <motion.tr
                  key={inq.id}
                  className="border-b border-white/4 transition-colors hover:bg-white/2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {inq.name}
                      </p>
                      <p className="text-xs text-white/30">{inq.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-lg bg-brand/10 px-2 py-1 text-xs font-medium text-brand ring-1 ring-brand/20">
                      {inq.service}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-white/50">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleStatus(inq.id, inq.status)}
                        className="rounded-lg p-1.5 text-white/30 transition-all hover:bg-brand/10 hover:text-brand"
                        title="Toggle status"
                        type="button"
                      >
                        <CheckCircle className="size-4" />
                      </button>
                      <a
                        href={`mailto:${inq.email}`}
                        className="rounded-lg p-1.5 text-white/30 transition-all hover:bg-brand-accent/10 hover:text-brand-accent"
                        title="Send email"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main AdminDashboard Component
// ---------------------------------------------------------------------------

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  // Auth state
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'REPLIED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSource, setDataSource] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check localStorage for existing credentials on mount
  useEffect(() => {
    const stored = getStoredCreds();
    if (stored) {
      // Verify the stored creds are still valid
      fetch('/api/inquiries', {
        headers: {
          'x-admin-email': stored.email,
          'x-admin-password': stored.password,
        },
      })
        .then((res) => {
          if (res.ok) {
            setCreds(stored);
            setIsAuthorized(true);
          } else {
            clearCreds();
          }
        })
        .catch(() => {
          clearCreds();
        });
    }
  }, []);

  // Fetch data when authorized
  const fetchData = useCallback(async () => {
    if (!creds) return;
    setIsLoading(true);
    try {
      const headers: Record<string, string> = {
        'x-admin-email': creds.email,
        'x-admin-password': creds.password,
      };

      const [inquiriesRes, statsRes] = await Promise.all([
        fetch('/api/inquiries', { headers }),
        fetch('/api/stats', { headers }),
      ]);

      if (inquiriesRes.ok) {
        const inqData = await inquiriesRes.json();
        setInquiries(inqData.inquiries || []);
        setDataSource(inqData.source || 'UNKNOWN');
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch {
      // silent — will show offline indicator
    } finally {
      setIsLoading(false);
    }
  }, [creds]);

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized, fetchData]);

  // Handlers
  const handleLogin = (email: string, password: string) => {
    setCreds({ email, password });
    setIsAuthorized(true);
  };

  const handleSignOut = () => {
    clearCreds();
    setCreds(null);
    setIsAuthorized(false);
    setInquiries([]);
    setStats(null);
  };

  const handleToggleStatus = async (id: string, currentStatus: InquiryStatus) => {
    if (!creds) return;

    // Cycle through statuses: PENDING -> REPLIED -> ARCHIVED -> PENDING
    const statusOrder: InquiryStatus[] = ['PENDING', 'REPLIED', 'ARCHIVED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

    // Optimistic update
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status: nextStatus } : inq
      )
    );

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': creds.email,
          'x-admin-password': creds.password,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        // Revert on failure
        setInquiries((prev) =>
          prev.map((inq) =>
            inq.id === id ? { ...inq, status: currentStatus } : inq
          )
        );
      }
    } catch {
      // Revert on error
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id ? { ...inq, status: currentStatus } : inq
        )
      );
    }
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!isAuthorized) {
    return <LoginScreen onLogin={handleLogin} onBack={onBack} />;
  }

  const pendingCount = stats?.statusCounts?.PENDING ?? inquiries.filter((i) => i.status === 'PENDING').length;
  const repliedCount = stats?.statusCounts?.REPLIED ?? inquiries.filter((i) => i.status === 'REPLIED').length;
  const totalInquiries = stats?.totalInquiries ?? inquiries.length;

  const isOnline = dataSource === 'DATABASE';

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Sidebar — desktop */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
      />

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/6 bg-surface/90 p-4 backdrop-blur-xl lg:hidden">
        <BrandLogo size="sm" showSubtitle={false} />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-white/50 hover:bg-white/4 hover:text-white/80"
          type="button"
        >
          <Cpu className="size-5" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-64 border-l border-white/6 bg-surface p-6"
              initial={{ x: 256 }}
              animate={{ x: 0 }}
              exit={{ x: 256 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <BrandLogo size="sm" showSubtitle={false} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/40 hover:text-white/70"
                  type="button"
                >
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'overview' as NavTab, label: 'Overview', icon: <Eye className="size-4" /> },
                  { id: 'inquiries' as NavTab, label: 'Inquiries', icon: <Search className="size-4" /> },
                  { id: 'clients' as NavTab, label: 'Clients', icon: <Users className="size-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-brand/10 text-brand ring-1 ring-brand/20'
                        : 'text-white/40 hover:bg-white/3 hover:text-white/70'
                    }`}
                    type="button"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 border-t border-white/6 pt-4">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-red-500/10 hover:text-red-400"
                  type="button"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex flex-1 flex-col pt-16 lg:pt-0">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/6 px-6 py-4 lg:px-8">
          <div>
            <h1 className="heading-display text-xl text-white">
              Agency Dashboard
            </h1>
            <p className="mt-0.5 text-xs text-white/30">
              Manage your inquiries and system status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="rounded-xl border border-white/8 bg-white/3 p-2.5 text-white/40 transition-all hover:border-white/15 hover:bg-white/6 hover:text-white/70 disabled:opacity-50"
              type="button"
              title="Refresh data"
            >
              <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
              <span className="text-xs font-bold text-brand">A</span>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatsCard
              title="Total Inquiries"
              value={totalInquiries}
              icon={<TrendingUp className="size-5 text-brand" />}
              colorClass="bg-brand/10 ring-1 ring-brand/20"
              delay={0.05}
            />
            <StatsCard
              title="Pending Review"
              value={pendingCount}
              icon={<Clock className="size-5 text-brand-accent" />}
              colorClass="bg-brand-accent/10 ring-1 ring-brand-accent/20"
              delay={0.1}
            />
            <StatsCard
              title="Deals Closed"
              value={repliedCount}
              icon={<CheckCircle className="size-5 text-emerald-400" />}
              colorClass="bg-emerald-500/10 ring-1 ring-emerald-500/20"
              delay={0.15}
            />
          </div>

          {/* Inquiry Table */}
          <InquiryTable
            inquiries={inquiries}
            onToggleStatus={handleToggleStatus}
            filter={filter}
            searchQuery={searchQuery}
            onFilterChange={setFilter}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Footer — System Status */}
        <footer className="border-t border-white/6 px-6 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="size-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">
                    Connected to Database
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="size-3.5 text-white/30" />
                  <span className="text-xs font-medium text-white/30">
                    Offline Mode
                  </span>
                </>
              )}
            </div>
            <span className="text-[10px] text-white/20">
              Aditya Labs Admin v1.0
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

