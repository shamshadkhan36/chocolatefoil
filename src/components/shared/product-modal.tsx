'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useShop } from '@/context/shop-context';
import { X, ShoppingBag, Check, Heart, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const price = product.discountPrice || product.price;
  const sizeModifier = selectedSize.priceModifier;
  const singleItemTotal = price + sizeModifier;
  const finalTotal = singleItemTotal * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-cream-bg dark:bg-chocolate-medium max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl relative border border-primary-gold/15 flex flex-col md:flex-row text-left max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-chocolate-dark/10 hover:bg-chocolate-dark/20 dark:bg-white/10 dark:hover:bg-white/20 p-2 rounded-full text-chocolate-dark dark:text-cream-bg transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 bg-white/40 dark:bg-black/20 p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-primary-gold/10">
          <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.isSale && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Sale
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-3 left-3 bg-primary-gold text-chocolate-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>
          
          <div className="flex gap-2.5 mt-4">
            <div className="flex items-center gap-1.5 text-[10px] text-chocolate-accent dark:text-cream-light/60">
              <Shield className="h-3.5 w-3.5 text-primary-gold" />
              <span>100% Food Safe</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-chocolate-accent dark:text-cream-light/60">
              <Award className="h-3.5 w-3.5 text-primary-gold" />
              <span>Premium Finish</span>
            </div>
          </div>
        </div>

        {/* Right: Product Customization */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary-gold font-bold">{product.category}</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-chocolate-dark dark:text-cream-bg mt-1 mb-2">
              {product.name}
            </h3>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary-gold">
                  ${singleItemTotal.toFixed(2)}
                </span>
                {product.discountPrice && (
                  <span className="text-xs text-chocolate-accent line-through">
                    ${(product.price + sizeModifier).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="h-4 w-px bg-primary-gold/20" />
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">{product.rating}</span>
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-[10px] text-chocolate-accent">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <p className="text-xs text-chocolate-accent dark:text-cream-light/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors Select */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1.5">Select Color Shade</label>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`h-8 w-8 rounded-full border-2 relative transition-all duration-300 ${
                      selectedColor.name === color.name 
                        ? 'border-primary-gold scale-110 shadow-md shadow-primary-gold/20' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <Check className="h-4 w-4 text-white absolute inset-0 m-auto filter drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Select */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1.5">Package Dimensions / Size</label>
              <select
                value={selectedSize.name}
                onChange={(e) => {
                  const size = product.sizes.find(s => s.name === e.target.value);
                  if (size) setSelectedSize(size);
                }}
                className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
              >
                {product.sizes.map((size) => (
                  <option key={size.name} value={size.name}>
                    {size.name} ({size.dimensions}) {size.priceModifier > 0 ? `+ $${size.priceModifier}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-[10px] uppercase font-bold text-primary-gold">Quantity</label>
              <div className="flex items-center border border-primary-gold/25 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/10 text-chocolate-dark dark:text-cream-bg transition-colors"
                >-</button>
                <span className="px-4 text-xs font-bold text-chocolate-dark dark:text-cream-bg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/10 text-chocolate-dark dark:text-cream-bg transition-colors"
                >+</button>
              </div>
              <span className="text-[10px] text-chocolate-accent italic">In Stock ({product.stock} units)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
                isAdded 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark shadow-lg shadow-primary-gold/10 hover:shadow-primary-gold/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added To Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add To Cart | ${(finalTotal).toFixed(2)}</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => toggleWishlist(product)}
              className={`px-4 border rounded-xl flex items-center justify-center transition-colors ${
                isInWishlist(product.id)
                  ? 'border-red-500 text-red-500 bg-red-50/10'
                  : 'border-primary-gold/30 text-chocolate-accent hover:border-primary-gold hover:text-primary-gold'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
