'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Team from '@/components/sections/Team';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonials from '@/components/sections/Testimonials';
import AIDemo from '@/components/sections/AIDemo';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import Impact from '@/components/sections/Impact';
import Industries from '@/components/sections/Industries';
import TechStack from '@/components/sections/TechStack';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Impact />
        <Services />
        <Industries />
        <Process />
        <Team />
        <CaseStudies />
        <TechStack />
        <Testimonials />
        <AIDemo />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
