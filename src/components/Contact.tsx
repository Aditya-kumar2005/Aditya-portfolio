import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] mb-4">Contact</h2>
            <h3 className="text-4xl md:text-6xl font-display leading-tight mb-8">
              Let's build the <br /> <span className="italic text-brand/80">Future.</span>
            </h3>
            <p className="text-white/50 text-lg mb-12">
              Ready to start your project or just have questions about our technical capabilities? 
              Reach out and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'hello@adityalabs.com' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                { icon: MapPin, label: 'Studio', value: 'New Delhi, India / Remote Global' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand bg-white/5">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                    <div className="font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 flex gap-6">
              {[Linkedin, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-brand transition-colors">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -z-10" />
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand/50 transition-all font-mono text-sm"
                    placeholder="Aditya Kumar"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand/50 transition-all font-mono text-sm"
                    placeholder="aditya@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Service Required</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand/50 transition-all font-mono text-sm appearance-none">
                  <option className="bg-dark">Web Engineering</option>
                  <option className="bg-dark">AI Solutions</option>
                  <option className="bg-dark">Workflow Automation</option>
                  <option className="bg-dark">Mobile Development</option>
                  <option className="bg-dark">Product Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Project Details</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand/50 transition-all font-mono text-sm"
                  placeholder="Tell us about your mission..."
                />
              </div>

              <button className="w-full py-4 bg-white text-dark font-black rounded-xl hover:bg-brand transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-xs">
                Submit Strategy Brief
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
