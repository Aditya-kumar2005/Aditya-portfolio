import { Cpu } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="text-brand w-8 h-8" />
              <span className="text-2xl font-bold tracking-tighter uppercase font-mono">
                Aditya<span className="text-brand">Labs</span>
              </span>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              An elite digital collective engineering the next generation of business systems. 
              We solve complex problems through superior design and advanced AI integrations.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Services', 'Portfolio', 'AI Demo', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/40 hover:text-brand transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-mono text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/40 hover:text-brand transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono tracking-widest text-white/30">
          <div>© {currentYear} ADITYA LABS. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="http://www.linkedin.com/in/aditya-kumar-b4874235b" className="hover:text-brand transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-brand transition-colors">TWITTER</a>
            <a href="#" className="hover:text-brand transition-colors">INSTAGRAM</a>
          </div>
          <div>BUILT WITH PRECISION BY ADITYA</div>
        </div>
      </div>
    </footer>
  );
}
