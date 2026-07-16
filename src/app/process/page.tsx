'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, CheckCircle2, PenTool, Code, Rocket, ArrowRight,
  Shield, Brain, Zap, Cpu, Terminal, Users, Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery & Audit',
    subtitle: 'Understanding Your DNA',
    description: 'We conduct deep product discovery workshops to map your business objectives, technical gaps, user personas, and competitor landscape. Our goal is to extract the exact requirements to de-risk development.',
    details: [
      'Technical feasibility assessment',
      'Architecture design options',
      'User journey mapping',
      'Project scope crystallization'
    ],
    metric: '100%',
    metricLabel: 'Alignment'
  },
  {
    step: '02',
    icon: CheckCircle2,
    title: 'Market Validation & MVP Planning',
    subtitle: 'Maximizing ROI, Minimizing Waste',
    description: 'Before coding begins, we validate key assumptions. We draft a precise Minimum Viable Product (MVP) feature list focused entirely on delivering the maximum market impact with minimal bloat.',
    details: [
      'Interactive wireframing',
      'Feature prioritization matrix',
      'Cost-performance calculations',
      'Tech stack recommendation'
    ],
    metric: '2.5x',
    metricLabel: 'Faster Validation'
  },
  {
    step: '03',
    icon: PenTool,
    title: 'High-Fidelity UI/UX Design',
    subtitle: 'Crafting Visually Stunning Interfaces',
    description: 'Our design philosophy targets "Wow at first sight". We design gorgeous, high-fidelity mockups using a custom styling system, deep transitions, and dynamic user interfaces suited for web & mobile.',
    details: [
      'Tailored dark/light mode themes',
      'Interactive design prototypes',
      'Micro-animation storyboarding',
      'Component library architecture'
    ],
    metric: '98%',
    metricLabel: 'User Acceptance'
  },
  {
    step: '04',
    icon: Code,
    title: 'Agile Software Engineering',
    subtitle: 'Writing Clean, Scale-Ready Code',
    description: 'We code using clean architecture, TypeScript, and modern optimization techniques. Continuous integration, regular code reviews, and automated unit testing ensure flawless execution.',
    details: [
      'Strict type safety',
      'Database optimizations (Prisma/Postgres)',
      'Secure session authentication',
      'Modular API integrations'
    ],
    metric: '40%',
    metricLabel: 'Development Speedup'
  },
  {
    step: '05',
    icon: Rocket,
    title: 'Deployment & Continuous Scaling',
    subtitle: 'Launching Globally, Optimizing Realtime',
    description: 'We deploy to edge hosting networks for lightning-fast speeds. Post-launch, we implement analytics, track performance metrics, and iterate rapidly based on real user feedback.',
    details: [
      'Edge CDN serverless deployment',
      'Automated performance monitoring',
      'Security headers audit configuration',
      'Post-launch scaling strategy'
    ],
    metric: '99.99%',
    metricLabel: 'Uptime'
  }
];

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      
      <main className="pt-24 pb-20 relative overflow-hidden">
        {/* Background cosmic glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-120 w-120 rounded-full bg-brand/10 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 h-100 w-100 rounded-full bg-brand-accent/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand ring-1 ring-brand/20">
              Our Methodology
            </span>
            <h1 className="heading-display mt-4 mb-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              How We <span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">Engineer</span> Success
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
              We combine robust engineering, human-centered UI/UX, and strict quality checks to transform your ideas into scalable platforms.
            </p>
          </motion.div>

          {/* Steps Timeline Grid */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Vertical selector */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white/50 mb-6 uppercase text-center lg:text-left">
                Engineering Phases
              </h2>
              <div className="flex flex-col gap-3">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.step}
                      onClick={() => setActiveStep(idx)}
                      className={`flex items-center gap-4 rounded-2xl p-4 text-left border transition-all ${
                        isActive 
                          ? 'border-brand/40 bg-brand/10 shadow-lg shadow-brand/5' 
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                        isActive ? 'bg-brand text-white' : 'bg-white/5 text-white/40'
                      }`}>
                        {step.step}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-base font-semibold truncate ${isActive ? 'text-brand' : 'text-white/80'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-white/40 truncate">{step.subtitle}</p>
                      </div>
                      <Icon className={`size-5 shrink-0 ${isActive ? 'text-brand' : 'text-white/20'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Step details block */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-3xl p-6 md:p-10 border border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col justify-between h-full min-h-[480px]"
                >
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                      <div>
                        <span className="font-mono text-sm text-brand font-bold uppercase tracking-wider">
                          Phase {steps[activeStep].step}
                        </span>
                        <h3 className="heading-display mt-1 text-2xl md:text-3xl text-white font-bold">
                          {steps[activeStep].title}
                        </h3>
                        <p className="text-xs text-white/40 italic mt-0.5">{steps[activeStep].subtitle}</p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-4xl font-extrabold text-brand block leading-none">
                          {steps[activeStep].metric}
                        </span>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">
                          {steps[activeStep].metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed mb-8">
                      {steps[activeStep].description}
                    </p>

                    {/* Key actions */}
                    <div>
                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                        Key Outputs & Actions:
                      </h4>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {steps[activeStep].details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-white/80">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-accent animate-pulse" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="size-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400/80 font-medium">Verified Engineering Guarantee</span>
                    </div>
                    {activeStep < steps.length - 1 ? (
                      <button
                        onClick={() => setActiveStep(prev => prev + 1)}
                        className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all self-stretch sm:self-auto justify-center"
                      >
                        Next Phase
                        <ArrowRight className="size-4" />
                      </button>
                    ) : (
                      <a
                        href="/contact"
                        className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-secondary transition-all self-stretch sm:self-auto justify-center"
                      >
                        Let&apos;s Build Together
                        <ArrowRight className="size-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Dynamic capabilities banner */}
          <motion.div 
            className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: Brain, title: 'AI Integration', desc: 'Deploying neural LLMs & computer vision.' },
              { icon: Zap, title: 'Edge Computing', desc: 'Serverless architecture for instant page loads.' },
              { icon: Cpu, title: 'Type Safety', desc: 'Strict TypeScript for highly reliable codebases.' },
              { icon: Globe, title: 'SEO Optimized', desc: 'Pre-rendered sitemaps and organic structure.' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="rounded-2xl border border-white/4 bg-white/[0.01] p-5 hover:border-brand/20 transition-all">
                  <div className="mb-3 inline-block rounded-xl bg-white/5 p-2.5 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </main>
    </div>
  );
}
