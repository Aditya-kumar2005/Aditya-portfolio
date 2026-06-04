'use client';

import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Activity,
  TrendingUp,
  ShieldCheck,
  Users,
} from 'lucide-react';
import  Image  from 'next/image';
// import prof from '../../../public/young.png'
import young from '../../../public/prof.png'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const trustedLogos = ['Nexus', 'Vortex', 'Pulse', 'Aura', 'Titan'];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-dark">
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-125 w-125 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-100 w-100 rounded-full bg-brand-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-brand/10 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-12"
        >
          {/* Left: Headline + CTAs */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Trusted badge */}
            <motion.div variants={itemVariants}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/70">
                <Users className="size-4 text-brand" />
                Trusted by startups and growing businesses.
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="heading-display mt-8 max-w-2xl text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              We Build AI Systems That Save Businesses 20+ Hours Every Week
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-lg text-white/50"
            >
             AI Agents • WhatsApp Automation • SaaS Development • Custom Software
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-[#6D28D9] hover:shadow-brand/40 active:scale-[0.97]">
                Schedule Call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button className="group inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/5 hover:bg-white/6 active:scale-[0.97]">
                <Play className="size-4 text-brand" />
                View Case Studies
              </button>
               <button className="group inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/5 hover:bg-white/6 active:scale-[0.97]">
                <Play className="size-4 text-brand" />
                Watch Demo
              </button>
            </motion.div>
          </div>
           {/* Right: Image */}
            <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex justify-center lg:justify-center"
                    >
                      <div className="relative w-72 h-72 md:w-80 md:h-80">
                        {/* Decorative spinning rings */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-brand/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
                        />
                        <motion.div
                          className="absolute -inset-3 rounded-full border border-brand-accent/20 border-dashed"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
                        />
                        <motion.div
                          className="absolute -inset-6 rounded-full border border-white/5"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
                        />
          
                        {/* Profile image with grayscale-to-color */}
                        <motion.div
                          className="relative w-full h-full rounded-full overflow-hidden"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.3 }}
                        >
                            <Image
                            src={young}
                            alt="Founder image" 
                              fill
                              sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 320px"
                              className="w-full h-full object-cover transition-all duration-700"
                             priority
                            />
          
                          {/* Overlay with name */}
                          <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent flex items-end justify-center pb-5">
                            <div className="text-center">
                              <p className="text-white font-display font-bold text-lg">Aditya Kumar</p>
                              <p className="text-brand text-sm font-medium">-- Founder & Team Lead</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
            </motion.div>
        </motion.div>

        {/* Trusted logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 border-t border-white/6 pt-10"
        >
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-white/30">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {trustedLogos.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                className="font-display text-xl font-bold text-white/20 transition-colors hover:text-white/40 sm:text-2xl"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
