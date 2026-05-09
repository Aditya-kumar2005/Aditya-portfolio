import { motion } from 'motion/react';
import { Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Cpu className="text-brand w-8 h-8" />
            <span className="text-2xl font-bold tracking-tighter uppercase font-mono">
              Aditya<span className="text-brand">Labs</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {['Services', 'Portfolio', 'AI Demo', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm uppercase tracking-widest font-medium text-white/70 hover:text-brand transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/70 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Services', 'Portfolio', 'AI Demo', 'Pricing', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block px-3 py-4 text-base font-medium text-white/70 hover:text-brand hover:bg-white/5 transition-all text-center"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
