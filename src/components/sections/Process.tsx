'use client';

import { motion, Variants } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  PenTool,
  Code,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    step: '01',
    icon: Search,
    title: 'Discover',
    description: 'We learn about your idea, market, and goals',
  },
  {
    step: '02',
    icon: CheckCircle2,
    title: 'Validate',
    description: 'We validate your idea with research and MVP planning',
  },
  {
    step: '03',
    icon: PenTool,
    title: 'Design',
    description: 'We craft intuitive UI/UX',
  },
  {
    step: '04',
    icon: Code,
    title: 'Build',
    description: 'We build with clean, scalable code',
  },
  {
    step: '05',
    icon: Rocket,
    title: 'Launch & Scale',
    description: 'We launch, iterate, and scale',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-dark py-24 sm:py-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-100 w-100 rounded-full bg-brand-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-75 w-125 rounded-full bg-brand/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-brand-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            How We Work
          </span>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Our{' '}
            <span className="bg-linear-to-r from-brand-accent to-brand bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            A proven methodology that turns ideas into market-leading products.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {steps.map((stepItem) => {
            const Icon = stepItem.icon;
            return (
              <motion.div
                key={stepItem.step}
                variants={cardVariants}
                className="bento-card group flex flex-col items-center text-center"
              >
                {/* Step number */}
                <span className="mb-3 font-mono text-xs font-semibold text-brand/60">
                  {stepItem.step}
                </span>

                {/* Icon */}
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand/10 transition-colors group-hover:bg-brand/20">
                  <Icon className="size-7 text-brand" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white">
                  {stepItem.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {stepItem.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA card */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12"
        >
          <div className="bento-card relative overflow-hidden text-center">
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-brand/15 blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center py-4">
              <h3 className="heading-display text-2xl sm:text-3xl">
                Your success is our{' '}
                <span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">
                  mission
                </span>
              </h3>
              <p className="mt-3 max-w-lg text-white/50">
                Ready to turn your vision into a product that users love? Let&apos;s
                make it happen.
              </p>
              <button className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-[0.97]">
                Let&apos;s Build Together
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
