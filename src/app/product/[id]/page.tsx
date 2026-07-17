'use client';

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useShop } from '@/context/shop-context';
import { 
  ArrowLeft, Star, ShoppingBag, Heart, Shield, 
  Truck, ArrowRightLeft, Sparkles, Check, ChevronRight, 
  RotateCcw, Sliders, MessageSquare, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { 
    addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed, 
    recentlyViewed, cart 
  } = useShop();

  const product = products.find((p) => p.id === resolvedParams.id) || products[0];

  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  
  // Tabs & interactive features
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('specs');
  const [is360Mode, setIs360Mode] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Notifications
  const [addedNotify, setAddedNotify] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const mainBuyBtnRef = useRef<HTMLButtonElement>(null);

  // Track product viewing
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product]);

  // Handle mobile sticky buy bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mainBuyBtnRef.current) {
        const rect = mainBuyBtnRef.current.getBoundingClientRect();
        // Show sticky bar when main button is scrolled out of viewport (top of viewport)
        setShowSticky(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const price = product.discountPrice || product.price;
  const sizeMod = selectedSize.priceModifier;
  const singleTotal = price + sizeMod;
  const finalTotal = singleTotal * quantity;

  // Zoom magnifier positions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/cart');
  };

  // Filter out current product for related items
  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-cream-bg dark:bg-chocolate-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-chocolate-accent dark:text-cream-light/60 mb-8 overflow-x-auto py-1">
            <Link href="/" className="hover:text-primary-gold font-medium">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#products-section" className="hover:text-primary-gold font-medium">Catalog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-chocolate-dark dark:text-cream-bg font-bold line-clamp-1">{product.name}</span>
          </nav>

          {/* Core Panel: Gallery & Configurator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
            
            {/* Gallery Panel (Left Column) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Image Frame (With Zoom or 360 preview) */}
              <div className="glass-premium rounded-3xl overflow-hidden aspect-square bg-white/40 dark:bg-black/10 relative flex items-center justify-center border border-primary-gold/15 shadow-md">
                
                {is360Mode ? (
                  /* 360 Interactive rotation sequence */
                  <div className="w-full h-full flex flex-col justify-between p-6">
                    <div className="flex-1 flex items-center justify-center select-none">
                      <img 
                        src={product.images360 ? product.images360[frameIndex] : product.image} 
                        alt="360 rotation angle"
                        className="max-h-[80%] object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-chocolate-accent font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1"><RotateCcw className="h-3.5 w-3.5" /> 360° Drag View</span>
                        <span>Angle {frameIndex * 45}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max={product.images360 ? product.images360.length - 1 : 7}
                        value={frameIndex}
                        onChange={(e) => setFrameIndex(parseInt(e.target.value))}
                        className="w-full accent-primary-gold cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  /* Zoom magnifying viewer */
                  <div 
                    className="relative w-full h-full overflow-hidden cursor-zoom-in flex items-center justify-center"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <img 
                      src={activeImg} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-200"
                      style={
                        isZoomed 
                          ? { 
                              transform: 'scale(1.8)', 
                              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` 
                            } 
                          : undefined
                      }
                    />
                  </div>
                )}

                {/* Badge tags overlay */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.isSale && <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">Sale</span>}
                  {product.isBestSeller && <span className="bg-primary-gold text-chocolate-dark text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">Best Seller</span>}
                </div>

                {/* Toggle 360 button */}
                <button 
                  onClick={() => setIs360Mode(!is360Mode)}
                  className="absolute bottom-4 right-4 bg-chocolate-dark hover:bg-chocolate-medium border border-primary-gold/40 text-primary-gold text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>{is360Mode ? 'Standard Photo' : 'Interactive 360°'}</span>
                </button>

              </div>

              {/* Thumbnails row */}
              {!is360Mode && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImg(img)}
                      className={`h-20 w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImg === img 
                          ? 'border-primary-gold scale-105 shadow-md shadow-primary-gold/10' 
                          : 'border-primary-gold/10 hover:border-primary-gold/45'
                      }`}
                    >
                      <img src={img} alt="Thumbnail representation" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Configurator Panel (Right Column) */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold font-sans">{product.category}</span>
                  <h1 className="text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg mt-1.5 mb-2">
                    {product.name}
                  </h1>

                  {/* Rating summary */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">{product.rating}</span>
                    <span className="text-chocolate-accent">|</span>
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="text-xs text-primary-gold hover:text-primary-dark-gold font-bold underline"
                    >
                      Read {product.reviewsCount} verified reviews
                    </button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/10 rounded-2xl flex items-baseline gap-2.5">
                  <span className="text-3xl font-bold text-primary-gold">${singleTotal.toFixed(2)}</span>
                  {product.discountPrice && (
                    <span className="text-sm text-chocolate-accent line-through">
                      ${(product.price + sizeMod).toFixed(2)}
                    </span>
                  )}
                  <span className="text-[10px] text-chocolate-accent dark:text-cream-light/45 italic ml-auto uppercase font-bold tracking-wider">Bulk options inside</span>
                </div>

                {/* Summary brief */}
                <p className="text-xs leading-relaxed text-chocolate-accent dark:text-cream-light/70">
                  {product.details}
                </p>

                {/* Color selects */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-primary-gold">Select Foil Tint / Color</label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color.hex }}
                        className={`h-9 w-9 rounded-full border-2 relative transition-all duration-300 ${
                          selectedColor.name === color.name 
                            ? 'border-primary-gold scale-110 shadow-md shadow-primary-gold/20' 
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        {selectedColor.name === color.name && (
                          <Check className="h-4.5 w-4.5 text-white absolute inset-0 m-auto filter drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-chocolate-accent italic">Active shade: <strong>{selectedColor.name}</strong></span>
                </div>

                {/* Size selections */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-primary-gold">Select Packaging Size & Dimensions</label>
                  <select
                    value={selectedSize.name}
                    onChange={(e) => {
                      const sizeObj = product.sizes.find(s => s.name === e.target.value);
                      if (sizeObj) setSelectedSize(sizeObj);
                    }}
                    className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                  >
                    {product.sizes.map((size) => (
                      <option key={size.name} value={size.name}>
                        {size.name} ({size.dimensions}) {size.priceModifier > 0 ? `+ $${size.priceModifier.toFixed(2)}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity incrementor */}
                <div className="flex items-center gap-4">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-primary-gold">Quantity</label>
                  <div className="flex items-center border border-primary-gold/25 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/15 text-chocolate-dark dark:text-cream-bg transition-colors"
                    >-</button>
                    <span className="px-5 text-xs font-bold text-chocolate-dark dark:text-cream-bg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/15 text-chocolate-dark dark:text-cream-bg transition-colors"
                    >+</button>
                  </div>
                  <span className="text-[10px] text-chocolate-accent italic">In stock: {product.stock} units</span>
                </div>

              </div>

              {/* Action row */}
              <div className="space-y-4 pt-8">
                
                {/* Notification */}
                <AnimatePresence>
                  {addedNotify && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-green-500/10 border border-green-500 text-green-500 p-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Check className="h-4.5 w-4.5" />
                      <span>Product added to shopping cart!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4">
                  <button
                    ref={mainBuyBtnRef}
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-gold/15 hover:shadow-primary-gold/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="h-4.5 w-4.5" />
                    <span>Add to Cart | ${(finalTotal).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-chocolate-dark border border-primary-gold/30 hover:border-primary-gold text-white hover:bg-chocolate-medium py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    Buy It Now
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`px-4 border rounded-xl flex items-center justify-center transition-colors ${
                      isInWishlist(product.id)
                        ? 'border-red-500 text-red-500 bg-red-50/10'
                        : 'border-primary-gold/25 text-chocolate-accent hover:border-primary-gold hover:text-primary-gold'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                {/* Operations assurance flags */}
                <div className="grid grid-cols-3 gap-2 border-t border-primary-gold/10 pt-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-chocolate-accent dark:text-cream-light/60">
                    <Shield className="h-3.5 w-3.5 text-primary-gold" />
                    <span>100% FDA Approved</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-chocolate-accent dark:text-cream-light/60">
                    <Truck className="h-3.5 w-3.5 text-primary-gold" />
                    <span>Express Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-chocolate-accent dark:text-cream-light/60">
                    <ArrowRightLeft className="h-3.5 w-3.5 text-primary-gold" />
                    <span>Hassle-Free Returns</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Details & Specs Tabs Section */}
          <div className="mb-16 border-t border-primary-gold/15 pt-12">
            
            {/* Headers */}
            <div className="flex border-b border-primary-gold/10 gap-6 overflow-x-auto w-full mb-8">
              {[
                { id: 'specs', label: 'Technical Specifications' },
                { id: 'description', label: 'Detailed Features' },
                { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === tab.id 
                      ? 'border-primary-gold text-primary-gold' 
                      : 'border-transparent text-chocolate-accent hover:text-primary-gold'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Tabs */}
            <div className="glass-premium rounded-3xl p-6 sm:p-8 text-left">
              <AnimatePresence mode="wait">
                {activeTab === 'specs' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
                  >
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-primary-gold/10 pb-2 text-xs">
                        <span className="font-bold text-chocolate-accent">{key}</span>
                        <span className="text-chocolate-dark dark:text-cream-bg">{val}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'description' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-xs sm:text-sm text-chocolate-accent dark:text-cream-light/80 leading-relaxed"
                  >
                    <p>
                      Our primary packaging materials undergo rigorous quality checks to safeguard hygiene and preserve delicate chocolate compounds from vapor transmission, oxidation, and contamination.
                    </p>
                    <p>
                      Each master roll and pre-cut bundle is manufactured to exact specification under ISO 9001 certified guidelines. With a 100% dead-fold ratio, manual wrapping is faster and creases hold securely without adhesive drops.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="border-b border-primary-gold/10 pb-6 last:border-b-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">{rev.user}</span>
                            <p className="text-[9px] text-chocolate-accent mt-0.5">Reviewed on {rev.date}</p>
                          </div>
                          <div className="flex text-yellow-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg font-serif">{rev.title}</h4>
                        <p className="text-xs text-chocolate-accent dark:text-cream-light/75 leading-relaxed">{rev.comment}</p>
                        
                        <div className="flex items-center gap-2 pt-2">
                          <button className="text-[10px] text-primary-gold border border-primary-gold/20 hover:border-primary-gold px-2.5 py-1 rounded-md font-sans font-bold uppercase transition-all duration-200">
                            Helpful ({rev.helpfulCount})
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Related Products recommendations */}
          <div className="mb-16 border-t border-primary-gold/15 pt-12">
            <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg text-left mb-8">Related Packaging Solutions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/product/${item.id}`}
                  className="glass-premium rounded-2xl overflow-hidden border border-primary-gold/10 hover:border-primary-gold/40 transition-all duration-300 p-4 text-left flex flex-col justify-between aspect-[3/4]"
                >
                  <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-xl mb-3" />
                  <div>
                    <span className="text-[8px] font-bold text-primary-gold uppercase">{item.category}</span>
                    <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1 mt-0.5">{item.name}</h4>
                    <span className="text-xs font-bold text-primary-gold mt-2 block">${item.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Add To Cart Bar (For Mobile) */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-cream-light dark:bg-chocolate-medium border-t border-primary-gold/20 p-4 shadow-2xl flex items-center justify-between lg:hidden"
          >
            <div className="text-left">
              <span className="text-[9px] uppercase text-primary-gold font-bold">{selectedColor.name}</span>
              <p className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{product.name}</p>
              <span className="text-xs text-primary-gold font-bold">${singleTotal.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatWidget />
    </>
  );
}
