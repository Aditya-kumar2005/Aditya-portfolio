'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';

const team = [
  {
    name: 'Aditya Kumar',
    role: 'Founder & CEO',
    bio: 'AI visionary with 10+ years of tech industry experience',
  },
  {
    name: 'Sarah Johnson',
    role: 'Ai engineer',
    bio: 'Ai agent expert in machine learning and system architecture',
  },
  {
    name: 'Mike Chen',
    role: 'Lead Engineer',
    bio: 'Ai agent Full-stack developer specializing in AI implementations',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    bio: 'Ai agent Passionate about delivering innovative AI solutions',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and explore new possibilities in AI technology.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We are committed to delivering the highest quality solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with our clients to achieve their goals.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'We maintain transparency and ethical standards in all operations.',
  },
];

export default function AboutPage() {
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
              About <span className="text-brand">Aditya Lab</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              We&apos;re on a mission to democratize AI and make it accessible to businesses of all sizes.
            </p>
          </motion.div>

          {/* Our Story */}
          <motion.div
            className="mb-20 grid gap-12 md:grid-cols-2 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 className="heading-display mb-6 text-4xl">Our Story</h2>
              <p className="mb-4 text-white/70">
                Founded in 2021, Aditya Lab emerged from a vision to transform how businesses leverage artificial intelligence. What started as a small team of AI enthusiasts has grown into a full-service AI agency serving clients across industries.
              </p>
              <p className="text-white/70">
                We believe that AI should be accessible, understandable, and beneficial. Our approach combines cutting-edge technology with practical business insights to deliver solutions that truly drive results.
              </p>
            </div>
            <div className="bento-card h-96 bg-linear-to-br from-brand/20 to-transparent" />
          </motion.div>

          {/* Values */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="heading-display mb-12 text-center text-4xl">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="bento-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="mb-4 inline-block rounded-lg bg-brand/10 p-3">
                      <Icon className="size-6 text-brand" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                    <p className="text-white/60">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="heading-display mb-12 text-center text-4xl">Our Team</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="bento-card text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ translateY: -4 }}
                >
                  <div className="mb-4 h-32 w-full rounded-lg bg-linear-to-br from-brand/20 to-transparent" />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mb-2 text-sm text-brand font-medium">{member.role}</p>
                  <p className="text-sm text-white/60">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid gap-8 md:grid-cols-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '40+', label: 'Happy Clients' },
              { number: '100+', label: 'AI Models Deployed' },
              { number: '3+', label: 'Years Experience' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl bg-white/3 p-6"
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
