import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return new GoogleGenAI(key);
};

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm the Aditya Labs AI Assistant. How can I help you transform your business today? I can tell you about our services, pricing, or technical stack."
};

export default function AIDemo() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = getAI();
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are the AI Consultant for Aditya Labs, a premium digital agency. 
        The agency provides Web Engineering, Mobile Apps, AI Solutions (Chatbots, RAG, Automation), and Workflow Automation.
        The founder is Aditya Kumar.
        Be professional, tech-forward, and helpful. 
        Encourage the user to book a call if they have specific needs.
        Keep responses concise and interesting.`,
      });

      const response = await model.generateContent({
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      });

      const aiContent = response.response.text() || "I'm sorry, I encountered an issue processing that.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error && error.message.includes('GEMINI_API_KEY')
        ? "AI integration is not configured. Please add your GEMINI_API_KEY in the Secrets panel."
        : "Error: I'm currently experiencing technical difficulties. Please try again later.";
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-demo" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-mono text-brand uppercase tracking-[0.3em] mb-4">Interactive Demo</h2>
            <h3 className="text-4xl md:text-6xl font-display leading-tight mb-6">
              Experience the <br /> <span className="italic text-brand/80">Intelligence.</span>
            </h3>
            <p className="text-white/50 text-lg mb-8">
              We don't just talk about AI—we build it. Interact with our custom-trained 
              consultant to see how we can assist in your digital transformation.
            </p>
            <div className="space-y-4">
              {[
                "Tell me about your AI packages",
                "How do you handle security?",
                "What's your typical timeline?",
              ].map((query, i) => (
                <button
                  key={i}
                  onClick={() => setInput(query)}
                  className="block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/40 hover:text-brand hover:border-brand/40 transition-all uppercase tracking-widest"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden flex flex-col h-[600px] border border-white/10 shadow-2xl relative">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">Aditya Labs AI</div>
                  <div className="text-[10px] uppercase tracking-widest text-brand flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    Online Consultant
                  </div>
                </div>
              </div>
              <Sparkles className="text-brand/30" size={20} />
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              <AnimatePresence initial={false}>
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                        message.role === 'user' 
                          ? 'bg-brand/10 border-brand/20 text-brand' 
                          : 'bg-white/5 border-white/10 text-white'
                      }`}>
                        {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user' 
                          ? 'bg-brand text-dark font-medium' 
                          : 'bg-white/5 border border-white/10 text-white/80'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Loader2 size={16} className="animate-spin text-brand" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all pr-12"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-brand hover:text-white transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
