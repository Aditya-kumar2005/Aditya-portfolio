'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const testimonials = [
  {
    author: 'John Smith',
    role: 'CEO, TechStartup Inc.',
    content:
      'Aditya Lab transformed our business with their AI solutions. The team was professional, knowledgeable, and delivered results beyond our expectations. Highly recommended!',
    rating: 5,
  },
  {
    author: 'Sarah Williams',
    role: 'Product Manager, Digital Solutions',
    content:
      'Working with Aditya Lab was a game-changer. Their AI implementation increased our efficiency by 40% in the first quarter alone. Exceptional service!',
    rating: 5,
  },
  {
    author: 'Michael Chen',
    role: 'Operations Director, Finance Corp',
    content:
      'The custom AI solution they built for us automated our entire workflow. Not only did it save us time, but it also improved accuracy significantly. Great team to work with.',
    rating: 5,
  },
  {
    author: 'Emily Johnson',
    role: 'Founder, E-commerce Platform',
    content:
      'From initial consultation to implementation, the Aditya Lab team was responsive and professional. Their AI system increased our sales conversion by 35%. Outstanding!',
    rating: 5,
  },
  {
    author: 'David Martinez',
    role: 'CTO, Healthcare Tech',
    content:
      'The technical expertise demonstrated by the Aditya Lab team was impressive. They understood our complex requirements and delivered a robust, scalable solution.',
    rating: 5,
  },
  {
    author: 'Lisa Anderson',
    role: 'Marketing Head, Global Brand',
    content:
      'Their AI-powered analytics platform gave us insights we never had before. The ROI was immediate, and their support team is always available when we need them.',
    rating: 5,
  },
];

export default function TestimonialsPage() {
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
              What Our Clients <span className="text-brand">Say</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Join hundreds of businesses that have transformed with our AI solutions.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                className="bento-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ translateY: -4 }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="size-4 fill-brand text-brand" />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-6 flex-1 text-white/80">{`"${testimonial.content}"`}</p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 rounded-2xl bg-gradient-to-r from-brand/20 to-transparent p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="heading-display mb-6 text-3xl">Ready to Join Our Success Stories?</h2>
            <p className="mb-8 text-white/70">Let&apos;s discuss how we can transform your business with AI.</p>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Schedule Consultation
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-20 grid gap-8 md:grid-cols-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { number: '40+', label: 'Satisfied Clients' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '$50M+', label: 'Value Generated' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl bg-white/[0.03] p-8"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-4xl font-bold text-brand mb-2">{stat.number}</p>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
