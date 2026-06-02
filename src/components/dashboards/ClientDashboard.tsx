'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Zap,
  Cpu,
  Rocket,
  CheckCircle2,
  Circle,
  Clock,
  CreditCard,
  FileText,
  Bot,
  Sparkles,
  Upload,
  File,
  MessageSquare,
  Send,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Activity,
  Users,
  X,
  ChevronRight,
  Download,
  Eye,
  Briefcase,
  Globe,
  Lock,
  Star,
  Package,
  DollarSign,
  Calendar,
  Folder,
  Paperclip,
  Phone,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

// ─── Types ───────────────────────────────────────────────────────────────────

type EngagementTier = 'MVP_STARTER' | 'SAAS_PLATFORM' | 'MONTHLY_RETAINER';
type DashboardTab = 'project' | 'payments' | 'nexus' | 'assets' | 'hotline';
type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';

interface ClientProfile {
  companyName: string;
  projectName: string;
  founderName: string;
  contactEmail: string;
  tier: EngagementTier;
}

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

// ─── Constants ───────────────────────────────────────────────────────────────

const TIER_CONFIG: Record<EngagementTier, { label: string; price: string; color: string }> = {
  MVP_STARTER: { label: 'MVP Starter', price: '₹1.5L', color: 'text-emerald-400' },
  SAAS_PLATFORM: { label: 'Enterprise SaaS', price: '₹4.5L', color: 'text-brand' },
  MONTHLY_RETAINER: { label: 'AI Retainer', price: '₹2.5L/Mo', color: 'text-brand-accent' },
};

const DEMO_PROFILES: ClientProfile[] = [
  {
    companyName: 'Acme SaaS Co.',
    projectName: 'Acme Logistics CRM',
    founderName: 'John Acme',
    contactEmail: 'john@acmesaas.com',
    tier: 'SAAS_PLATFORM',
  },
  {
    companyName: 'CyberMed AI',
    projectName: 'Neural Diagnostics Hub',
    founderName: 'Dr. Priya Sharma',
    contactEmail: 'priya@cybermed.ai',
    tier: 'MONTHLY_RETAINER',
  },
];

const MILESTONES: Milestone[] = [
  {
    title: 'System Architecture',
    status: 'COMPLETED',
    description: 'Core infrastructure and database design finalized',
  },
  {
    title: 'Client Onboarding',
    status: 'IN_PROGRESS',
    description: 'Custom onboarding flows and auth integration',
  },
  {
    title: 'AI Multi-Agent Brain',
    status: 'PENDING',
    description: 'Multi-agent orchestration and RAG pipeline',
  },
  {
    title: 'UAT & Mainnet Launch',
    status: 'PENDING',
    description: 'User acceptance testing and production deployment',
  },
];

const INVOICES: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: '2024-12-15',
    amount: '₹1,50,000',
    status: 'Paid',
    description: 'MVP Setup — Phase 1',
    items: [
      { name: 'System Architecture Design', qty: 1, rate: '₹50,000', total: '₹50,000' },
      { name: 'Core Backend Development', qty: 1, rate: '₹60,000', total: '₹60,000' },
      { name: 'Database & Auth Setup', qty: 1, rate: '₹40,000', total: '₹40,000' },
    ],
  },
  {
    id: 'INV-2024-002',
    date: '2025-01-10',
    amount: '₹2,50,000',
    status: 'Paid',
    description: 'Monthly Retainer — January',
    items: [
      { name: 'AI Agent Development', qty: 1, rate: '₹1,20,000', total: '₹1,20,000' },
      { name: 'Frontend Development', qty: 1, rate: '₹80,000', total: '₹80,000' },
      { name: 'DevOps & Monitoring', qty: 1, rate: '₹50,000', total: '₹50,000' },
    ],
  },
  {
    id: 'INV-2024-003',
    date: '2025-02-10',
    amount: '₹2,50,000',
    status: 'Pending',
    description: 'Monthly Retainer — February',
    items: [
      { name: 'Multi-Agent Orchestration', qty: 1, rate: '₹1,00,000', total: '₹1,00,000' },
      { name: 'UAT Preparation', qty: 1, rate: '₹90,000', total: '₹90,000' },
      { name: 'Performance Optimization', qty: 1, rate: '₹60,000', total: '₹60,000' },
    ],
  },
  {
    id: 'INV-2024-004',
    date: '2025-03-10',
    amount: '₹90,000',
    status: 'Upcoming',
    description: 'UI/UX Audit — Pre-launch',
    items: [
      { name: 'Heuristic Evaluation', qty: 1, rate: '₹30,000', total: '₹30,000' },
      { name: 'A/B Testing Framework', qty: 1, rate: '₹35,000', total: '₹35,000' },
      { name: 'Accessibility Compliance', qty: 1, rate: '₹25,000', total: '₹25,000' },
    ],
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: '1',
    sender: 'aditya',
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

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Main Component ─────────────────────────────────────────────────────────

interface ClientDashboardProps {
  onBack: () => void;
}

export default function ClientDashboard({ onBack }: ClientDashboardProps) {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('project');

  // Load profile from localStorage on mount (SSR-safe: always start null, hydrate from client)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('clientProfile');
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading initial state from localStorage on mount is a valid pattern
        setProfile(JSON.parse(saved));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const saveProfile = useCallback((p: ClientProfile) => {
    localStorage.setItem('clientProfile', JSON.stringify(p));
    setProfile(p);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('clientProfile');
    setProfile(null);
    setActiveTab('project');
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <AnimatePresence mode="wait">
        {!profile ? (
          <LoginSetupScreen
            key="login"
            onSelectProfile={saveProfile}
            onBack={onBack}
          />
        ) : (
          <DashboardView
            key="dashboard"
            profile={profile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSignOut={signOut}
            onBack={onBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Login / Setup Screen ───────────────────────────────────────────────────

function LoginSetupScreen({
  onSelectProfile,
  onBack,
}: {
  onSelectProfile: (p: ClientProfile) => void;
  onBack: () => void;
}) {
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [founderName, setFounderName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [tier, setTier] = useState<EngagementTier>('MVP_STARTER');

  const canSubmit = companyName.trim() && projectName.trim() && founderName.trim() && contactEmail.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSelectProfile({ companyName, projectName, founderName, contactEmail, tier });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-4 py-12">
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-125 w-125 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-100 w-100 rounded-full bg-brand-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-brand/10 blur-[80px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </button>

        <div className="bento-card">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column: Brand & Quick Access */}
            <div className="flex flex-col gap-6">
              <BrandLogo size="lg" />
              <div>
                <h1 className="heading-display text-3xl sm:text-4xl">
                  <span className="text-white">CLIENT </span>
                  <span className="text-brand">WORKSPACE</span>
                </h1>
                <p className="mt-3 text-white/50 leading-relaxed">
                  Your command center for project tracking, payments, AI-powered blueprints,
                  and direct communication with the Aditya Labs team.
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
                  Quick Access — Demo Profiles
                </p>
                <div className="space-y-3">
                  {DEMO_PROFILES.map((dp, i) => (
                    <motion.button
                      key={dp.companyName}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      onClick={() => onSelectProfile(dp)}
                      className="group flex w-full items-center gap-4 rounded-xl border border-white/6 bg-white/2 p-4 text-left transition-all hover:border-brand/30 hover:bg-brand/5"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-brand/10">
                        {i === 0 ? (
                          <Building2 className="size-5 text-brand" />
                        ) : (
                          <Cpu className="size-5 text-brand-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{dp.companyName}</p>
                        <p className="text-sm text-white/40 truncate">{dp.projectName}</p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-semibold ${TIER_CONFIG[dp.tier].color}`}
                      >
                        {TIER_CONFIG[dp.tier].label}
                      </span>
                      <ChevronRight className="size-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Custom Profile Form */}
            <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
              <h2 className="heading-display text-lg text-white">
                Configure Custom Workspace
              </h2>
              <p className="mt-1 text-sm text-white/40">
                Set up a new client workspace with your details
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme SaaS Co."
                    className="w-full rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Logistics CRM"
                    className="w-full rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. john@company.com"
                    className="w-full rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-brand/40 focus:bg-white/5"
                  />
                </div>

                {/* Engagement Tier */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
                    Engagement Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        ['MVP_STARTER', 'MVP Starter', '₹1.5L', Zap] as const,
                        ['SAAS_PLATFORM', 'SaaS Platform', '₹4.5L', Rocket] as const,
                        ['MONTHLY_RETAINER', 'AI Retainer', '₹2.5L/Mo', Bot] as const,
                      ] as const
                    ).map(([value, label, price, Icon]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTier(value as EngagementTier)}
                        className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all ${
                          tier === value
                            ? 'border-brand/50 bg-brand/10 text-white'
                            : 'border-white/6 bg-white/2 text-white/50 hover:border-white/12 hover:bg-white/4'
                        }`}
                      >
                        <Icon className="size-4" />
                        <span className="text-xs font-semibold">{label}</span>
                        <span className="text-[10px] text-white/30">{price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand disabled:hover:shadow-brand/25"
                >
                  Configure Custom Workspace
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Dashboard View ─────────────────────────────────────────────────────────

function DashboardView({
  profile,
  activeTab,
  onTabChange,
  onSignOut,
  onBack,
}: {
  profile: ClientProfile;
  activeTab: DashboardTab;
  onTabChange: (t: DashboardTab) => void;
  onSignOut: () => void;
  onBack: () => void;
}) {
  const tabs: { key: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { key: 'project', label: 'Project Hub', icon: <Briefcase className="size-4" /> },
    { key: 'payments', label: 'Payments & SDK', icon: <CreditCard className="size-4" /> },
    { key: 'nexus', label: 'Nexus AI Builder', icon: <Sparkles className="size-4" /> },
    { key: 'assets', label: 'Asset Locker', icon: <Folder className="size-4" /> },
    { key: 'hotline', label: 'Direct Hotline', icon: <Phone className="size-4" /> },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/6 bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex size-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <ArrowLeft className="size-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-lg font-bold text-white">
                    {profile.companyName}
                  </h1>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TIER_CONFIG[profile.tier].color} bg-white/5`}
                  >
                    {TIER_CONFIG[profile.tier].label}
                  </span>
                </div>
                <p className="text-xs text-white/30">{profile.projectName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-white/50 sm:block">
                {greeting}, <span className="text-white">{profile.founderName}</span>
              </span>
              <button
                onClick={onSignOut}
                className="rounded-lg border border-white/8 bg-white/3 px-3 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-white/15 hover:bg-white/6 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Tab navigation */}
          <nav className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex shrink-0 items-center gap-2 rounded-t-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'border-b-2 border-brand bg-brand/5 text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/2'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Tab content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'project' && <ProjectHubTab key="project" profile={profile} />}
          {activeTab === 'payments' && <PaymentsTab key="payments" />}
          {activeTab === 'nexus' && <NexusBuilderTab key="nexus" />}
          {activeTab === 'assets' && <AssetLockerTab key="assets" />}
          {activeTab === 'hotline' && <HotlineTab key="hotline" profile={profile} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─── Project Hub Tab ─────────────────────────────────────────────────────────

function ProjectHubTab({ profile }: { profile: ClientProfile }) {
  const metrics = [
    {
      label: 'Project Velocity',
      value: '94%',
      icon: <TrendingUp className="size-5 text-brand" />,
      color: 'bg-brand/10',
      sub: 'On track',
    },
    {
      label: 'Deploy Status',
      value: 'UAT-Ready',
      icon: <Rocket className="size-5 text-emerald-400" />,
      color: 'bg-emerald-500/10',
      sub: 'Staging live',
    },
    {
      label: 'Milestones Completed',
      value: '2/4',
      icon: <CheckCircle2 className="size-5 text-brand-accent" />,
      color: 'bg-brand-accent/10',
      sub: '50% done',
    },
    {
      label: 'Payment Pipeline',
      value: 'Up-to-Date',
      icon: <DollarSign className="size-5 text-amber-400" />,
      color: 'bg-amber-500/10',
      sub: 'No overdue',
    },
  ];

  const completedCount = MILESTONES.filter((m) => m.status === 'COMPLETED').length;
  const progressPct = (completedCount / MILESTONES.length) * 100;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <motion.div key={m.label} variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-xl ${m.color}`}>
                {m.icon}
              </div>
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
          <p className="mt-1 text-sm text-white/40">
            {profile.projectName} — Progress Overview
          </p>

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-brand to-brand-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            />
          </div>

          {/* Timeline */}
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
                  {/* Timeline line & dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex size-8 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? 'border-emerald-400 bg-emerald-400/10'
                          : isInProgress
                            ? 'border-brand bg-brand/10'
                            : 'border-white/10 bg-white/3'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      ) : isInProgress ? (
                        <Clock className="size-4 text-brand" />
                      ) : (
                        <Circle className="size-4 text-white/20" />
                      )}
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 min-h-10 ${
                          isCompleted ? 'bg-emerald-400/30' : 'bg-white/6'
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-6 flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-semibold ${
                          isCompleted
                            ? 'text-white'
                            : isInProgress
                              ? 'text-white'
                              : 'text-white/40'
                        }`}
                      >
                        {milestone.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : isInProgress
                              ? 'bg-brand/10 text-brand'
                              : 'bg-white/5 text-white/30'
                        }`}
                      >
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
              We guarantee your product goes live on schedule. If we miss the deadline,
              the next sprint is on us. That&apos;s the Aditya Labs commitment.
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
              <h3 className="font-semibold text-white text-sm">Aditya Labs Guarantee</h3>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Every line of code is reviewed, every design is pixel-perfect, and every
              deployment is battle-tested. We don&apos;t ship bugs — we ship experiences.
            </p>
            <div className="mt-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-xs text-white/30">5.0 Client Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Payments & SDK Tab ──────────────────────────────────────────────────────

function PaymentsTab() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutDone, setCheckoutDone] = useState<string | null>(null);

  const paymentOptions = [
    {
      id: 'mvp',
      title: 'MVP Setup',
      price: '₹1,50,000',
      description: 'Complete MVP development with core features, auth, and deployment',
      icon: <Zap className="size-5 text-brand" />,
      color: 'bg-brand/10',
    },
    {
      id: 'retainer',
      title: 'Monthly Retainer',
      price: '₹2,50,000',
      description: 'Ongoing development, maintenance, and priority support',
      icon: <Package className="size-5 text-brand-accent" />,
      color: 'bg-brand-accent/10',
    },
    {
      id: 'audit',
      title: 'UI/UX Audit',
      price: '₹90,000',
      description: 'Comprehensive UX review, heuristic evaluation, and redesign',
      icon: <Eye className="size-5 text-emerald-400" />,
      color: 'bg-emerald-500/10',
    },
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
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Payment Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {paymentOptions.map((opt) => (
          <motion.div key={opt.id} variants={staggerItem} className="bento-card p-5!">
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex size-10 items-center justify-center rounded-xl ${opt.color}`}>
                {opt.icon}
              </div>
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
            >
              {checkoutLoading === opt.id ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : checkoutDone === opt.id ? (
                <>
                  <CheckCircle2 className="size-4" />
                  Payment Simulated!
                </>
              ) : (
                <>
                  <CreditCard className="size-4" />
                  Checkout via Razorpay
                </>
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
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
                    Invoice
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
                    Date
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
                    Amount
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className={`cursor-pointer border-b border-white/3 transition-colors hover:bg-white/3 ${
                      selectedInvoice?.id === inv.id ? 'bg-brand/5' : ''
                    }`}
                  >
                    <td className="py-3 text-sm font-medium text-white">{inv.id}</td>
                    <td className="py-3 text-sm text-white/50">{inv.date}</td>
                    <td className="py-3 text-sm font-semibold text-white">{inv.amount}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : inv.status === 'Pending'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-white/5 text-white/40'
                        }`}
                      >
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
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="text-white/30 hover:text-white"
                  >
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
                    <span
                      className={`font-semibold ${
                        selectedInvoice.status === 'Paid'
                          ? 'text-emerald-400'
                          : selectedInvoice.status === 'Pending'
                            ? 'text-amber-400'
                            : 'text-white/40'
                      }`}
                    >
                      {selectedInvoice.status}
                    </span>
                  </div>
                  <div className="border-t border-white/6 pt-3 mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">
                      Line Items
                    </p>
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
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2 text-sm text-white/60 transition-all hover:bg-white/6 hover:text-white mt-2">
                    <Download className="size-4" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bento-card p-5! flex flex-col items-center justify-center text-center min-h-50"
              >
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

// ─── Nexus AI Builder Tab ────────────────────────────────────────────────────

function NexusBuilderTab() {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStep, setAgentStep] = useState(-1);
  const [proposal, setProposal] = useState<null | {
    architecture: string;
    aiAgents: string;
    scope: string;
    pricing: string;
    timescale: string;
  }>(null);

  const agents = [
    {
      name: 'AI Concierge Agent',
      code: 'Nexus-1',
      icon: <Bot className="size-5 text-brand" />,
      description: 'Analyzing your SaaS idea and market fit',
    },
    {
      name: 'Technical Architect Agent',
      code: 'Nexus-2',
      icon: <Cpu className="size-5 text-brand-accent" />,
      description: 'Designing system architecture and tech stack',
    },
    {
      name: 'Proposal Constructor Agent',
      code: 'Nexus-3',
      icon: <Sparkles className="size-5 text-amber-400" />,
      description: 'Compiling proposal with scope and deliverables',
    },
    {
      name: 'Budget & Costing Node',
      code: 'Nexus-4',
      icon: <DollarSign className="size-5 text-emerald-400" />,
      description: 'Calculating costs, timeline, and ROI projections',
    },
  ];

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);
    setAgentStep(0);
    setProposal(null);

    // Staggered agent progression
    const stepDelays = [1500, 1500, 2000, 1500];

    for (let i = 0; i < agents.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDelays[i]));
      setAgentStep(i + 1);
    }

    // Try to get AI response
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Generate a SaaS blueprint for this idea: "${idea}". Include architecture approach, AI agent capabilities, project scope, pricing estimate, and timescale. Be concise and structured.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const aiText = data.message || '';

      setProposal({
        architecture:
          extractSection(aiText, 'architecture') ||
          'Microservices with Next.js 16 frontend, Node.js API layer, PostgreSQL with Prisma ORM, Redis caching, and Kubernetes deployment',
        aiAgents:
          extractSection(aiText, 'ai') ||
          'RAG-powered chatbot, intelligent document processor, predictive analytics engine, automated workflow orchestrator',
        scope:
          extractSection(aiText, 'scope') ||
          'Core platform with auth, dashboard, analytics, billing, and admin panel. Phase 2: API marketplace and integrations.',
        pricing:
          extractSection(aiText, 'pricing') ||
          '₹4,50,000 for MVP (8-10 weeks). Monthly retainer ₹2,50,000 for ongoing development and scaling.',
        timescale:
          extractSection(aiText, 'timescale') ||
          '8-10 weeks to MVP, 4-6 weeks for beta, 2-4 weeks for production launch.',
      });
    } catch {
      setProposal({
        architecture:
          'Microservices with Next.js 16 frontend, Node.js API layer, PostgreSQL with Prisma ORM, Redis caching, and Kubernetes deployment',
        aiAgents:
          'RAG-powered chatbot, intelligent document processor, predictive analytics engine, automated workflow orchestrator',
        scope:
          'Core platform with auth, dashboard, analytics, billing, and admin panel. Phase 2: API marketplace and integrations.',
        pricing:
          '₹4,50,000 for MVP (8-10 weeks). Monthly retainer ₹2,50,000 for ongoing development and scaling.',
        timescale:
          '8-10 weeks to MVP, 4-6 weeks for beta, 2-4 weeks for production launch.',
      });
    }

    setIsGenerating(false);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Input Section */}
      <motion.div variants={staggerItem} className="bento-card">
        <h2 className="heading-display text-lg text-white">Nexus AI Builder</h2>
        <p className="mt-1 text-sm text-white/40">
          Describe your SaaS idea and our AI agents will generate a complete blueprint
        </p>

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
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Generate Blueprint
          </button>
        </div>
      </motion.div>

      {/* Agent Progression */}
      {(isGenerating || agentStep > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {agents.map((agent, i) => {
            const isActive = agentStep === i;
            const isDone = agentStep > i;

            return (
              <motion.div
                key={agent.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isDone || isActive ? 1 : 0.3,
                  y: 0,
                }}
                transition={{ delay: i * 0.15 }}
                className={`bento-card p-4! ${
                  isActive
                    ? 'border-brand/40 shadow-lg shadow-brand/10'
                    : isDone
                      ? 'border-emerald-500/20'
                      : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {agent.icon}
                  <span className="text-[10px] font-mono text-white/30">{agent.code}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                <p className="mt-1 text-xs text-white/30">{agent.description}</p>
                <div className="mt-2">
                  {isDone ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCircle2 className="size-3" /> Complete
                    </span>
                  ) : isActive ? (
                    <span className="flex items-center gap-1 text-xs text-brand">
                      <Loader2 className="size-3 animate-spin" /> Processing...
                    </span>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="bento-card border-brand/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10">
                <Sparkles className="size-5 text-brand" />
              </div>
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
                <div
                  key={section.label}
                  className="rounded-xl border border-white/6 bg-white/2 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {section.icon}
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                      {section.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{section.value}</p>
                </div>
              ))}
              {/* Timescale — full width */}
              <div className="sm:col-span-2 rounded-xl border border-white/6 bg-white/2 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="size-4 text-brand" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Timescale
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{proposal.timescale}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper: extract a section from AI text
function extractSection(text: string, keyword: string): string {
  const regex = new RegExp(`(?:${keyword})[^:]*[:\\-]\\s*(.+?)(?:\\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}

// ─── Asset Locker Tab ────────────────────────────────────────────────────────

function AssetLockerTab() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'brand-guidelines.pdf',
      size: '2.4 MB',
      date: '2025-01-15',
      type: 'PDF',
    },
    {
      id: '2',
      name: 'ui-prototype-v2.fig',
      size: '18.7 MB',
      date: '2025-01-20',
      type: 'Figma',
    },
    {
      id: '3',
      name: 'api-docs-v3.md',
      size: '156 KB',
      date: '2025-02-01',
      type: 'Markdown',
    },
  ]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateUpload();
  };

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

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const typeColors: Record<string, string> = {
    PDF: 'text-red-400 bg-red-500/10',
    Figma: 'text-purple-400 bg-purple-500/10',
    Markdown: 'text-blue-400 bg-blue-500/10',
    File: 'text-white/40 bg-white/5',
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Drag & Drop Area */}
      <motion.div variants={staggerItem}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`bento-card flex flex-col items-center justify-center py-12 transition-all ${
            isDragOver ? 'border-brand/50 bg-brand/5' : ''
          }`}
        >
          <div
            className={`flex size-16 items-center justify-center rounded-2xl ${
              isDragOver ? 'bg-brand/20' : 'bg-white/5'
            } transition-colors`}
          >
            <Upload
              className={`size-7 ${isDragOver ? 'text-brand' : 'text-white/20'} transition-colors`}
            />
          </div>
          <p className="mt-4 font-semibold text-white">
            {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="mt-1 text-sm text-white/30">
            or click to browse — any file type supported
          </p>
          <button
            onClick={simulateUpload}
            className="mt-4 flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#6D28D9]"
          >
            <Upload className="size-4" />
            Upload File
          </button>
        </div>
      </motion.div>

      {/* File List */}
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
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${
                    typeColors[file.type] || typeColors.File
                  }`}
                >
                  <File className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/30">
                    {file.size} · {file.date}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    typeColors[file.type] || typeColors.File
                  }`}
                >
                  {file.type}
                </span>
                <button
                  onClick={() => removeFile(file.id)}
                  className="shrink-0 text-white/20 hover:text-red-400 transition-colors"
                >
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

// ─── Direct Hotline Tab ──────────────────────────────────────────────────────

function HotlineTab({ profile }: { profile: ClientProfile }) {
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

    // Simulate auto-reply
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl"
    >
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
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-brand text-white rounded-br-md'
                    : 'bg-white/5 text-white/80 rounded-bl-md'
                }`}
              >
                {msg.sender === 'aditya' && (
                  <p className="text-[10px] font-semibold text-brand mb-1">Aditya Kumar</p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={`mt-1 text-[10px] ${
                    msg.sender === 'user' ? 'text-white/40' : 'text-white/20'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                <p className="text-[10px] font-semibold text-brand mb-1">Aditya Kumar</p>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-white/30 animate-bounce" />
                  <span
                    className="size-1.5 rounded-full bg-white/30 animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="size-1.5 rounded-full bg-white/30 animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
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
            placeholder={`Message Aditya as ${profile.founderName}...`}
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

