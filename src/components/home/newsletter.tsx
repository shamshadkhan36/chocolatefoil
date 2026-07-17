'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 2500);
  };

  return (
    <section id="newsletter-section" className="py-20 bg-chocolate-dark relative overflow-hidden border-t border-primary-gold/15 scroll-mt-16">
      
      {/* Decorative vector shine bg */}
      <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full bg-primary-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-10 top-10 w-96 h-96 rounded-full bg-primary-gold/5 blur-[120px] pointer-events-none" />

      {/* Main card box with double border */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="border border-primary-gold/20 rounded-3xl p-8 sm:p-16 bg-chocolate-medium/40 backdrop-blur-md relative overflow-hidden">
          
          <div className="absolute inset-2 border border-primary-gold/5 rounded-2xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-6">
            <div className="inline-flex h-12 w-12 rounded-2xl bg-primary-gold/10 border border-primary-gold/20 items-center justify-center text-primary-gold mx-auto">
              <Mail className="h-6 w-6" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
                Stay Updated With Custom Catalogs
              </h2>
              <p className="text-xs sm:text-sm text-cream-light/65 leading-relaxed">
                Join our premium mailing list to receive quarterly updates on new foil finishes, free template vectors, and seasonal bulk discounts.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-primary-gold/10 border border-primary-gold/20 p-4 rounded-xl max-w-md mx-auto flex items-center justify-center gap-2 text-primary-gold text-xs font-bold font-sans"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 animate-bounce" />
                  <span>Welcome to ChocolateFoil Insider. Check your inbox!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                  <input 
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-primary-gold/25 rounded-xl px-4 py-3 text-xs text-white placeholder-cream-light/45 focus:outline-none focus:border-primary-gold"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </AnimatePresence>

            <p className="text-[10px] text-cream-light/35 font-sans">We value your business privacy. Zero spam, unsubscribe anytime.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
