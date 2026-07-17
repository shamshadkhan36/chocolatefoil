'use client';

import React from 'react';
import { useShop } from '@/context/shop-context';
import { motion } from 'framer-motion';

export default function Categories() {
  const { setSearch } = useShop();

  const cats = [
    { name: 'Chocolate Foils', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Gold Foils', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
    { name: 'Silver Foils', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
    { name: 'Printed Foils', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Color Foils', image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Candy Wrappers', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=400&auto=format&fit=crop' },
    { name: 'Gift Packaging', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=400&auto=format&fit=crop' },
    { name: 'Chocolate Boxes', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=400&auto=format&fit=crop' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    // Set search context to filter by this category
    setSearch('', categoryName);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-chocolate-dark/30 to-black/10 group-hover:via-chocolate-dark/40 transition-colors duration-300" />

              {/* Hover highlight border */}
              <div className="absolute inset-4 border border-primary-gold/20 group-hover:border-primary-gold/60 rounded-xl transition-colors duration-500 pointer-events-none" />

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
