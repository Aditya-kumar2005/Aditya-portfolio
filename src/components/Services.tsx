import { motion } from 'motion/react';
import { Globe, Smartphone, Bot, Zap, Code, BarChart } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Engineering',
    description: 'High-performance, visual-first websites and e-commerce solutions built with modern frameworks.',
    features: ['React/Next.js', 'Custom CMS', 'SEO Optimization']
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    description: 'Intelligent RAG chatbots, automated workflows, and data classification systems using LLMs.',
    features: ['Custom GPTs', 'Workflow Automation', 'RAG Systems']
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Eliminate manual tasks with sophisticated CRM, Email, and WhatsApp automation systems.',
    features: ['CRM Integration', 'API Bridges', '24/7 Monitoring']
  },
  {
    icon: Smartphone,
    title: 'Mobile App Dev',
    description: 'Cross-platform mobile applications that provide seamless experiences on iOS and Android.',
    features: ['React Native', 'MVP Development', 'App Store Prep']
  },
  {
    icon: Code,
    title: 'Product Engineering',
    description: 'Full-cycle product development from prototyping to scalable production environments.',
    features: ['SaaS Development', 'Cloud Architecture', 'Security First']
  },
  {
    icon: BarChart,
    title: 'Growth Consulting',
    description: 'Technical strategy to help businesses scale their digital presence and lead generation.',
    features: ['Lead Capturing', 'Conversion Audit', 'Scale Strategy']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] mb-4">What we do</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h3 className="text-4xl md:text-6xl font-display leading-tight">
              Elite Technical <br /> <span className="italic text-brand/80">Expertise.</span>
            </h3>
            <p className="max-w-md text-white/50 text-lg">
              We combine deep engineering roots with modern aesthetic standards to build tools that define industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-2xl group transition-all hover:bg-white/10"
            >
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-6 border border-brand/20">
                <service.icon size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                {service.title}
              </h4>
              <p className="text-white/50 mb-6 line-clamp-3">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="text-xs font-mono text-white/40 flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
