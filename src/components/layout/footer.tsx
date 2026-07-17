'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, ArrowRight, CheckCircle, ShieldCheck, Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG icons for social channels to avoid compilation dependencies
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-chocolate-dark border-t border-primary-gold/15 text-cream-light/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-primary-gold/10">
          
          {/* Column 1: Brand Profile */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold tracking-wider text-white">
                Chocolate<span className="text-primary-gold">Foil</span>
                <span className="text-xs font-sans align-super text-primary-light-gold">.com</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-cream-light/60">
              The international benchmark for luxury food-grade confectionery packaging. Supporting master chocolatiers and boutique brands globally with pristine, safe, and custom-designed foils.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <InstagramIcon className="h-4 w-4" />, href: 'https://instagram.com' },
                { icon: <FacebookIcon className="h-4 w-4" />, href: 'https://facebook.com' },
                { icon: <TwitterIcon className="h-4 w-4" />, href: 'https://twitter.com' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-8 w-8 rounded-full border border-primary-gold/20 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-chocolate-dark transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-primary-gold uppercase tracking-widest mb-6 border-b border-primary-gold/20 pb-2">Quick Navigation</h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Home Storefront', href: '/' },
                { label: 'Browse Products', href: '/#products-section' },
                { label: 'Custom Printing Services', href: '/#custom-section' },
                { label: 'Why Choose Us', href: '/#why-choose-us' },
                { label: 'Customer Testimonials', href: '/#testimonials-section' },
                { label: 'Admin Dashboard', href: '/admin' }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary-gold transition-colors hover:translate-x-1 duration-200 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories & Support */}
          <div>
            <h4 className="text-xs font-bold text-primary-gold uppercase tracking-widest mb-6 border-b border-primary-gold/20 pb-2">Categories</h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: 'Luxury Gold Foils', href: '/#products-section' },
                { label: 'Prismatic Color Foils', href: '/#products-section' },
                { label: 'Embossed Pattern Sheets', href: '/#products-section' },
                { label: 'Bespoke Chocolate Boxes', href: '/#products-section' },
                { label: 'Foil Wrapping Rolls', href: '/#products-section' },
                { label: 'Privacy Policy', href: '/account' }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-primary-gold transition-colors hover:translate-x-1 duration-200 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-primary-gold uppercase tracking-widest mb-4 border-b border-primary-gold/20 pb-2">Contact Details</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-gold flex-shrink-0" />
                  <span>14 Avenue de la Concorde, Geneva, Switzerland</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary-gold flex-shrink-0" />
                  <span>+41 22 795 8900</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-gold flex-shrink-0" />
                  <span>concierge@chocolatefoil.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary-gold mb-2">Subscribe to Catalog</h5>
              <AnimatePresence>
                {subscribed ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs text-primary-gold bg-primary-gold/10 p-2.5 rounded-xl border border-primary-gold/20"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Catalog subscription active!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="relative">
                    <input 
                      type="email" 
                      placeholder="Your Business Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-primary-gold/20 rounded-xl py-2 px-3 pr-10 text-xs text-white placeholder-cream-light/40 focus:outline-none focus:border-primary-gold"
                      required
                    />
                    <button 
                      type="submit" 
                      className="absolute right-1 top-1 bg-primary-gold text-chocolate-dark p-1.5 rounded-lg hover:bg-primary-dark-gold transition-colors"
                    >
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-cream-light/40">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-gold" />
            <span>100% FDA Approved Materials | ISO 9001 Certified Manufacturing</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>© 2026 ChocolateFoil.com. Crafted with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for Chocolate Craftsmen.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
