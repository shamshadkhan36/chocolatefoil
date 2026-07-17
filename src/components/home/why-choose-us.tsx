'use client';

import React from 'react';
import { 
  HeartHandshake, Sparkles, Ruler, Flame, 
  Layers, Globe2, CircleDollarSign, HeadphonesIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const points = [
    {
      icon: <HeartHandshake className="h-5 w-5 text-primary-gold" />,
      title: "100% Food Safe Material",
      desc: "Pure primary aluminium foil laminated and lacquered using zero toxic emissions or chemical trace materials."
    },
    {
      icon: <Sparkles className="h-5 w-5 text-primary-gold" />,
      title: "Premium Finish",
      desc: "Exceptional mirror shine on bright variants and fine micro-textured grids on embossed variations."
    },
    {
      icon: <Ruler className="h-5 w-5 text-primary-gold" />,
      title: "Custom Sizes",
      desc: "Slit to specific widths from 50mm to 1000mm and cut to bespoke squares to fit your moulds exactly."
    },
    {
      icon: <Flame className="h-5 w-5 text-primary-gold" />,
      title: "Fast Production",
      desc: "State of the art annealing furnaces and high-speed rotogravure presses ensure fast project turnaround."
    },
    {
      icon: <Layers className="h-5 w-5 text-primary-gold" />,
      title: "Bulk Orders",
      desc: "Capacity to process heavy industrial contracts exceeding 50 metric tons monthly with full batch consistency."
    },
    {
      icon: <Globe2 className="h-5 w-5 text-primary-gold" />,
      title: "Worldwide Delivery",
      desc: "LCL and FCL ocean freight forwarding, combined with express air courier options for sample approval."
    },
    {
      icon: <CircleDollarSign className="h-5 w-5 text-primary-gold" />,
      title: "Affordable Pricing",
      desc: "Factory-direct quotes matching bulk scales to secure your confection business profitability."
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5 text-primary-gold" />,
      title: "Excellent Support",
      desc: "Live phone consulting and custom PDF template assistance from expert packaging specialists."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-cream-bg dark:bg-chocolate-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Corporate Trust</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
            Why Masters Choose ChocolateFoil
          </h2>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex gap-4 text-left p-4 rounded-xl hover:bg-chocolate-dark/5 dark:hover:bg-white/5 transition-colors duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/25 flex items-center justify-center flex-shrink-0 text-primary-gold mt-1">
                {pt.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-bold text-chocolate-dark dark:text-cream-bg">{pt.title}</h3>
                <p className="text-[11px] text-chocolate-accent dark:text-cream-light/60 leading-relaxed">{pt.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
