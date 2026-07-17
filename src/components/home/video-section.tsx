'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-chocolate-dark">
      
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute w-full h-full object-cover scale-105"
        src="https://player.vimeo.com/external/435674703.sd.mp4?s=784e1b8162dc4a413d05f324ecda29cc24be674d&profile_id=165&oauth2_token_id=57447761"
      />

      {/* Dark Gold Mask Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-chocolate-dark/95 via-chocolate-dark/75 to-chocolate-dark/95 backdrop-blur-[2px]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Overlay Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-primary-gold/15 border border-primary-gold/30 px-3 py-1 rounded-full text-primary-gold"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase font-bold tracking-widest font-sans">Behind The Craft</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight"
        >
          Crafting Luxury Packaging <br />
          <span className="text-primary-gold italic">Since 2011</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-cream-light/85 max-w-xl mx-auto leading-relaxed"
        >
          Step inside our Swiss engineering facilities. From precision high-temp annealing to multi-color gravure presses, see how we maintain strict food hygiene and deliver spotless wrapping results.
        </motion.p>
        
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button 
            onClick={togglePlay}
            className="h-12 w-12 rounded-full border border-primary-gold/30 hover:border-primary-gold bg-chocolate-dark/30 hover:bg-primary-gold hover:text-chocolate-dark text-primary-gold flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          
          <button 
            onClick={toggleMute}
            className="h-12 w-12 rounded-full border border-primary-gold/30 hover:border-primary-gold bg-chocolate-dark/30 hover:bg-primary-gold hover:text-chocolate-dark text-primary-gold flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

      </div>

    </section>
  );
}
