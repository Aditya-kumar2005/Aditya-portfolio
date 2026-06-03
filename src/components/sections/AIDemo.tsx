'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Loader2, Sparkles, Zap, Server, MessageSquare, Calendar, ShoppingCart } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const demos = [
  { 
    title: 'AI Customer Support', 
    icon: MessageSquare, 
    description: 'Ask our AI about our services, pricing, and process.',
    initialMessages: [
      {
        role: 'assistant',
        content:
          "Hi! I'm the Aditya Labs AI Assistant. I can help you learn about our services, process, and how we can bring your product idea to life. What would you like to know?",
      },
    ],
  },
  { 
    title: 'AI Appointment Booking', 
    icon: Calendar, 
    description: 'Book a demo call with our team through our AI assistant.',
    initialMessages: [
      {
        role: 'assistant',
        content:
          "Hello! I can help you book a 30-minute demo call with our team. To get started, please provide your name and email address.",
      },
    ],
  },
  { 
    title: 'AI Sales Assistant', 
    icon: ShoppingCart, 
    description: 'Get personalized recommendations for your project.',
    initialMessages: [
      {
        role: 'assistant',
        content:
          "Welcome! I'm your AI Sales Assistant. Tell me about your project, and I'll recommend the best services and technologies for your needs.",
      },
    ],
  },
];

export default function AIDemo() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(demos[activeDemo].initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(demos[activeDemo].initialMessages);
  }, [activeDemo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== 'assistant' || m !== messages[0])
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response. Please try again.');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message || "I'd love to help! Could you tell me more?",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-medium text-brand">
            <Bot className="size-3.5" />
            Live AI Demos
          </span>
          <h2 className="heading-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-white">
            Experience Our AI in <span className="text-brand">Action</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {demos.map((demo, index) => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.title}
                  onClick={() => setActiveDemo(index)}
                  className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${activeDemo === index ? 'border-brand/50 bg-brand/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${activeDemo === index ? 'bg-brand/20 text-brand' : 'bg-white/10 text-white/60 group-hover:bg-brand/20 group-hover:text-brand'}`}>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className={`font-semibold text-white ${activeDemo === index ? 'text-brand' : ''}`}>
                      {demo.title}
                    </h3>
                    <p className="text-sm text-white/50">
                      {demo.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bento-card flex h-150 flex-col overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/6 px-5 py-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand/10">
                  <Bot className="size-5 text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {demos[activeDemo].title}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400/80">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={`${msg.role}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-brand text-white rounded-br-md'
                            : 'bg-white/5 text-white/80 rounded-bl-md'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white/5 px-4 py-3">
                        <Loader2 className="size-4 animate-spin text-brand" />
                        <span className="text-xs text-white/40">
                          Thinking...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-center"
                    >
                      <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-center text-xs text-red-400">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-white/6 px-4 py-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask the ${demos[activeDemo].title}...`}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/6 bg-white/3 px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/15 disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex size-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-secondary hover:shadow-brand/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
