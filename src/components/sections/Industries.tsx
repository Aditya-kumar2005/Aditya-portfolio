'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Building, ShoppingCart, Home, User, Briefcase, GraduationCap, Heart } from 'lucide-react';

const industries = [
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Salons', icon: Building },
  { name: 'E-Commerce', icon: ShoppingCart },
  { name: 'Real Estate', icon: Home },
  { name: 'Coaches', icon: User },
  { name: 'SaaS Startups', icon: Briefcase },
  { name: 'Education', icon: GraduationCap },
  { name: 'Dental Clinics', icon: Heart },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Industries() {
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
            Our Expertise
          </span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Industries We <span className="text-brand">Serve</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bento-card group p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 text-brand">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 group-hover:text-brand transition-colors duration-300">
                  {industry.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
