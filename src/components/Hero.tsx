import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-mono mb-8 uppercase tracking-widest"
          >
            <Sparkles size={14} />
            The Future of Digital Systems
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-display leading-[0.9] tracking-tighter mb-8"
          >
            WE BUILD <span className="text-brand italic">SYSTEMS</span> <br /> 
            THAT GROW <span className="font-sans font-bold">DIGITAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12"
          >
            Aditya Labs is a premium digital agency specialized in crafting sophisticated websites, 
            mobile applications, and AI-driven automation systems for modern enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand text-dark font-bold rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 group"
            >
              Book a Strategy Call
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
            >
              View Our Work
            </a>
          </motion.div>
        </div>

        {/* Stats Section or Visual Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Successful Projects', value: '50+' },
            { label: 'Client Satisfaction', value: '100%' },
            { label: 'AI Integrations', value: '20+' },
            { label: 'Global Reach', value: '12' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold font-mono text-white mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
