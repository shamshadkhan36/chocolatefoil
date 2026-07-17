'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center space-y-2 p-6">
      <motion.p 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-serif font-bold text-primary-gold"
      >
        {count}{suffix}
      </motion.p>
      <div className="h-0.5 w-8 bg-primary-gold/30 mx-auto" />
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-chocolate-accent dark:text-cream-light/60">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const data = [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 5000, suffix: '+', label: 'Happy Customers' },
    { value: 120, suffix: '+', label: 'Product Variants' },
    { value: 35, suffix: '+', label: 'Countries Served' }
  ];

  return (
    <section className="py-12 bg-chocolate-dark border-t border-primary-gold/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-primary-gold/10">
          {data.map((item, idx) => (
            <Counter 
              key={idx}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
