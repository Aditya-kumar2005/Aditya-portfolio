import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$150-$200',
    description: 'Perfect for small businesses establishing their first digital presence.',
    features: [
      'Business Website',
      'Basic Mobile Design',
      'Contact Forms',
      'SEO Foundations',
      '1 Month Support'
    ],
    accent: false
  },
  {
    name: 'Growth',
    price: '$200-$300',
    description: 'Advanced solutions for companies ready to automate and scale.',
    features: [
      'Everything in Starter',
      'AI Chatbot Integration',
      'Lead Capturing System',
      'API Integrations',
      '3 Months Support'
    ],
    accent: true
  },
  {
    name: 'Enterprise',
    price: '$300-$500',
    description: 'Mission-critical systems and complete AI transformations.',
    features: [
      'Everything in Growth',
      'Custom RAG Systems',
      'Full Workflow Automation',
      'Priority Security Audit',
      'Lifetime Updates'
    ],
    accent: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] mb-4">Investment</h2>
          <h3 className="text-4xl md:text-6xl font-display leading-tight">
            Transparent <span className="italic text-brand/80">Packages.</span>
          </h3>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Choose the level of digital transformation that matches your business goals. 
            All packages are customizable based on specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl flex flex-col border ${
                tier.accent 
                  ? 'bg-brand/5 border-brand/20 relative overflow-hidden' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {tier.accent && (
                <div className="absolute top-4 right-4 bg-brand text-dark px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest">
                  Popular
                </div>
              )}
              <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-display font-black">{tier.price}</span>
                <span className="text-white/40 text-xs">/ project</span>
              </div>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                {tier.description}
              </p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-brand" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                tier.accent 
                  ? 'bg-brand text-dark hover:bg-white' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}>
                Get Started
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 glass rounded-3xl border border-white/10 text-center">
          <h4 className="text-xl font-bold mb-2">Need a custom enterprise solution?</h4>
          <p className="text-white/50 mb-6">We provide dedicated engineering teams and retainer models for large-scale operations.</p>
          <a href="#contact" className="text-brand hover:underline font-mono uppercase tracking-widest text-sm">
            Talk to a Specialist
          </a>
        </div>
      </div>
    </section>
  );
}
