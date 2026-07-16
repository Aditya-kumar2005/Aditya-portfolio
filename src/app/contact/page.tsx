'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-display mb-6 text-5xl md:text-6xl lg:text-7xl">
              Let&apos;s <span className="text-brand">Connect</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Have a question or ready to start a project? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-3 mb-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Email */}
              <div>
                <div className="mb-3 inline-block rounded-lg bg-brand/10 p-3">
                  <Mail className="size-6 text-brand" />
                </div>
                <h3 className="mb-2 font-semibold">Email</h3>
                <a href="mailto:aditya@adityalab.ai" className="text-white/70 hover:text-brand transition-colors">
                  aditya@adityalab.ai
                </a>
              </div>

              {/* Phone */}
              <div>
                <div className="mb-3 inline-block rounded-lg bg-brand/10 p-3">
                  <Phone className="size-6 text-brand" />
                </div>
                <h3 className="mb-2 font-semibold">Phone</h3>
                <a href="tel:+1234567890" className="text-white/70 hover:text-brand transition-colors">
                  +1 (234) 567-890
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="mb-3 inline-block rounded-lg bg-brand/10 p-3">
                  <MapPin className="size-6 text-brand" />
                </div>
                <h3 className="mb-2 font-semibold">Location</h3>
                <p className="text-white/70">San Francisco, CA</p>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="mb-4 font-semibold">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: 'https://github.com', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-white/5 p-3 text-white/60 transition-all hover:bg-brand/10 hover:text-brand"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {submitted && (
                <motion.div
                  className="mb-6 rounded-lg bg-brand/20 p-4 text-brand border border-brand/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none"
                      placeholder="Project inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/[0.08] outline-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-brand px-6 py-4 font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send className="size-5" />}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
