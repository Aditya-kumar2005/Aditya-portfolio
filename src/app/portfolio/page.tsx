'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Real-time data analytics with machine learning insights for enterprise clients',
    tags: ['ML', 'Analytics', 'Cloud'],
    impact: '40% efficiency increase',
    client: 'Fortune 500 Company',
  },
  {
    title: 'Customer Prediction Engine',
    description: 'Predictive analytics system for customer behavior and churn prediction',
    tags: ['Python', 'TensorFlow', 'BigQuery'],
    impact: '35% sales increase',
    client: 'E-commerce Platform',
  },
  {
    title: 'Natural Language Processing System',
    description: 'Advanced NLP solution for automated customer support and sentiment analysis',
    tags: ['NLP', 'GPT', 'Cloud'],
    impact: '60% support cost reduction',
    client: 'SaaS Startup',
  },
  {
    title: 'Computer Vision Solution',
    description: 'Image recognition system for quality assurance and automated inspection',
    tags: ['CV', 'Deep Learning', 'Real-time'],
    impact: '99.2% accuracy',
    client: 'Manufacturing Firm',
  },
  {
    title: 'Recommendation Engine',
    description: 'Personalized product recommendation system using collaborative filtering',
    tags: ['Recommendation', 'Personalization', 'Scala'],
    impact: '45% CTR improvement',
    client: 'Retail Giant',
  },
  {
    title: 'Autonomous Workflow System',
    description: 'Intelligent automation platform for business process optimization',
    tags: ['Automation', 'RPA', 'AI'],
    impact: '80% time savings',
    client: 'Finance Corporation',
  },
];

export default function PortfolioPage() {
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
              Our <span className="text-brand">Portfolio</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Successful AI projects that delivered measurable business impact across industries.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                className="bento-card group flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ translateY: -4 }}
              >
                {/* Project Header */}
                <div className="mb-4">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                    <ExternalLink className="size-5 text-brand/60 transition-colors group-hover:text-brand" />
                  </div>
                  <p className="text-sm text-brand font-medium">{project.client}</p>
                </div>

                {/* Description */}
                <p className="mb-6 flex-1 text-white/70">{project.description}</p>

                {/* Impact */}
                <div className="mb-6 inline-block rounded-lg bg-brand/10 px-3 py-1.5">
                  <p className="text-sm font-medium text-brand">{project.impact}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Case Studies CTA */}
          <motion.div
            className="mt-20 rounded-2xl bg-gradient-to-r from-brand/20 to-transparent p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="heading-display mb-6 text-3xl">Want to See Detailed Case Studies?</h2>
            <p className="mb-8 text-white/70">Explore in-depth analyses of how we solved complex business challenges.</p>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Case Studies
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
