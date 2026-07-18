'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Send } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-chocolate-dark overflow-hidden pt-20">
      
      {/* Decorative luxury backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#3d2113_0%,#1c0f0a_60%,#0a0503_100%)]" />
      
      {/* Floating Gold Dust Elements (Background) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-gold"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Floating Gold Foil Particles (Foreground) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Foil Wrapper 1 */}
        <motion.div
          className="absolute h-14 w-14 bg-gradient-to-tr from-primary-gold to-primary-light-gold rounded-lg shadow-lg border border-white/20 flex items-center justify-center text-[10px] text-chocolate-dark font-serif font-bold uppercase opacity-80"
          style={{ left: '8%', top: '25%', rotate: '15deg' }}
          animate={{
            y: [0, -25, 0],
            rotate: [15, 30, 15],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          Gold
        </motion.div>
        
        {/* Floating Foil Wrapper 2 */}
        <motion.div
          className="absolute h-10 w-10 bg-gradient-to-tr from-red-500 to-rose-400 rounded-full shadow-lg border border-white/20 flex items-center justify-center text-[8px] text-white font-bold opacity-75"
          style={{ right: '12%', top: '15%', rotate: '-10deg' }}
          animate={{
            y: [0, -15, 0],
            rotate: [-10, -25, -10],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          Ruby
        </motion.div>

        {/* Floating Chocolate Bar Piece */}
        <motion.div
          className="absolute h-12 w-16 bg-[#3d2314] rounded-md shadow-2xl border border-chocolate-dark/30 flex flex-col justify-between p-1 text-[8px] text-white/40 font-bold opacity-60"
          style={{ left: '4%', bottom: '20%', rotate: '-25deg' }}
          animate={{
            y: [0, -20, 0],
            rotate: [-25, -10, -25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="border-b border-white/10 pb-0.5">FINE</div>
          <div className="text-right">COCOA</div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-gold/15 border border-primary-gold/30 px-3.5 py-1.5 rounded-full text-primary-gold">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest font-sans">Premium Foil Collection</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Premium Chocolate Foils for <br />
              <span className="text-primary-gold italic">Every Sweet Creation</span>
            </h1>
            
            <p className="text-sm sm:text-base text-cream-light/75 leading-relaxed max-w-xl">
              Elevate your confectionery brand with our premium food-grade aluminium foils. Specifically engineered to preserve freshness and provide an elegant, premium presentation for gourmet chocolates, truffles, and bars.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#products-section"
                className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark text-center font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-primary-gold/15 hover:shadow-primary-gold/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop Collection</span>
              </a>
              
              <a 
                href="#custom-section"
                className="border border-primary-gold/40 hover:border-primary-gold text-white text-center font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4 text-primary-gold" />
                <span>Request Custom Print</span>
              </a>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-primary-gold">100%</p>
                <p className="text-[10px] text-cream-light/50 uppercase font-sans font-bold tracking-wider mt-0.5">FDA Food Safe</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-primary-gold">35+</p>
                <p className="text-[10px] text-cream-light/50 uppercase font-sans font-bold tracking-wider mt-0.5">Countries Served</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif font-bold text-primary-gold">8+</p>
                <p className="text-[10px] text-cream-light/50 uppercase font-sans font-bold tracking-wider mt-0.5">Color Finishes</p>
              </div>
            </div>
          </motion.div>

          {/* Right Product Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Soft gold glow ring */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-primary-gold/10 blur-[80px] -z-10" />

            {/* Collage Showcase */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-primary-gold/20 bg-chocolate-medium/40 p-4">
              
              {/* Main Luxury chocolate display image */}
              <div className="h-full w-full rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop" 
                  alt="Luxury chocolates wrapped in gold foil" 
                  className="h-full w-full object-cover select-none"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-transparent to-transparent flex flex-col justify-end p-6" >
                  <span className="text-[9px] uppercase tracking-widest text-primary-gold font-bold">Featured Packaging</span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">Gourmet Box Gold Lining</h3>
                </div>
              </div>

              {/* Smaller floating product badge */}
              <motion.div 
                className="absolute bottom-6 right-6 bg-white dark:bg-chocolate-dark p-3.5 rounded-2xl shadow-xl border border-primary-gold/20 flex items-center gap-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=80&auto=format&fit=crop" 
                  alt="Roll preview" 
                  className="h-10 w-10 object-cover rounded-lg border border-primary-gold/10"
                />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-chocolate-dark dark:text-cream-bg uppercase tracking-wide">Foil Rolls</p>
                  <p className="text-xs font-bold text-primary-gold">In Stock</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
