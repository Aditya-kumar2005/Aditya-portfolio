'use client';

import { motion, Variants } from 'framer-motion';
import {
  Code,
  Bot,
  Zap,
  Smartphone,
  BarChart,
  Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    icon: Code,
    title: 'Custom SaaS Development',
    description:
      'End-to-end SaaS platforms built for scale, from architecture to deployment.',
    tags: ['Architecture', 'Scaling', 'Fullstack'],
  },
  {
    icon: Bot,
    title: 'AI Transformation',
    description:
      'Integrate AI into your workflows with LLMs, RAG pipelines, and intelligent automation.',
    tags: ['Gemini API', 'RAG', 'Automation'],
  },
  {
    icon: Zap,
    title: 'Product Engineering',
    description:
      'High-performance products engineered for security, cloud-native resilience, and speed.',
    tags: ['Security', 'Cloud', 'Performance'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description:
      'Native and cross-platform mobile apps that deliver seamless user experiences.',
    tags: ['iOS', 'Android', 'React Native'],
  },
  {
    icon: BarChart,
    title: 'Growth Architecture',
    description:
      'Data-driven growth strategies, UX audits, and conversion optimization systems.',
    tags: ['Metrics', 'CRO', 'UX Audit'],
  },
  {
    icon: Globe,
    title: 'Web Engineering',
    description:
      'Modern web applications built with cutting-edge frameworks and best practices.',
    tags: ['Next.js', 'React', 'TypeScript'],
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-dark py-24 sm:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />
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
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            What We Do
          </span>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl md:text-5xl">
            Services That{' '}
            <span className="bg-gradient-to-r from-brand to-brand-accent bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/50">
            From concept to scale — we provide the full stack of expertise your
            product needs to succeed.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="bento-card group flex flex-col"
              >
                {/* Icon */}
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand/10 transition-colors group-hover:bg-brand/20">
                  <Icon className="size-6 text-brand" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/40 transition-colors group-hover:text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
