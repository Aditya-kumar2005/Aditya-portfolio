'use client';

import { motion } from 'framer-motion';
import { Briefcase, Zap, Smile, DollarSign, Clock, Users, TrendingUp, BarChart } from 'lucide-react';

const metrics = [
  { icon: BarChart, value: '15+', label: 'Projects Delivered' },
  { icon: Smile, value: '98%', label: 'Client Satisfaction' },
  { icon: Clock, value: '500+', label: 'Hours Automated' },
  { icon: DollarSign, value: '$100k+', label: 'Client Revenue Impact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function Impact() {
  return (
    <div className="bg-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-white/60">{metric.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  <div className="flex items-center justify-center gap-x-2">
                    <Icon className="h-10 w-10 text-brand" />
                    <span>{metric.value}</span>
                  </div>
                </dd>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
