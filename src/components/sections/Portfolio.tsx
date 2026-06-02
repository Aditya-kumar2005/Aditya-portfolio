'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight} from 'lucide-react';

const projects = [
  {
    title: 'NexusConnect',
    category: 'AI-Powered WhatsApp Automation',
    description:
      'AI-Powered WhatsApp Automation is an intelligent communication system that leverages Natural Language Processing (NLP) to fully automate customer interactions, lead qualification, and business workflows on WhatsApp around the clock.',
    tags:['Ai automation','Whatsapp bots'],
    image:
      'https://pickyassist.com/blog/wp-content/uploads/2025/10/bLOG-IMAGE-Feedback-through-chatbots-1024x1024.png',
    href: 'https://ai-client-interaction.vercel.app/',
  },
  {
    title: 'Finvault',
    category: 'Full stack web apps',
    description:
      'Financial analytics platform that transforms raw data into actionable insights with real-time dashboards, predictive modeling, and automated reporting for modern finance teams.',
      tags:['Websites','Web app'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    href: 'https://finance-app-woad-eight.vercel.app/',
  },
  {
    title: 'Taskly',
    category: 'PRODUCTIVITY',
    description:
      'Project management solution built for speed and clarity — featuring kanban boards, sprint planning, time tracking, and seamless team collaboration in one unified workspace.',
    tags:[''],
    image:
      'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1200',
    href: '#',
  },
]

export default function Portfolio() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">
            Our Work
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Featured <span className="text-brand">Projects</span>
          </h2>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bento-card group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Left — Text Content */}
                <div className="space-y-4">
                  <span className="inline-block text-brand text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-brand/30 bg-brand/10">
                    {project.category}
                  </span>

                  <h3 className="heading-display text-2xl md:text-3xl text-white group-hover:text-brand transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/50 text-base leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.href}
                    className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all duration-300 group/link"
                    whileHover={{ x: 4 }}
                  >
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                  </motion.a>
                </div>

                {/* Right — Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-4/3">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} — ${project.category} project showcase`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-r from-dark/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
