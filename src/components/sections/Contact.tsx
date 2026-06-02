'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FormState = 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'

interface FormData {
  name: string
  email: string
  service: string
  message: string
}

// ---------------------------------------------------------------------------
// Contact info items
// ---------------------------------------------------------------------------

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'adityalabs87@gmail.com',
    href: 'mailto:adityalabs87@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'Chat',
    value: 'Available 24/7 via AI',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Digital-first Agency',
    href: null,
  },
]

// ---------------------------------------------------------------------------
// Product needs options
// ---------------------------------------------------------------------------

const PRODUCT_NEEDS = [
  'SaaS Development',
  'AI Integration',
  'UI/UX Design',
  'Maintenance & Scale',
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('IDLE')
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (formState === 'SENDING') return

    setFormState('SENDING')
    setErrorMsg('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit. Please try again.')
      }

      setFormState('SUCCESS')
      setFormData({ name: '', email: '', service: '', message: '' })
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
      setFormState('ERROR')
    }
  }

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.service &&
    formData.message.trim()

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-medium text-brand">
              <Mail className="size-3.5" />
              Contact us
            </span>

            <h2 className="heading-display mt-2 text-3xl sm:text-4xl lg:text-5xl text-white">
              Let&apos;s build your{' '}
              <span className="text-brand">next big thing.</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/40">
              Have a product idea that needs world-class execution? Whether
              you&apos;re a startup founder or an enterprise team, we&apos;d
              love to hear from you. Reach out and let&apos;s explore how
              Aditya Labs can turn your vision into reality.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              {CONTACT_INFO.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/30">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-white/70 transition-colors hover:text-brand"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/70">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Location tagline */}
            <p className="mt-8 text-sm text-white/20">
              Operating globally from New York & Bangalore
            </p>
          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bento-card">
              <AnimatePresence mode="wait">
                {formState === 'SUCCESS' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        damping: 15,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="mb-5 flex size-16 items-center justify-center rounded-full bg-emerald-500/10"
                    >
                      <CheckCircle2 className="size-8 text-emerald-400" />
                    </motion.div>
                    <h3 className="heading-display mb-2 text-xl text-white">
                      Message sent!
                    </h3>
                    <p className="max-w-xs text-sm text-white/40">
                      Thanks for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => setFormState('IDLE')}
                      className="mt-6 rounded-xl border border-white/8 bg-white/3 px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/6 hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name + Email Row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-white/40"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Your name"
                          disabled={formState === 'SENDING'}
                          className="w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-white/40"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@example.com"
                          disabled={formState === 'SENDING'}
                          className="w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                        />
                      </div>
                    </div>

                    {/* Product Needs Dropdown */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-medium text-white/40"
                      >
                        Product Needs
                      </label>
                      <select
                        id="contact-service"
                        required
                        value={formData.service}
                        onChange={(e) => updateField('service', e.target.value)}
                        disabled={formState === 'SENDING'}
                        className="w-full rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/15 disabled:opacity-40 [&>option]:bg-surface [&>option]:text-white"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {PRODUCT_NEEDS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-white/40"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Tell us about your project..."
                        disabled={formState === 'SENDING'}
                        className="w-full resize-none rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {formState === 'ERROR' && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5"
                        >
                          <AlertCircle className="size-4 shrink-0 text-red-400" />
                          <span className="text-xs text-red-400">{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'SENDING' || !isFormValid}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary hover:shadow-brand/40 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-brand disabled:hover:shadow-brand/25"
                    >
                      {formState === 'SENDING' ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Send Message
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
