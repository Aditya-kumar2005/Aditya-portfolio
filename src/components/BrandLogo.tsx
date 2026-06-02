'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'default' | 'lg';
  showSubtitle?: boolean;
}

const sizeConfig = {
  sm: {
    iconContainer: 'size-8',
    icon: 'size-4',
    title: 'text-lg',
    subtitle: 'text-[8px]',
    ping: 'size-1.5',
    pingOffset: 'top-0 right-0',
    gap: 'gap-2',
  },
  default: {
    iconContainer: 'size-10',
    icon: 'size-5',
    title: 'text-xl',
    subtitle: 'text-[10px]',
    ping: 'size-2',
    pingOffset: 'top-0.5 right-0.5',
    gap: 'gap-2.5',
  },
  lg: {
    iconContainer: 'size-14',
    icon: 'size-7',
    title: 'text-3xl',
    subtitle: 'text-xs',
    ping: 'size-2.5',
    pingOffset: 'top-1 right-1',
    gap: 'gap-3',
  },
};

export default function BrandLogo({
  size = 'default',
  showSubtitle = true,
}: BrandLogoProps) {
  const config = sizeConfig[size];

  return (
    <motion.div
      className={`inline-flex items-center ${config.gap}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Icon Container */}
      <motion.div
        className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-brand/10 ring-1 ring-brand/20 shadow-lg shadow-brand/20 ${config.iconContainer}`}
        whileHover={{
          rotate: 8,
          scale: 1.1,
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image
          src="/aditya-lab-logo.png"
          alt="Aditya Labs logo"
          fill
          className="object-cover"
        />

        {/* Active ping dot */}
        <span className={`absolute ${config.pingOffset}`}>
          <span
            className={`absolute inline-flex ${config.ping} rounded-full bg-brand-accent opacity-75 animate-ping`}
          />
          <span
            className={`relative inline-flex ${config.ping} rounded-full bg-brand-accent`}
          />
        </span>
      </motion.div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`${config.title} font-display font-bold tracking-tight leading-none`}>
          <span className="text-white">Aditya</span>
          <span className="bg-linear-to-r from-brand to-brand-accent bg-clip-text text-transparent">
            {' '}Labs
          </span>
        </span>
        {showSubtitle && (
          <span
            className={`${config.subtitle} mt-0.5 uppercase tracking-[0.2em] text-white/40 font-medium`}
          >
            Quantum Intelligence
          </span>
        )}
      </div>
    </motion.div>
  );
}
