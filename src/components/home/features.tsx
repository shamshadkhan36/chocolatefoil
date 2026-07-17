'use client';

import React from 'react';
import { ShieldCheck, Truck, Printer, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-7 w-7 text-primary-gold" />,
      title: "Food Grade Quality",
      desc: "100% sterile, food-safe, pure aluminium foils complying with strict international FDA and EU regulations."
    },
    {
      icon: <Truck className="h-7 w-7 text-primary-gold" />,
      title: "Fast Worldwide Shipping",
      desc: "Direct express freight packaging transport channels. Secure wooden crate protection for bulk rolls."
    },
    {
      icon: <Printer className="h-7 w-7 text-primary-gold" />,
      title: "Custom Printed Foils",
      desc: "Rotogravure printing up to 8 colors and textured logo embossing with zero registration alignment errors."
    },
    {
      icon: <Award className="h-7 w-7 text-primary-gold" />,
      title: "Premium Manufacturing",
      desc: "Annealed to O temper state for superior dead-fold capability that holds the tightest twists around pralines."
    }
  ];

  return (
    <section className="py-20 bg-cream-bg dark:bg-chocolate-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Engineering Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
            Pristine Foil Solutions For Confectioners
          </h2>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-premium p-6 rounded-2xl flex flex-col justify-between items-start text-left group transition-all duration-300 relative overflow-hidden"
            >
              {/* Card glowing gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-chocolate-dark/5 dark:bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 border border-primary-gold/10">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-chocolate-dark dark:text-cream-bg">
                  {item.title}
                </h3>
                <p className="text-xs text-chocolate-accent dark:text-cream-light/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Animated Bottom Line */}
              <div className="h-0.5 bg-primary-gold absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
