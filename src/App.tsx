/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import AIDemo from './components/AIDemo';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen grid-pattern selection:bg-brand selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <AIDemo />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
