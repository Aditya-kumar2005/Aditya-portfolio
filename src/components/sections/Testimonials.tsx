'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'James Carter',
    role: 'CEO, Kyro',
    quote:
      'Nexora transformed our idea into a powerful SaaS product that exceeded every expectation. Their technical depth and strategic thinking made all the difference.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Sarah Lin',
    role: 'Co-founder, Reachout',
    quote:
      'Their process is smooth, transparent, and incredibly efficient. From discovery to deployment, every step was handled with care and precision.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'David Park',
    role: 'CEO, Taskly',
    quote:
      "They don't just build features — they architect experiences. Our users noticed the difference from day one, and our metrics proved it.",
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
]

const partnerLogos = [
  { name: 'Uploadly', letters: 'U' },
  { name: 'Byteflow', letters: 'BF' },
  { name: 'Mailpeak', letters: 'MP' },
  { name: 'Taskly', letters: 'T' },
  { name: 'Cleanclip', letters: 'CC' },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            What Our <span className="text-brand">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bento-card flex flex-col justify-between"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-brand/40 mb-4" />

              {/* Quote text */}
              <p className="text-white/70 italic text-base leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand/20"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8"
        >
          <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partnerLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300"
              >
                {/* Stylized logo mark */}
                <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <span className="text-brand text-xs font-bold font-display">
                    {logo.letters}
                  </span>
                </div>
                <span className="text-white/50 font-display font-medium text-sm">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
