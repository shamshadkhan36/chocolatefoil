'use client';

import React from 'react';
import { useShop } from '@/context/shop-context';
import { motion } from 'framer-motion';

export default function Categories() {
  const { setSearch } = useShop();

  const cats = [
    { name: 'Chocolate Foils', image: '/color_assortment.png' },
    { name: 'Gold Foils', image: '/gold_foil.png' },
    { name: 'Silver Foils', image: '/silver_foil.png' },
    { name: 'Printed Foils', image: '/printed_foil.png' },
    { name: 'Color Foils', image: '/color_assortment.png' },
    { name: 'Candy Wrappers', image: '/candy_wrappers.png' },
    { name: 'Gift Packaging', image: '/chocolate_box.png' },
    { name: 'Chocolate Boxes', image: '/chocolate_box.png' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    // Set search context to filter by this category
    setSearch('', categoryName);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getOverlayClass = (name: string) => {
    switch (name) {
      case 'Chocolate Foils':
        return 'from-blue-950 via-blue-900/30 to-black/10 group-hover:from-blue-900 group-hover:via-blue-800/40';
      case 'Gold Foils':
        return 'from-amber-950 via-amber-900/30 to-black/10 group-hover:from-amber-900 group-hover:via-amber-800/40';
      case 'Silver Foils':
        return 'from-slate-950 via-slate-900/30 to-black/10 group-hover:from-slate-900 group-hover:via-slate-800/40';
      case 'Printed Foils':
        return 'from-chocolate-dark via-chocolate-dark/30 to-black/10 group-hover:from-chocolate-light group-hover:via-chocolate-medium/40';
      case 'Color Foils':
        return 'from-purple-950 via-purple-900/30 to-black/10 group-hover:from-purple-900 group-hover:via-fuchsia-800/45';
      case 'Candy Wrappers':
        return 'from-red-950 via-red-900/30 to-black/10 group-hover:from-red-900 group-hover:via-rose-800/40';
      case 'Gift Packaging':
        return 'from-emerald-950 via-emerald-900/30 to-black/10 group-hover:from-emerald-900 group-hover:via-teal-800/40';
      case 'Chocolate Boxes':
        return 'from-stone-950 via-stone-900/30 to-black/10 group-hover:from-stone-900 group-hover:via-stone-850/40';
      default:
        return 'from-chocolate-dark via-chocolate-dark/30 to-black/10 group-hover:via-chocolate-dark/40';
    }
  };

  const getBorderHoverClass = (name: string) => {
    switch (name) {
      case 'Chocolate Foils': return 'group-hover:border-blue-400';
      case 'Gold Foils': return 'group-hover:border-primary-gold';
      case 'Silver Foils': return 'group-hover:border-slate-300';
      case 'Color Foils': return 'group-hover:border-fuchsia-400';
      case 'Candy Wrappers': return 'group-hover:border-red-400';
      case 'Gift Packaging': return 'group-hover:border-emerald-400';
      default: return 'group-hover:border-primary-gold';
    }
  };

  return (
    <section className="py-20 bg-cream-light dark:bg-chocolate-medium border-y border-primary-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Visual Curation</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
            Shop By Custom Category
          </h2>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cats.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group aspect-[4/5] rounded-2xl overflow-hidden shadow-md cursor-pointer border border-primary-gold/10 relative"
            >
              {/* Background cover image */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dynamic colored tint overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${getOverlayClass(cat.name)} transition-all duration-300`} />

              {/* Hover highlight border */}
              <div className={`absolute inset-4 border border-primary-gold/15 rounded-xl transition-all duration-500 pointer-events-none ${getBorderHoverClass(cat.name)}`} />

              {/* Category Name */}
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-[9px] font-bold text-primary-gold uppercase tracking-widest">Browse</span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white mt-1 group-hover:text-primary-light-gold transition-colors">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
