'use client';

import React, { useState, useRef } from 'react';
import { Upload, HelpCircle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomPrinting() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [customForm, setCustomForm] = useState({
    size: '10x10 cm',
    color: 'Classic Gold',
    qty: '10,000 sheets',
    embossing: 'Diamond pattern',
    details: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFile(null);
      setUploadProgress(0);
      setCustomForm({
        size: '10x10 cm',
        color: 'Classic Gold',
        qty: '10,000 sheets',
        embossing: 'Diamond pattern',
        details: ''
      });
    }, 2500);
  };

  return (
    <section id="custom-section" className="py-20 bg-cream-light dark:bg-chocolate-medium relative scroll-mt-16">
      
      {/* Decorative backdrop mesh */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-primary-gold/5 blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Bespoke Design Service</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
            Need Custom Printed Foils?
          </h2>
          <p className="text-xs text-chocolate-accent dark:text-cream-light/70 max-w-lg mx-auto">
            Upload your corporate logo or complete packaging artwork to create branded wrappers that establish authority and trust.
          </p>
          <div className="h-0.5 w-16 bg-primary-gold mx-auto mt-2" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Drag & Drop Uploader */}
          <div className="space-y-6">
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[340px] ${
                dragActive 
                  ? 'border-primary-gold bg-primary-gold/10' 
                  : 'border-primary-gold/20 bg-white/40 dark:bg-black/10 hover:border-primary-gold/40'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*,.pdf,.ai,.eps"
                onChange={handleFileChange}
              />

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-4 w-full"
                  >
                    <div className="h-16 w-16 bg-primary-gold/10 border border-primary-gold rounded-2xl flex items-center justify-center mx-auto text-primary-gold">
                      <Upload className="h-7 w-7" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{file.name}</p>
                      <p className="text-[10px] text-chocolate-accent">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>

                    {isUploading ? (
                      <div className="max-w-xs mx-auto space-y-1">
                        <div className="flex justify-between text-[10px] text-chocolate-accent">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-chocolate-dark/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary-gold h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 text-xs text-green-500 font-bold">
                        <CheckCircle className="h-4 w-4" />
                        <span>Artwork Uploaded & Safe</span>
                      </div>
                    )}

                    <button 
                      onClick={() => setFile(null)}
                      className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 cursor-pointer pt-2 inline-block"
                    >
                      Remove Artwork
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="h-16 w-16 bg-primary-gold/10 border border-primary-gold/15 rounded-2xl flex items-center justify-center mx-auto text-primary-gold">
                      <Upload className="h-7 w-7 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-chocolate-dark dark:text-cream-bg">
                        Drag your artwork file here
                      </p>
                      <p className="text-xs text-chocolate-accent dark:text-cream-light/60 mt-1">
                        Accepts High-Res PNG, PDF, AI, or EPS Vector files
                      </p>
                    </div>
                    <button 
                      onClick={onButtonClick}
                      className="bg-chocolate-dark text-white dark:bg-white dark:text-chocolate-dark text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-primary-gold hover:text-chocolate-dark dark:hover:bg-primary-gold transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Browse Files
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 bg-white/40 dark:bg-black/10 border border-primary-gold/10 p-4 rounded-2xl text-left">
              <ShieldCheck className="h-5 w-5 text-primary-gold flex-shrink-0" />
              <p className="text-[10px] text-chocolate-accent dark:text-cream-light/70 leading-relaxed">
                <strong>IP Protection Guaranteed:</strong> We never share, sell, or copy proprietary artwork dies. All prints remain under strictly secured customer lockers.
              </p>
            </div>
          </div>

          {/* Right Column: Custom Order Specs */}
          <div>
            <div className="glass-premium rounded-3xl p-6 sm:p-8 shadow-lg text-left">
              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-primary-gold animate-pulse mb-4" />
                  <h4 className="text-xl font-bold text-chocolate-dark dark:text-cream-bg font-serif">Custom Request Received</h4>
                  <p className="text-xs text-chocolate-accent dark:text-cream-light/60 mt-1.5 max-w-sm">
                    Our pre-press design engineers are checking your artwork resolution. You will receive a 3D digital wrapper proof on email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitCustom} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Dimensions</label>
                      <input 
                        type="text" 
                        value={customForm.size}
                        onChange={(e) => setCustomForm({...customForm, size: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Color / Base Foil</label>
                      <input 
                        type="text" 
                        value={customForm.color}
                        onChange={(e) => setCustomForm({...customForm, color: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Min. Quantity</label>
                      <select 
                        value={customForm.qty}
                        onChange={(e) => setCustomForm({...customForm, qty: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      >
                        <option>10,000 sheets</option>
                        <option>50,000 sheets</option>
                        <option>100,000 sheets</option>
                        <option>5 master rolls</option>
                        <option>20+ master rolls</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Embossing Style</label>
                      <select 
                        value={customForm.embossing}
                        onChange={(e) => setCustomForm({...customForm, embossing: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      >
                        <option>Smooth/No embossing</option>
                        <option>Diamond pattern</option>
                        <option>Honeycomb mesh</option>
                        <option>Custom Logo Stamp</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Detailed Requirements</label>
                    <textarea 
                      rows={3}
                      placeholder="Share packaging speed specs, target pricing, or other special instruction details..."
                      value={customForm.details}
                      onChange={(e) => setCustomForm({...customForm, details: e.target.value})}
                      className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Request Custom Proof & Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
