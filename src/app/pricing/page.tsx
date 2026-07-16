'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const plans = [
  {
    name: 'Starter',
    price: '$5,000',
    period: 'per month',
    description: 'Perfect for small projects and testing',
    features: [
      'AI Strategy Consultation',
      'Basic Implementation',
      'Monthly Reporting',
      'Email Support',
      'Up to 10K API Calls',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$15,000',
    period: 'per month',
    description: 'Best for growing businesses',
    features: [
      'Everything in Starter',
      'Custom AI Solutions',
      'Real-time Analytics',
      'Priority Support',
      'Up to 100K API Calls',
      'Dedicated Account Manager',
      'Advanced Optimization',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large-scale deployments',
    features: [
      'Everything in Professional',
      'Unlimited API Calls',
      'Custom Development',
      '24/7 Priority Support',
      'On-premise Deployment Option',
      'Custom Training Programs',
      'Quarterly Reviews',
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-display mb-6 text-5xl md:text-6xl lg:text-7xl">
              Simple, <span className="text-brand">Transparent</span> Pricing
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Choose the perfect plan for your business needs. No hidden fees.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`bento-card relative ${plan.highlighted ? 'md:scale-105 md:ring-2 md:ring-brand' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={plan.highlighted ? { scale: 1.02 } : {}}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-brand px-4 py-1 text-xs font-semibold text-dark">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-white/60">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                </div>

                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all mb-8 ${
                    plan.highlighted
                      ? 'bg-brand text-dark hover:bg-brand-secondary'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 inline size-4" />
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 flex-shrink-0 text-brand" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            className="mt-20 rounded-2xl bg-white/[0.03] p-12 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                { q: 'Can I change plans anytime?', a: 'Yes, upgrade or downgrade your plan at any time with prorated billing.' },
                {
                  q: 'Is there a long-term contract?',
                  a: 'No, we offer flexible monthly billing with no long-term commitment required.',
                },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, bank transfers, and can arrange custom payment terms.' },
                {
                  q: 'Do you offer custom pricing?',
                  a: 'Absolutely! Contact our sales team for tailored packages based on your specific needs.',
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="mb-2 font-semibold text-brand">{item.q}</h3>
                  <p className="text-white/70">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
