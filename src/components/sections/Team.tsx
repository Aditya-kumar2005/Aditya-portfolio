'use client'

import { motion } from 'framer-motion'
import { Rocket, Award, Cpu, Linkedin, Twitter, Github } from 'lucide-react'
import young from '../../../public/glasses.png'
import Image from 'next/image'

const features = [
  {
    icon: Rocket,
    title: 'Strategic Growth',
    description: 'Scaling products from MVP to market leader',
  },
  {
    icon: Award,
    title: 'Technical Excellence',
    description: 'Engineering with precision and best practices',
  },
  {
    icon: Cpu,
    title: 'AI-First Approach',
    description: 'Integrating intelligence into every solution',
  },
]

const socialLinks = [
  { icon: Linkedin, href: 'http://www.linkedin.com/in/aditya-kumar-b4874235b', label: 'LinkedIn' },
  // { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/Aditya-kumar2005', label: 'GitHub' },
]

export default function Team() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bento-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side — Profile Image */}
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
                  src={young.src}
                  alt="Aditya Kumar — Founder & Team Lead" 
                    fill
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 320px"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    // priority
                  loading="lazy"
                  />

                {/* Overlay with name */}
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent flex items-end justify-center pb-5">
                  <div className="text-center">
                    <p className="text-white font-display font-bold text-lg">Aditya Kumar</p>
                    <p className="text-brand text-sm font-medium">Founder & Team Lead</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Label */}
            <span className="inline-block text-brand text-sm font-semibold tracking-widest uppercase">
              Founder&apos;s Vision
            </span>

            {/* Headline */}
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Pioneering the next{' '}
              <span className="text-brand">Generation</span> of SaaS.
            </h2>

            {/* Description */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              With over a decade of experience building and scaling SaaS products,
              I lead a team that transforms complex ideas into elegant, market-leading
              solutions. Our focus on strategic growth and cutting-edge technology
              ensures every product we build is positioned for success.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center hover:border-brand/30 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6 text-brand mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{feature.title}</p>
                  <p className="text-white/40 text-xs mt-1">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass w-10 h-10 rounded-full flex items-center justify-center hover:border-brand/40 transition-colors duration-300"
                >
                  <link.icon className="w-4 h-4 text-white/60 hover:text-brand transition-colors" />
                </motion.a>
              ))}

              {/* Available indicator */}
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-green-400 text-sm font-medium">
                  Available for new ventures
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

