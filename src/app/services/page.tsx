'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, BarChart3, Code2, Smartphone, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    description: 'Transform your business with AI-driven strategies tailored to your industry needs and goals.',
    features: ['Market Analysis', 'Implementation Planning', 'Risk Assessment'],
  },
  {
    icon: Code2,
    title: 'Custom AI Solutions',
    description: 'Build intelligent systems that automate processes and unlock new opportunities.',
    features: ['Machine Learning', 'NLP Integration', 'Computer Vision'],
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Extract actionable insights from your data to drive informed business decisions.',
    features: ['Data Modeling', 'Predictive Analytics', 'BI Dashboards'],
  },
  {
    icon: Zap,
    title: 'Automation & Optimization',
    description: 'Streamline operations and reduce costs through intelligent automation.',
    features: ['Process Automation', 'Workflow Optimization', 'Cost Reduction'],
  },
  {
    icon: Smartphone,
    title: 'AI-Powered Applications',
    description: 'Develop modern, intelligent applications that deliver exceptional user experiences.',
    features: ['Mobile Apps', 'Web Platforms', 'Real-time Systems'],
  },
  {
    icon: FileText,
    title: 'Training & Support',
    description: 'Equip your team with the skills and knowledge to leverage AI effectively.',
    features: ['Team Training', '24/7 Support', 'Documentation'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-display mb-6 text-5xl md:text-6xl lg:text-7xl">
              Our <span className="text-brand">Services</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Comprehensive AI solutions designed to transform your business and drive growth.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bento-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ translateY: -4 }}
                >
                  <div className="mb-4 inline-block rounded-lg bg-brand/10 p-3">
                    <Icon className="size-6 text-brand" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
                  <p className="mb-4 text-white/60">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="mb-6 text-white/70">Ready to transform your business?</p>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-lg font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Your Project
              <ArrowRight className="size-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
