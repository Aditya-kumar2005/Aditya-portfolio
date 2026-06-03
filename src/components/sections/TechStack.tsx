'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const techCategories = [
  { 
    name: 'Frontend', 
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  { 
    name: 'Backend', 
    stack: ['Node.js', 'Python', 'Express.js', 'Supabase', 'PostgreSQL']
  },
  { 
    name: 'AI & Machine Learning', 
    stack: ['OpenAI', 'LangChain', 'Pinecone', 'Vector Databases', 'Fine-tuning']
  },
  { 
    name: 'Deployment & DevOps', 
    stack: ['Vercel', 'AWS', 'Docker', 'Stripe', 'Clerk Auth']
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function TechStack() {
  return (
    <section className="py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">
            Our Tools
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Technologies We <span className="text-brand">Use</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bento-card p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-brand mb-4">{category.name}</h3>
              <ul className="space-y-3">
                {category.stack.map((tech, techIndex) => (
                  <li key={techIndex} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-white/70">{tech}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
