'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';

const projects = [
  {
    title: 'NexusConnect',
    category: 'AI-Powered WhatsApp Automation',
    problem:
      'A busy dental clinic was missing a significant number of patient inquiries and booking requests coming through WhatsApp after hours, leading to lost revenue and a frustrating patient experience.',
    solution:
      'We developed an AI-powered WhatsApp chatbot that could understand and respond to patient inquiries 24/7. The chatbot was integrated with the clinic\'s CRM to book appointments, answer frequently asked questions, and provide information about services.',
    results:
      'The AI receptionist achieved a 60% faster response time, leading to a 40% increase in patient bookings and a 95% patient satisfaction rate. The clinic was able to capture previously missed opportunities and improve overall efficiency.',
    technologies: ['WhatsApp API', 'OpenAI', 'Next.js', 'Supabase'],
    image:
      'https://pickyassist.com/blog/wp-content/uploads/2025/10/bLOG-IMAGE-Feedback-through-chatbots-1024x1024.png',
    href: 'https://ai-client-interaction.vercel.app/',
  },
  {
    title: 'Finvault',
    category: 'SaaS Development',
    problem:
      'An e-commerce store was struggling to provide personalized recommendations and support to its customers, resulting in low conversion rates and high cart abandonment.',
    solution:
      'We built a custom AI sales assistant that integrated with the store\'s product catalog and customer data. The assistant provided personalized product recommendations, answered customer questions, and offered real-time support, guiding users through their purchasing journey.',
    results:
      'The AI sales assistant increased the store\'s conversion rate by 25%, reduced cart abandonment by 30%, and boosted the average order value by 15%.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Pinecone'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    href: 'https://finance-app-woad-eight.vercel.app/',
  },
];

export default function CaseStudies() {
  return (
    <section id="portfolio" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">
            Case Studies
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            See Our <span className="text-brand">Impact</span>
          </h2>
        </motion.div>

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
                <div className="space-y-4">
                  <span className="inline-block text-brand text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-brand/30 bg-brand/10">
                    {project.category}
                  </span>

                  <h3 className="heading-display text-2xl md:text-3xl text-white group-hover:text-brand transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="space-y-2 text-white/50 text-base leading-relaxed">
                    <p>
                      <span className="font-bold text-white/80">Problem:</span> {project.problem}
                    </p>
                    <p>
                      <span className="font-bold text-white/80">Solution:</span> {project.solution}
                    </p>
                    <p>
                      <span className="font-bold text-white/80">Results:</span> {project.results}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-white/40">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.href}
                    className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all duration-300 group/link"
                    whileHover={{ x: 4 }}
                  >
                    View Full Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                  </motion.a>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-4/3">
                  <motion.img
                    src={project.image}
                    alt={`${project.title} — ${project.category} project showcase`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-linear-to-r from-dark/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
