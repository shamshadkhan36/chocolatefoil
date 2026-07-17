'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  location: string;
  rating: number;
}

export default function Testimonials() {
  const list: Testimonial[] = [
    {
      id: 1,
      quote: "ChocolateFoil.com has redefined our collection packaging. The gold sheets wrap cleanly around our truffles without tearing, and the dead-fold is exceptionally tight. The unboxing experience is sheer luxury.",
      author: "Valérie Dupont",
      company: "Maison du Chocolat",
      location: "Geneva, Switzerland",
      rating: 5
    },
    {
      id: 2,
      quote: "We run high-speed mechanical wrappers. Since switching to ChocolateFoil's master rolls, our machine downtime has dropped by 18%. The thickness consistency across batches is outstanding.",
      author: "Marcus Sterling",
      company: "Sterling Chocolatiers",
      location: "London, UK",
      rating: 5
    },
    {
      id: 3,
      quote: "Our bespoke embossed printed foil sheets arrived exactly as scheduled. Pre-press files were double-checked for alignment, resulting in a spotless registration print. Our retail sales jumped significantly.",
      author: "Stefan K.",
      company: "Bavarian Artisanal Sweets",
      location: "Munich, Germany",
      rating: 5
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  // Auto slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [list.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % list.length);
  };

  return (
    <section id="testimonials-section" className="py-20 bg-cream-light dark:bg-chocolate-medium border-y border-primary-gold/15 scroll-mt-16 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Section header */}
        <div className="space-y-3 mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold font-sans">Global Validation</span>
          <h2 className="text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
            Trusted By Luxury Confectioners
          </h2>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[220px] sm:min-h-[180px] bg-white/40 dark:bg-chocolate-dark/30 border border-primary-gold/10 rounded-3xl p-8 sm:p-12 shadow-md">
          <Quote className="absolute top-6 left-6 h-8 w-8 text-primary-gold/15 rotate-180" />
          <Quote className="absolute bottom-6 right-6 h-8 w-8 text-primary-gold/15" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Star rating */}
              <div className="flex justify-center gap-1 text-yellow-500">
                {[...Array(list[activeIdx].rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-sm font-serif italic text-chocolate-dark dark:text-cream-bg leading-relaxed max-w-2xl mx-auto">
                "{list[activeIdx].quote}"
              </p>

              {/* Author info */}
              <div>
                <p className="text-xs font-bold text-chocolate-dark dark:text-cream-bg font-sans">{list[activeIdx].author}</p>
                <p className="text-[10px] text-primary-gold font-semibold uppercase tracking-wider mt-0.5">
                  {list[activeIdx].company} | {list[activeIdx].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={handlePrev}
            className="h-10 w-10 border border-primary-gold/20 hover:border-primary-gold rounded-full flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-chocolate-dark transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === i ? 'w-6 bg-primary-gold' : 'w-2 bg-primary-gold/25'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="h-10 w-10 border border-primary-gold/20 hover:border-primary-gold rounded-full flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-chocolate-dark transition-all duration-300 shadow-sm cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
