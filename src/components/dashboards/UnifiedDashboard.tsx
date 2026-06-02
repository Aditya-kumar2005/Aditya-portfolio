'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  CheckCircle2,
  Circle,
  ExternalLink,
  Search,
  RefreshCw,
  LogOut,
  Eye,
  Users,
  Loader2,
  Cpu,
  Rocket,
  CreditCard,
  FileText,
  Bot,
  Sparkles,
  Upload,
  File,
  MessageSquare,
  Send,
  ShieldCheck,
  Star,
  Package,
  DollarSign,
  Calendar,
  Folder,
  X,
  Download,
  Briefcase,
  Globe,
  Zap,
  Wifi,
  WifiOff,
  LayoutDashboard,
  Inbox,
  FolderLock,
  Phone,
  Activity,
} from 'lucide-react';
import { useAuth, useUser } from '@/lib/auth';
import BrandLogo from '@/components/BrandLogo';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UnifiedDashboardProps {
  onBack: () => void;
}

type DashboardTab = 'overview' | 'inquiries' | 'project' | 'payments' | 'nexus' | 'assets' | 'hotline';

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
}

interface Stats {
  totalInquiries: number;
  statusCounts: Record<string, number>;
  source: string;
}

type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';

interface Milestone {
  title: string;
  status: MilestoneStatus;
  description: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
  description: string;
  items: { name: string; qty: number; rate: string; total: string }[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'aditya';
  text: string;
  time: string;
}

// ---------------------------------------------------------------------------
// Constants — Demo Data
// ---------------------------------------------------------------------------

const MILESTONES: Milestone[] = [
  { title: 'System Architecture', status: 'COMPLETED', description: 'Core infrastructure and database design finalized' },
  { title: 'Client Onboarding', status: 'IN_PROGRESS', description: 'Custom onboarding flows and auth integration' },
  { title: 'AI Multi-Agent Brain', status: 'PENDING', description: 'Multi-agent orchestration and RAG pipeline' },
  { title: 'UAT & Mainnet Launch', status: 'PENDING', description: 'User acceptance testing and production deployment' },
];

const INVOICES: Invoice[] = [
  {
    id: 'INV-2024-001', date: '2024-12-15', amount: '₹1,50,000', status: 'Paid', description: 'MVP Setup — Phase 1',
    items: [
      { name: 'System Architecture Design', qty: 1, rate: '₹50,000', total: '₹50,000' },
      { name: 'Core Backend Development', qty: 1, rate: '₹60,000', total: '₹60,000' },
      { name: 'Database & Auth Setup', qty: 1, rate: '₹40,000', total: '₹40,000' },
    ],
  },
  {
    id: 'INV-2024-002', date: '2025-01-10', amount: '₹2,50,000', status: 'Paid', description: 'Monthly Retainer — January',
    items: [
      { name: 'AI Agent Development', qty: 1, rate: '₹1,20,000', total: '₹1,20,000' },
      { name: 'Frontend Development', qty: 1, rate: '₹80,000', total: '₹80,000' },
      { name: 'DevOps & Monitoring', qty: 1, rate: '₹50,000', total: '₹50,000' },
    ],
  },
  {
    id: 'INV-2024-003', date: '2025-02-10', amount: '₹2,50,000', status: 'Pending', description: 'Monthly Retainer — February',
    items: [
      { name: 'Multi-Agent Orchestration', qty: 1, rate: '₹1,00,000', total: '₹1,00,000' },
      { name: 'UAT Preparation', qty: 1, rate: '₹90,000', total: '₹90,000' },
      { name: 'Performance Optimization', qty: 1, rate: '₹60,000', total: '₹60,000' },
    ],
  },
  {
    id: 'INV-2024-004', date: '2025-03-10', amount: '₹90,000', status: 'Upcoming', description: 'UI/UX Audit — Pre-launch',
    items: [
      { name: 'Heuristic Evaluation', qty: 1, rate: '₹30,000', total: '₹30,000' },
      { name: 'A/B Testing Framework', qty: 1, rate: '₹35,000', total: '₹35,000' },
      { name: 'Accessibility Compliance', qty: 1, rate: '₹25,000', total: '₹25,000' },
    ],
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: '1', sender: 'aditya',
    text: "Hey! 👋 Welcome to your direct hotline. I'm Aditya Kumar, founder of Aditya Labs. Feel free to reach out anytime about your project, timeline, or anything else. I typically respond within a few hours during business hours (IST).",
    time: '10:00 AM',
  },
];

const AUTO_REPLIES = [
  "Thanks for reaching out! I'll review this and get back to you shortly. In the meantime, you can check the Project Hub for the latest status updates.",
  "Great question! Let me discuss this with the engineering team and get you a detailed answer. I'll update you by end of day.",
  "Noted! I've added this to our next sprint planning. You'll see updates in the milestone tracker soon.",
  "Absolutely, let's schedule a call to discuss this in depth. I'll send you a calendar invite for this week.",
  "I appreciate the feedback! We're constantly working to improve. I'll make sure the team addresses this in our next iteration.",
];

const RECENT_ACTIVITY = [
  { id: '1', icon: <CheckCircle className="size-4 text-emerald-400" />, text: 'System Architecture milestone completed', time: '2 days ago' },
  { id: '2', icon: <Clock className="size-4 text-brand" />, text: 'Client Onboarding sprint started', time: '1 day ago' },
  { id: '3', icon: <CreditCard className="size-4 text-amber-400" />, text: 'Invoice INV-2024-002 payment received', time: '5 hours ago' },
  { id: '4', icon: <Users className="size-4 text-brand-accent" />, text: 'New inquiry from CyberMed AI', time: '3 hours ago' },
  { id: '5', icon: <Upload className="size-4 text-purple-400" />, text: 'Brand guidelines uploaded to Asset Locker', time: '1 hour ago' },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

// ---------------------------------------------------------------------------
// Nav Items
// ---------------------------------------------------------------------------

const NAV_ITEMS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="size-4" /> },
  { id: 'inquiries', label: 'Inquiries', icon: <Inbox className="size-4" /> },
  { id: 'project', label: 'Project Hub', icon: <Briefcase className="size-4" /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard className="size-4" /> },
  { id: 'nexus', label: 'Nexus AI', icon: <Sparkles className="size-4" /> },
  { id: 'assets', label: 'Assets', icon: <FolderLock className="size-4" /> },
  { id: 'hotline', label: 'Hotline', icon: <Phone className="size-4" /> },
];

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: InquiryStatus }) {
  const config: Record<InquiryStatus, { label: string; className: string }> = {
    PENDING: { label: 'PENDING', className: 'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20' },
    REVIEWED: { label: 'REVIEWED', className: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20' },
    REPLIED: { label: 'REPLIED', className: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20' },
    ARCHIVED: { label: 'ARCHIVED', className: 'bg-white/5 text-white/40 ring-1 ring-white/10' },
  };
  const { label, className } = config[status] || config.PENDING;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stats Card
// ---------------------------------------------------------------------------

function StatsCard({ title, value, icon, colorClass, delay }: {
  title: string; value: number | string; icon: React.ReactNode; colorClass: string; delay: number;
}) {
  return (
    <motion.div className="bento-card rounded-2xl! p-5!" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">{title}</p>
          <p className="heading-display mt-2 text-3xl text-white">{value}</p>
        </div>
        <div className={`flex size-10 items-center justify-center rounded-xl ${colorClass}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function UnifiedDashboard({ onBack }: UnifiedDashboardProps) {
  const { signOut } = useAuth();
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTabBarVisible] = useState(true);

  // Inquiry state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'REPLIED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dataSource, setDataSource] = useState<string>('');

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [inquiriesRes, statsRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/stats'),
      ]);

      if (inquiriesRes.ok) {
        const inqData = await inquiriesRes.json();
        setInquiries(inqData.inquiries || []);
        setDataSource(inqData.source || 'UNKNOWN');
      } else {
        // API requires auth — use demo data
        setInquiries(DEMO_INQUIRIES);
        setDataSource('DEMO');
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        setStats({
          totalInquiries: DEMO_INQUIRIES.length,
          statusCounts: {
            PENDING: DEMO_INQUIRIES.filter((i) => i.status === 'PENDING').length,
            REVIEWED: DEMO_INQUIRIES.filter((i) => i.status === 'REVIEWED').length,
            REPLIED: DEMO_INQUIRIES.filter((i) => i.status === 'REPLIED').length,
            ARCHIVED: DEMO_INQUIRIES.filter((i) => i.status === 'ARCHIVED').length,
          },
          source: 'DEMO',
        });
      }
    } catch {
      setInquiries(DEMO_INQUIRIES);
      setDataSource('DEMO');
      setStats({
        totalInquiries: DEMO_INQUIRIES.length,
        statusCounts: {
          PENDING: DEMO_INQUIRIES.filter((i) => i.status === 'PENDING').length,
          REVIEWED: DEMO_INQUIRIES.filter((i) => i.status === 'REVIEWED').length,
          REPLIED: DEMO_INQUIRIES.filter((i) => i.status === 'REPLIED').length,
          ARCHIVED: DEMO_INQUIRIES.filter((i) => i.status === 'ARCHIVED').length,
        },
        source: 'DEMO',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleStatus = async (id: string, currentStatus: InquiryStatus) => {
    const statusOrder: InquiryStatus[] = ['PENDING', 'REPLIED', 'ARCHIVED'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

    setInquiries((prev) => prev.map((inq) => inq.id === id ? { ...inq, status: nextStatus } : inq));

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch {
      setInquiries((prev) => prev.map((inq) => inq.id === id ? { ...inq, status: currentStatus } : inq));
    }
  };

  const handleSignOut = () => {
    signOut();
    onBack();
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const userName = user?.firstName || user?.fullName?.split(' ')[0] || 'there';
  const isOnline = dataSource === 'DATABASE';

  const pendingCount = stats?.statusCounts?.PENDING ?? inquiries.filter((i) => i.status === 'PENDING').length;
  const repliedCount = stats?.statusCounts?.REPLIED ?? inquiries.filter((i) => i.status === 'REPLIED').length;
  const totalInquiries = stats?.totalInquiries ?? inquiries.length;

  return (
    <div className="flex min-h-screen bg-dark">
      {/* ── Left Sidebar (Desktop) ── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/6 bg-surface lg:flex">
        <div className="border-b border-white/6 p-6">
          <BrandLogo size="sm" showSubtitle={false} />
        </div>
        <nav className="flex-1 space-y-1 p-4 scrollbar-thin overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
        <div className="border-t border-white/6 p-4 space-y-2">
          <button
            onClick={onBack}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-white/4 hover:text-white/60"
            type="button"
          >
            <ArrowLeft className="size-4" />
            Back to Site
          </button>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-red-500/10 hover:text-red-400"
            type="button"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/6 bg-surface/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <BrandLogo size="sm" showSubtitle={false} />
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchData()}
            disabled={isLoading}
            className="rounded-lg p-2 text-white/40 hover:bg-white/4 hover:text-white/70"
            type="button"
          >
            <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/4 hover:text-white/80"
            type="button"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Cpu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 border-l border-white/6 bg-surface p-6"
              initial={{ x: 288 }}
              animate={{ x: 0 }}
              exit={{ x: 288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <BrandLogo size="sm" showSubtitle={false} />
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/40 hover:text-white/70" type="button">
                  <X className="size-5" />
                </button>
              </div>
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/3 p-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
                  <span className="text-xs font-bold text-brand">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{user?.fullName || userName}</p>
                  <p className="truncate text-xs text-white/30">{user?.primaryEmailAddress || ''}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
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
              <div className="mt-6 border-t border-white/6 pt-4 space-y-2">
                <button onClick={onBack} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-white/4 hover:text-white/60" type="button">
                  <ArrowLeft className="size-4" /> Back to Site
                </button>
                <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30 transition-all hover:bg-red-500/10 hover:text-red-400" type="button">
                  <LogOut className="size-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ── */}
      <main className="flex flex-1 flex-col pt-16 lg:pt-0 pb-16 lg:pb-0">
        {/* Header Bar */}
        <header className="flex items-center justify-between border-b border-white/6 px-6 py-4 lg:px-8">
          <div>
            <h1 className="heading-display text-xl text-white">
              <span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="mt-0.5 text-xs text-white/30">
              {greeting}, <span className="text-white/60">{userName}</span> — Welcome to your command center
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="hidden rounded-xl border border-white/8 bg-white/3 p-2.5 text-white/40 transition-all hover:border-white/15 hover:bg-white/6 hover:text-white/70 disabled:opacity-50 lg:flex"
              type="button"
              title="Refresh data"
            >
              <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex size-9 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
                <span className="text-xs font-bold text-brand">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{user?.fullName || userName}</p>
                <p className="text-[10px] text-white/30">{user?.primaryEmailAddress || ''}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8 scrollbar-thin">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewTab key="overview" totalInquiries={totalInquiries} pendingCount={pendingCount} repliedCount={repliedCount} onNavigate={setActiveTab} />
            )}
            {activeTab === 'inquiries' && (
              <InquiriesTab key="inquiries" inquiries={inquiries} onToggleStatus={handleToggleStatus} filter={filter} searchQuery={searchQuery} onFilterChange={setFilter} onSearchChange={setSearchQuery} />
            )}
            {activeTab === 'project' && (
              <ProjectHubTab key="project" userName={userName} />
            )}
            {activeTab === 'payments' && (
              <PaymentsTab key="payments" />
            )}
            {activeTab === 'nexus' && (
              <NexusBuilderTab key="nexus" />
            )}
            {activeTab === 'assets' && (
              <AssetLockerTab key="assets" />
            )}
            {activeTab === 'hotline' && (
              <HotlineTab key="hotline" userName={userName} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer — System Status */}
        <footer className="hidden border-t border-white/6 px-6 py-3 lg:block lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="size-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">Connected to Database</span>
                </>
              ) : (
                <>
                  <WifiOff className="size-3.5 text-white/30" />
                  <span className="text-xs font-medium text-white/30">{dataSource === 'DEMO' ? 'Demo Mode' : 'Offline Mode'}</span>
                </>
              )}
            </div>
            <span className="text-[10px] text-white/20">Aditya Labs Dashboard v2.0</span>
          </div>
        </footer>
      </main>

      {/* ── Mobile Bottom Tab Bar ── */}
      {mobileTabBarVisible && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/6 bg-surface/90 backdrop-blur-xl px-1 py-1.5 lg:hidden safe-area-bottom">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all min-w-0 flex-1 ${
                  isActive ? 'text-brand' : 'text-white/30'
                }`}
                type="button"
              >
                <div className={`flex size-7 items-center justify-center rounded-lg transition-all ${isActive ? 'bg-brand/10' : ''}`}>
                  {item.icon}
                </div>
                <span className="truncate w-full text-center">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo Inquiries
// ---------------------------------------------------------------------------

const DEMO_INQUIRIES: Inquiry[] = [
  { id: 'demo-1', name: 'Rahul Verma', email: 'rahul@techstart.io', service: 'SaaS Platform', message: 'Looking for a full-stack SaaS development partner', status: 'PENDING', createdAt: '2025-03-01T10:00:00Z', updatedAt: '2025-03-01T10:00:00Z' },
  { id: 'demo-2', name: 'Priya Sharma', email: 'priya@cybermed.ai', service: 'AI Solutions', message: 'Need AI integration for our diagnostics platform', status: 'REPLIED', createdAt: '2025-02-25T14:30:00Z', updatedAt: '2025-02-26T09:00:00Z' },
  { id: 'demo-3', name: 'Arjun Patel', email: 'arjun@fintech.co', service: 'Product Engineering', message: 'Building a fintech MVP with real-time payments', status: 'PENDING', createdAt: '2025-02-28T08:15:00Z', updatedAt: '2025-02-28T08:15:00Z' },
  { id: 'demo-4', name: 'Sarah Chen', email: 'sarah@edtech.dev', service: 'SaaS Platform', message: 'EdTech platform with adaptive learning algorithms', status: 'REVIEWED', createdAt: '2025-02-20T16:45:00Z', updatedAt: '2025-02-21T11:00:00Z' },
  { id: 'demo-5', name: 'Vikram Singh', email: 'vikram@logpro.com', service: 'AI Solutions', message: 'Supply chain optimization with ML predictions', status: 'REPLIED', createdAt: '2025-02-15T12:00:00Z', updatedAt: '2025-02-16T10:30:00Z' },
  { id: 'demo-6', name: 'Nina Kowalski', email: 'nina@hrflow.io', service: 'Product Engineering', message: 'HR automation platform with AI screening', status: 'PENDING', createdAt: '2025-03-02T09:00:00Z', updatedAt: '2025-03-02T09:00:00Z' },
];

// ===========================================================================
// TAB 1: Overview
// ===========================================================================

function OverviewTab({ totalInquiries, pendingCount, repliedCount, onNavigate }: {
  totalInquiries: number; pendingCount: number; repliedCount: number; onNavigate: (tab: DashboardTab) => void;
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Inquiries" value={totalInquiries} icon={<TrendingUp className="size-5 text-brand" />} colorClass="bg-brand/10 ring-1 ring-brand/20" delay={0.05} />
        <StatsCard title="Pending Review" value={pendingCount} icon={<Clock className="size-5 text-brand-accent" />} colorClass="bg-brand-accent/10 ring-1 ring-brand-accent/20" delay={0.1} />
        <StatsCard title="Deals Closed" value={repliedCount} icon={<CheckCircle className="size-5 text-emerald-400" />} colorClass="bg-emerald-500/10 ring-1 ring-emerald-500/20" delay={0.15} />
        <StatsCard title="Milestones Done" value="2/4" icon={<Activity className="size-5 text-amber-400" />} colorClass="bg-amber-500/10 ring-1 ring-amber-500/20" delay={0.2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div variants={staggerItem} className="lg:col-span-2 bento-card rounded-2xl!">
          <h2 className="heading-display text-lg text-white mb-4">Recent Activity</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/3"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 truncate">{item.text}</p>
                  <p className="text-[10px] text-white/30">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={staggerItem} className="space-y-4">
          <div className="bento-card rounded-2xl! p-5!">
            <h3 className="heading-display text-sm text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'View Inquiries', tab: 'inquiries' as DashboardTab, icon: <Inbox className="size-4 text-brand" /> },
                { label: 'Project Milestones', tab: 'project' as DashboardTab, icon: <Briefcase className="size-4 text-brand-accent" /> },
                { label: 'AI Blueprint', tab: 'nexus' as DashboardTab, icon: <Sparkles className="size-4 text-amber-400" /> },
                { label: 'Direct Hotline', tab: 'hotline' as DashboardTab, icon: <Phone className="size-4 text-emerald-400" /> },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => onNavigate(action.tab)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/4 bg-white/2 p-3 text-left text-sm text-white/60 transition-all hover:border-brand/20 hover:bg-brand/5 hover:text-white"
                  type="button"
                >
                  {action.icon}
                  {action.label}
                  <ArrowRight className="ml-auto size-3.5 text-white/20" />
                </button>
              ))}
            </div>
          </div>

          <div className="bento-card rounded-2xl! p-5!">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="size-5 text-brand" />
              <h3 className="font-semibold text-white text-sm">Launch Guarantee</h3>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              We guarantee your product goes live on schedule. If we miss the deadline, the next sprint is on us.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-emerald-400 font-medium">Guarantee Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ===========================================================================
// TAB 2: Inquiries
// ===========================================================================

function InquiriesTab({ inquiries, onToggleStatus, filter, searchQuery, onFilterChange, onSearchChange }: {
  inquiries: Inquiry[];
  onToggleStatus: (id: string, currentStatus: InquiryStatus) => void;
  filter: 'ALL' | 'PENDING' | 'REPLIED';
  searchQuery: string;
  onFilterChange: (f: 'ALL' | 'PENDING' | 'REPLIED') => void;
  onSearchChange: (q: string) => void;
}) {
  const filtered = inquiries.filter((inq) => {
    const matchesFilter = filter === 'ALL' || inq.status === filter;
    const matchesSearch = !searchQuery ||
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="bento-card rounded-2xl! overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/6 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="heading-display text-lg text-white">Inquiries</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <div className="flex gap-1">
              {(['ALL', 'PENDING', 'REPLIED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-brand/15 text-brand ring-1 ring-brand/25' : 'text-white/30 hover:bg-white/4 hover:text-white/60'
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
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">Founder / Company</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">Service Needs</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">Date</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-white/30">Status</th>
                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-white/30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-white/25">No inquiries found</td></tr>
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
                        <p className="text-sm font-medium text-white">{inq.name}</p>
                        <p className="text-xs text-white/30">{inq.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-lg bg-brand/10 px-2 py-1 text-xs font-medium text-brand ring-1 ring-brand/20">{inq.service}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white/50">{formatDate(inq.createdAt)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={inq.status} /></td>
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
                        <a href={`mailto:${inq.email}`} className="rounded-lg p-1.5 text-white/30 transition-all hover:bg-brand-accent/10 hover:text-brand-accent" title="Send email">
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
    </motion.div>
  );
}

// ===========================================================================
// TAB 3: Project Hub
// ===========================================================================

function ProjectHubTab({ userName }: { userName: string }) {
  const metrics = [
    { label: 'Project Velocity', value: '94%', icon: <TrendingUp className="size-5 text-brand" />, color: 'bg-brand/10', sub: 'On track' },
    { label: 'Deploy Status', value: 'UAT-Ready', icon: <Rocket className="size-5 text-emerald-400" />, color: 'bg-emerald-500/10', sub: 'Staging live' },
    { label: 'Milestones Completed', value: '2/4', icon: <CheckCircle2 className="size-5 text-brand-accent" />, color: 'bg-brand-accent/10', sub: '50% done' },
    { label: 'Payment Pipeline', value: 'Up-to-Date', icon: <DollarSign className="size-5 text-amber-400" />, color: 'bg-amber-500/10', sub: 'No overdue' },
  ];

  const completedCount = MILESTONES.filter((m) => m.status === 'COMPLETED').length;
  const progressPct = (completedCount / MILESTONES.length) * 100;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <motion.div key={m.label} variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-xl ${m.color}`}>{m.icon}</div>
              <div>
                <p className="text-xs text-white/40">{m.label}</p>
                <p className="text-lg font-bold text-white">{m.value}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-white/30">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Milestone Tracker */}
        <motion.div variants={staggerItem} className="lg:col-span-2 bento-card">
          <h2 className="heading-display text-lg text-white">Milestone Tracker</h2>
          <p className="mt-1 text-sm text-white/40">Aditya Labs Project — Progress Overview</p>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-brand to-brand-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              // transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              transition={{ duration: 1, delay: 0.3, ease:[ 2,1, 0.36, 1] as const }}
            />
          </div>
          <div className="mt-6 space-y-0">
            {MILESTONES.map((milestone, i) => {
              const isCompleted = milestone.status === 'COMPLETED';
              const isInProgress = milestone.status === 'IN_PROGRESS';
              return (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="relative flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`flex size-8 items-center justify-center rounded-full border-2 ${
                      isCompleted ? 'border-emerald-400 bg-emerald-400/10'
                        : isInProgress ? 'border-brand bg-brand/10'
                        : 'border-white/10 bg-white/3'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="size-4 text-emerald-400" />
                        : isInProgress ? <Clock className="size-4 text-brand" />
                        : <Circle className="size-4 text-white/20" />}
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-10 ${isCompleted ? 'bg-emerald-400/30' : 'bg-white/6'}`} />
                    )}
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${isCompleted || isInProgress ? 'text-white' : 'text-white/40'}`}>{milestone.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isCompleted ? 'bg-emerald-500/10 text-emerald-400'
                          : isInProgress ? 'bg-brand/10 text-brand'
                          : 'bg-white/5 text-white/30'
                      }`}>
                        {milestone.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/30">{milestone.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Side Cards */}
        <div className="space-y-4">
          <motion.div variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="size-5 text-brand" />
              <h3 className="font-semibold text-white text-sm">Launch Guarantee</h3>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              We guarantee your product goes live on schedule. If we miss the deadline, the next sprint is on us. That&apos;s the Aditya Labs commitment.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-emerald-400 font-medium">Guarantee Active</span>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-2 mb-3">
              <Star className="size-5 text-amber-400" />
              <h3 className="font-semibold text-white text-sm">Aditya Labs Rating</h3>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Every line of code is reviewed, every design is pixel-perfect, and every deployment is battle-tested. We don&apos;t ship bugs — we ship experiences.
            </p>
            <div className="mt-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-xs text-white/30">5.0 Client Rating</span>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-2 mb-3">
              <Users className="size-5 text-brand-accent" />
              <h3 className="font-semibold text-white text-sm">Team Assigned</h3>
            </div>
            <div className="flex -space-x-2">
              {['A', 'K', 'R', 'S', '+2'].map((initial, i) => (
                <div key={i} className="flex size-8 items-center justify-center rounded-full border-2 border-surface bg-brand/20 text-xs font-bold text-brand">
                  {initial}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/30">6 engineers on your project</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ===========================================================================
// TAB 4: Payments
// ===========================================================================

function PaymentsTab() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutDone, setCheckoutDone] = useState<string | null>(null);

  const paymentOptions = [
    { id: 'mvp', title: 'MVP Setup', price: '₹1,50,000', description: 'Complete MVP development with core features, auth, and deployment', icon: <Zap className="size-5 text-brand" />, color: 'bg-brand/10' },
    { id: 'retainer', title: 'Monthly Retainer', price: '₹2,50,000', description: 'Ongoing development, maintenance, and priority support', icon: <Package className="size-5 text-brand-accent" />, color: 'bg-brand-accent/10' },
    { id: 'audit', title: 'UI/UX Audit', price: '₹90,000', description: 'Comprehensive UX review, heuristic evaluation, and redesign', icon: <Eye className="size-5 text-emerald-400" />, color: 'bg-emerald-500/10' },
  ];

  const handleCheckout = (id: string) => {
    setCheckoutLoading(id);
    setTimeout(() => {
      setCheckoutLoading(null);
      setCheckoutDone(id);
      setTimeout(() => setCheckoutDone(null), 3000);
    }, 2000);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {paymentOptions.map((opt) => (
          <motion.div key={opt.id} variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex size-10 items-center justify-center rounded-xl ${opt.color}`}>{opt.icon}</div>
              <div>
                <h3 className="font-semibold text-white text-sm">{opt.title}</h3>
                <p className="text-lg font-bold text-white">{opt.price}</p>
              </div>
            </div>
            <p className="text-xs text-white/40 mb-4">{opt.description}</p>
            <button
              onClick={() => handleCheckout(opt.id)}
              disabled={checkoutLoading === opt.id}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {checkoutLoading === opt.id ? (
                <><Loader2 className="size-4 animate-spin" /> Processing...</>
              ) : checkoutDone === opt.id ? (
                <><CheckCircle2 className="size-4" /> Payment Simulated!</>
              ) : (
                <><CreditCard className="size-4" /> Checkout via Razorpay</>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Invoice History */}
        <motion.div variants={staggerItem} className="lg:col-span-3 bento-card">
          <h2 className="heading-display text-lg text-white mb-4">Invoice History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Invoice</th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Date</th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Amount</th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Status</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className={`cursor-pointer border-b border-white/3 transition-colors hover:bg-white/3 ${selectedInvoice?.id === inv.id ? 'bg-brand/5' : ''}`}
                  >
                    <td className="py-3 text-sm font-medium text-white">{inv.id}</td>
                    <td className="py-3 text-sm text-white/50">{inv.date}</td>
                    <td className="py-3 text-sm font-semibold text-white">{inv.amount}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400'
                          : inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-white/5 text-white/40'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Receipt Panel */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedInvoice ? (
              <motion.div
                key={selectedInvoice.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bento-card p-5!"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Receipt</h3>
                  <button onClick={() => setSelectedInvoice(null)} className="text-white/30 hover:text-white" type="button">
                    <X className="size-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Invoice</span>
                    <span className="text-white font-mono">{selectedInvoice.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Date</span>
                    <span className="text-white">{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Status</span>
                    <span className={`font-semibold ${
                      selectedInvoice.status === 'Paid' ? 'text-emerald-400'
                        : selectedInvoice.status === 'Pending' ? 'text-amber-400'
                        : 'text-white/40'
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                  <div className="border-t border-white/6 pt-3 mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Line Items</p>
                    {selectedInvoice.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm py-1">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-white font-mono">{item.total}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/6 pt-3 flex justify-between">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-bold text-brand">{selectedInvoice.amount}</span>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2 text-sm text-white/60 transition-all hover:bg-white/6 hover:text-white mt-2" type="button">
                    <Download className="size-4" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bento-card p-5! flex flex-col items-center justify-center text-center min-h-50">
                <FileText className="size-8 text-white/10 mb-2" />
                <p className="text-sm text-white/30">Select an invoice to view receipt</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ===========================================================================
// TAB 5: Nexus AI Builder
// ===========================================================================

function NexusBuilderTab() {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStep, setAgentStep] = useState(-1);
  const [proposal, setProposal] = useState<null | {
    architecture: string; aiAgents: string; scope: string; pricing: string; timescale: string;
  }>(null);

  const agents = [
    { name: 'AI Concierge Agent', code: 'Nexus-1', icon: <Bot className="size-5 text-brand" />, description: 'Analyzing your SaaS idea and market fit' },
    { name: 'Technical Architect Agent', code: 'Nexus-2', icon: <Cpu className="size-5 text-brand-accent" />, description: 'Designing system architecture and tech stack' },
    { name: 'Proposal Constructor Agent', code: 'Nexus-3', icon: <Sparkles className="size-5 text-amber-400" />, description: 'Compiling proposal with scope and deliverables' },
    { name: 'Budget & Costing Node', code: 'Nexus-4', icon: <DollarSign className="size-5 text-emerald-400" />, description: 'Calculating costs, timeline, and ROI projections' },
  ];

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    setAgentStep(0);
    setProposal(null);

    const stepDelays = [1500, 1500, 2000, 1500];
    for (let i = 0; i < agents.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDelays[i]));
      setAgentStep(i + 1);
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Generate a SaaS blueprint for this idea: "${idea}". Include architecture approach, AI agent capabilities, project scope, pricing estimate, and timescale. Be concise and structured.` }],
        }),
      });
      const data = await res.json();
      const aiText = data.message || '';

      setProposal({
        architecture: extractSection(aiText, 'architecture') || 'Microservices with Next.js 16 frontend, Node.js API layer, PostgreSQL with Prisma ORM, Redis caching, and Kubernetes deployment',
        aiAgents: extractSection(aiText, 'ai') || 'RAG-powered chatbot, intelligent document processor, predictive analytics engine, automated workflow orchestrator',
        scope: extractSection(aiText, 'scope') || 'Core platform with auth, dashboard, analytics, billing, and admin panel. Phase 2: API marketplace and integrations.',
        pricing: extractSection(aiText, 'pricing') || '₹4,50,000 for MVP (8-10 weeks). Monthly retainer ₹2,50,000 for ongoing development and scaling.',
        timescale: extractSection(aiText, 'timescale') || '8-10 weeks to MVP, 4-6 weeks for beta, 2-4 weeks for production launch.',
      });
    } catch {
      setProposal({
        architecture: 'Microservices with Next.js 16 frontend, Node.js API layer, PostgreSQL with Prisma ORM, Redis caching, and Kubernetes deployment',
        aiAgents: 'RAG-powered chatbot, intelligent document processor, predictive analytics engine, automated workflow orchestrator',
        scope: 'Core platform with auth, dashboard, analytics, billing, and admin panel. Phase 2: API marketplace and integrations.',
        pricing: '₹4,50,000 for MVP (8-10 weeks). Monthly retainer ₹2,50,000 for ongoing development and scaling.',
        timescale: '8-10 weeks to MVP, 4-6 weeks for beta, 2-4 weeks for production launch.',
      });
    }

    setIsGenerating(false);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem} className="bento-card">
        <h2 className="heading-display text-lg text-white">Nexus AI Builder</h2>
        <p className="mt-1 text-sm text-white/40">Describe your SaaS idea and our AI agents will generate a complete blueprint</p>
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. AI-powered CRM for logistics companies with real-time tracking"
            className="flex-1 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || isGenerating}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed"
            type="button"
          >
            {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Generate Blueprint
          </button>
        </div>
      </motion.div>

      {/* Agent Progression */}
      {(isGenerating || agentStep > 0) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => {
            const isActive = agentStep === i;
            const isDone = agentStep > i;
            return (
              <motion.div
                key={agent.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isDone || isActive ? 1 : 0.3, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`bento-card p-4! ${isActive ? 'border-brand/40 shadow-lg shadow-brand/10' : isDone ? 'border-emerald-500/20' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {agent.icon}
                  <span className="text-[10px] font-mono text-white/30">{agent.code}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                <p className="mt-1 text-xs text-white/30">{agent.description}</p>
                <div className="mt-2">
                  {isDone ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle2 className="size-3" /> Complete</span>
                  ) : isActive ? (
                    <span className="flex items-center gap-1 text-xs text-brand"><Loader2 className="size-3 animate-spin" /> Processing...</span>
                  ) : (
                    <span className="text-xs text-white/20">Waiting...</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Proposal Card */}
      <AnimatePresence>
        {proposal && !isGenerating && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="bento-card border-brand/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10"><Sparkles className="size-5 text-brand" /></div>
              <div>
                <h2 className="heading-display text-lg text-white">Blueprint Generated</h2>
                <p className="text-xs text-white/40">Powered by Nexus AI Multi-Agent System</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Architecture', value: proposal.architecture, icon: <Globe className="size-4 text-brand" /> },
                { label: 'AI Agents', value: proposal.aiAgents, icon: <Bot className="size-4 text-brand-accent" /> },
                { label: 'Scope', value: proposal.scope, icon: <Package className="size-4 text-amber-400" /> },
                { label: 'Pricing', value: proposal.pricing, icon: <DollarSign className="size-4 text-emerald-400" /> },
              ].map((section) => (
                <div key={section.label} className="rounded-xl border border-white/6 bg-white/2 p-4">
                  <div className="flex items-center gap-2 mb-2">{section.icon}<span className="text-xs font-semibold uppercase tracking-wider text-white/40">{section.label}</span></div>
                  <p className="text-sm text-white/70 leading-relaxed">{section.value}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-xl border border-white/6 bg-white/2 p-4">
                <div className="flex items-center gap-2 mb-2"><Calendar className="size-4 text-brand" /><span className="text-xs font-semibold uppercase tracking-wider text-white/40">Timescale</span></div>
                <p className="text-sm text-white/70 leading-relaxed">{proposal.timescale}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function extractSection(text: string, keyword: string): string {
  const regex = new RegExp(`(?:${keyword})[^:]*[:\\-]\\s*(.+?)(?:\\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

// ===========================================================================
// TAB 6: Asset Locker
// ===========================================================================

function AssetLockerTab() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: '1', name: 'brand-guidelines.pdf', size: '2.4 MB', date: '2025-01-15', type: 'PDF' },
    { id: '2', name: 'ui-prototype-v2.fig', size: '18.7 MB', date: '2025-01-20', type: 'Figma' },
    { id: '3', name: 'api-docs-v3.md', size: '156 KB', date: '2025-02-01', type: 'Markdown' },
    { id: '4', name: 'architecture-diagram.png', size: '1.2 MB', date: '2025-02-10', type: 'Image' },
  ]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); simulateUpload(); };

  const simulateUpload = () => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: `upload-${Date.now().toString(36)}.dat`,
      size: `${(Math.random() * 10 + 0.5).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      type: 'File',
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const removeFile = (id: string) => { setFiles((prev) => prev.filter((f) => f.id !== id)); };

  const typeColors: Record<string, string> = {
    PDF: 'text-red-400 bg-red-500/10',
    Figma: 'text-purple-400 bg-purple-500/10',
    Markdown: 'text-blue-400 bg-blue-500/10',
    Image: 'text-emerald-400 bg-emerald-500/10',
    File: 'text-white/40 bg-white/5',
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bento-card flex flex-col items-center justify-center py-12 transition-all ${isDragOver ? 'border-brand/50 bg-brand/5' : ''}`}
        >
          <div className={`flex size-16 items-center justify-center rounded-2xl ${isDragOver ? 'bg-brand/20' : 'bg-white/5'} transition-colors`}>
            <Upload className={`size-7 ${isDragOver ? 'text-brand' : 'text-white/20'} transition-colors`} />
          </div>
          <p className="mt-4 font-semibold text-white">{isDragOver ? 'Drop files here' : 'Drag & drop files here'}</p>
          <p className="mt-1 text-sm text-white/30">or click to browse — any file type supported</p>
          <button onClick={simulateUpload} className="mt-4 flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#6D28D9]" type="button">
            <Upload className="size-4" />
            Upload File
          </button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="bento-card">
        <h2 className="heading-display text-lg text-white mb-4">Uploaded Assets</h2>
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Folder className="size-8 text-white/10 mb-2" />
            <p className="text-sm text-white/30">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 rounded-xl border border-white/4 bg-white/2 p-3 transition-colors hover:bg-white/4"
              >
                <div className={`flex size-9 items-center justify-center rounded-lg ${typeColors[file.type] || typeColors.File}`}>
                  <File className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/30">{file.size} · {file.date}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${typeColors[file.type] || typeColors.File}`}>{file.type}</span>
                <button onClick={() => removeFile(file.id)} className="shrink-0 text-white/20 hover:text-red-400 transition-colors" type="button">
                  <X className="size-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ===========================================================================
// TAB 7: Hotline (Direct Chat)
// ===========================================================================

function HotlineTab({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = AUTO_REPLIES[replyIndexRef.current % AUTO_REPLIES.length];
      replyIndexRef.current += 1;

      const adityaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'aditya',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, adityaMsg]);
    }, 1500 + Math.random() * 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
      <div className="bento-card flex flex-col" style={{ height: '70vh', minHeight: '500px' }}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-white/6 pb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10">
            <Users className="size-5 text-brand" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Aditya Kumar</h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-emerald-400">Online — Founder & Lead Engineer</span>
            </div>
          </div>
          <span className="text-xs text-white/20">Direct Hotline</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === 'user' ? 'bg-brand text-white rounded-br-md' : 'bg-white/5 text-white/80 rounded-bl-md'
              }`}>
                {msg.sender === 'aditya' && <p className="text-[10px] font-semibold text-brand mb-1">Aditya Kumar</p>}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`mt-1 text-[10px] ${msg.sender === 'user' ? 'text-white/40' : 'text-white/20'}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-[10px] font-semibold text-brand mb-1">Aditya Kumar</p>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-white/30 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="size-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/6 pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message Aditya as ${userName}...`}
            className="flex-1 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-white transition-all hover:bg-[#6D28D9] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

