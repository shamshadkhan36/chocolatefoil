'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutCompany() {
  return (
    <section id="about-section" className="py-20 bg-cream-bg dark:bg-chocolate-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Soft decorative background gold frame */}
            <div className="absolute -inset-4 border border-primary-gold/20 rounded-3xl -z-10 pointer-events-none" />

            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-primary-gold/15">
              <img 
                src="/hero_chocolates.png" 
                alt="Chocolate foil wrapping machinery" 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Float Badge overlay */}
            <div className="absolute -bottom-6 -right-6 bg-chocolate-dark text-white dark:bg-white dark:text-chocolate-dark p-5 rounded-2xl shadow-xl border border-primary-gold/20 flex flex-col items-start gap-1 max-w-xs text-left">
              <span className="text-[9px] uppercase font-bold text-primary-gold tracking-widest">Global Operations</span>
              <p className="text-xs font-serif font-bold leading-tight">Delivering customized packaging to over 35 countries worldwide.</p>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-left space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold font-sans">Our Heritage</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
                The Heritage Behind Premium Wrappers
              </h2>
              <div className="h-0.5 w-16 bg-primary-gold" />
            </div>

            <p className="text-xs sm:text-sm text-chocolate-accent dark:text-cream-light/70 leading-relaxed">
              Founded in Geneva, ChocolateFoil.com has emerged as a globally recognized manufacturer and supplier of luxury confectionery wrapping materials. We specialize in producing food-grade, ultra-pure aluminium foils designed to meet the rigorous demands of chocolate wrapping machines and delicate artisanal hands.
            </p>

            <p className="text-xs sm:text-sm text-chocolate-accent dark:text-cream-light/70 leading-relaxed">
              Our engineering team collaborates directly with master chocolatiers to create bespoke thicknesses and custom grain textures that elevate branding. All our raw materials are sourced from eco-certified refineries and verified for food safety.
            </p>

            {/* List checklist points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Strict food-hygiene control standards',
                'Swiss-designed micro-embossing dies',
                'Solvent-free water-based pigments',
                '100% recyclable post-use'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-gold flex-shrink-0" />
                  <span className="text-xs font-medium text-chocolate-dark dark:text-cream-bg">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="#why-choose-us"
                className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
