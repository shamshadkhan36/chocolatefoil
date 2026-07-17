'use client';

import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Inline Instagram Icon to prevent lucide-react build errors
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramGallery() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=400&auto=format&fit=crop', likes: 324, comments: 24 },
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', likes: 189, comments: 12 },
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', likes: 412, comments: 38 },
    { url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop', likes: 254, comments: 19 },
    { url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=400&auto=format&fit=crop', likes: 301, comments: 21 },
    { url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=400&auto=format&fit=crop', likes: 588, comments: 45 }
  ];

  return (
    <section className="py-20 bg-cream-bg dark:bg-chocolate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Brand Aesthetic</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg flex items-center justify-center gap-2">
            <InstagramIcon className="h-6 w-6 text-primary-gold" />
            <span>Curated Packaging Showcase</span>
          </h2>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group aspect-square rounded-xl overflow-hidden shadow-sm relative cursor-pointer border border-primary-gold/5"
            >
              {/* Cover Image */}
              <img 
                src={img.url} 
                alt="Instagram preview packaging" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Dark Shade overlay */}
              <div className="absolute inset-0 bg-chocolate-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2" />

              {/* Hover stats indicators */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white text-xs font-bold font-sans">
                <div className="flex items-center gap-1">
                  <Heart className="h-4.5 w-4.5 text-primary-gold fill-primary-gold" />
                  <span>{img.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4.5 w-4.5 text-primary-gold" />
                  <span>{img.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
