'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Star } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingPlan {
  name: string
  badge: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  cta: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    badge: 'Discovery',
    price: '$499-$1499',
    period: '/project',
    description:
      'Perfect for small businesses establishing their first digital presence.',
    features: [
      'Business Website',
      'Basic Mobile Design',
      'Contact Forms',
      'SEO Foundations',
      '1 Month Support'
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    badge: 'MVP Launch',
    price: '$1499-$4499',
    period: '/project',
    description:
      'Go from concept to production-ready product with full development, AI integration, and deployment.',
    features: [
      'Fullstack Development',
      'AI Integration',
      'Database Setup',
      'Deployment',
      '2 Month Support',
    ],
    highlighted: true,
    cta: 'Launch Your MVP',
  },
  {
    name: 'Enterprise',
    badge: 'Scale & Grow',
    price: '$4499-$8900',
    period: '/project',
    description:
      'Supercharge your product with advanced AI, system optimization, and enterprise-grade scaling.',
    features: [
      'Everything in Growth',
      'Custom RAG Systems',
      'Full Workflow Automation',
      'Priority Security Audit',
      'Lifetime Updates'
    ],
    highlighted: false,
    cta: 'Scale Up',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-medium text-brand">
            <Star className="size-3.5" />
            Pricing
          </span>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-white">
            Transparent pricing for{' '}
            <span className="text-brand">every stage</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            From initial discovery to enterprise-scale growth, choose the
            package that fits your vision. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`bento-card relative flex flex-col ${
                plan.highlighted
                  ? 'border-brand/40 shadow-lg shadow-brand/10 md:-mt-4 md:-mb-4'
                  : ''
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-brand/30">
                    <Star className="size-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Badge */}
              <div className="mb-5">
                <span
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${
                    plan.highlighted
                      ? 'bg-brand/15 text-brand'
                      : 'bg-white/5 text-white/50'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="heading-display text-4xl text-white lg:text-5xl">
                    {plan.price}
                  </span>
                  {/* <span className="text-sm text-white/30">{plan.period}</span> */}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed text-white/40">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                        plan.highlighted
                          ? 'bg-brand/15 text-brand'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`group flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-[0.97] ${
                  plan.highlighted
                    ? 'bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-secondary hover:shadow-brand/40'
                    : 'border border-white/8 bg-white/3 text-white hover:border-white/20 hover:bg-white/6'
                }`}
              >
                {plan.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
