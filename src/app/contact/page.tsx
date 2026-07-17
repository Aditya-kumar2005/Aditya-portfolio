
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { z } from 'zod';
import { InquirySchema } from '@/lib/validators';

type FormData = z.infer<typeof InquirySchema>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const result = InquirySchema.safeParse(formData);

    if (!result.success) {
      setValidationErrors(result.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorData = await res.json();
        // Handle server-side validation errors if any
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
              Let's <span className="text-brand">Connect</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Have a question or ready to start a project? We'd love to hear from you.
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
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/8 outline-none"
                      placeholder="Your name"
                    />
                    {validationErrors.name && <p className="mt-2 text-xs text-red-500">{validationErrors.name[0]}</p>}
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
                      className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/8 outline-none"
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && <p className="mt-2 text-xs text-red-500">{validationErrors.email[0]}</p>}
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
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder:text-white/40 border border-white/10 transition-colors focus:border-brand focus:bg-white/8 outline-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {validationErrors.message && <p className="mt-2 text-xs text-red-500">{validationErrors.message[0]}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-brand px-6 py-4 font-semibold text-dark shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
