import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Nexora AI Console',
    category: 'AI Platform',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    description: 'A comprehensive RAG-based dashboard for enterprise data intelligence.',
    tags: ['React', 'Gemini API', 'Tailwind']
  },
  {
    title: 'VectorRise Real Estate',
    category: 'Web Engineering',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance property listing platform with integrated lead management.',
    tags: ['Next.js', 'Firestore', 'Fmotion']
  },
  {
    title: 'AutoStream CRM',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Custom-built CRM system automating sales workflows for small businesses.',
    tags: ['Node.js', 'API Integration', 'React']
  },
  {
    title: 'Loanflow App',
    category: 'Mobile Dev',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    description: 'Personal finance tracking application with intuitive data visualizations.',
    tags: ['React Native', 'Supabase', 'D3.js']
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-display leading-tight">
              Selected <span className="italic text-brand/80">Artifacts.</span>
            </h3>
          </div>
          <a 
            href="https://github.com/Aditya-kumar2005?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="text-brand hover:text-white transition-colors flex             items-center gap-2 font-mono text-sm uppercase tracking-widest">
                View All GitHub Repos <ExternalLink size={16} />
              </button>
            </a>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-surface">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                    </button>
                    <button className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform border border-white/10">
                      <Github size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-brand mb-2 uppercase tracking-widest">{project.category}</div>
                  <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                  <p className="text-white/50 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
