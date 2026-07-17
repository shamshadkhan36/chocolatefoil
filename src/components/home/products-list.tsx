'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/shop-context';
import { products } from '@/data/products';
import { Product } from '@/types';
import { Eye, Heart, ShoppingBag, Check, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductModal from '../shared/product-modal';

export default function ProductsList() {
  const { 
    searchQuery, selectedCategory, setSearch, 
    addToCart, toggleWishlist, isInWishlist 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'All' | 'Best' | 'New' | 'Sale'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Filter products based on search query, selected category, and active tabs
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Selected Category
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    // 3. Tab Filter
    let matchesTab = true;
    if (activeTab === 'Best') matchesTab = !!product.isBestSeller;
    if (activeTab === 'New') matchesTab = !!product.isNewArrival;
    if (activeTab === 'Sale') matchesTab = !!product.isSale;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleAddToCart = (product: Product) => {
    // Default to first color and size
    addToCart(product, 1, product.colors[0], product.sizes[0]);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="products-section" className="py-20 bg-cream-bg dark:bg-chocolate-dark scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-left space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-gold font-sans">Artisanal Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">
              {selectedCategory !== 'All' ? `${selectedCategory} Collection` : 'Our Premium Foil Collections'}
            </h2>
            <div className="h-0.5 w-16 bg-primary-gold" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex items-center space-x-2 border-b border-primary-gold/10 pb-2 overflow-x-auto w-full md:w-auto">
            {[
              { id: 'All', label: 'All Catalog' },
              { id: 'Best', label: 'Best Sellers' },
              { id: 'New', label: 'New Arrivals' },
              { id: 'Sale', label: 'Special Offers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-primary-gold text-chocolate-dark shadow-md shadow-primary-gold/10' 
                    : 'text-chocolate-accent dark:text-cream-light/60 hover:text-primary-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters helper */}
        {(selectedCategory !== 'All' || searchQuery !== '') && (
          <div className="flex items-center gap-3 mb-8 bg-primary-gold/5 border border-primary-gold/25 p-3 rounded-2xl max-w-max">
            <SlidersHorizontal className="h-4 w-4 text-primary-gold" />
            <span className="text-xs text-chocolate-dark dark:text-cream-bg font-medium">
              Filtered by: {selectedCategory !== 'All' ? `Category "${selectedCategory}"` : ''} 
              {searchQuery !== '' ? `Search "${searchQuery}"` : ''}
            </span>
            <button 
              onClick={() => setSearch('', 'All')}
              className="text-xs font-bold uppercase text-primary-gold hover:text-primary-dark-gold border-l border-primary-gold/20 pl-3"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => {
                const isItemAdded = !!addedItemIds[product.id];
                const mainPrice = product.discountPrice || product.price;
                
                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="glass-premium rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group relative border border-primary-gold/10 hover:border-primary-gold/40 transition-all duration-500 hover:shadow-xl hover:shadow-chocolate-dark/5 text-left"
                  >
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {product.isSale && (
                        <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                          Sale
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-primary-gold text-chocolate-dark text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                          Best Seller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-chocolate-light border border-primary-gold/20 text-primary-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                          New
                        </span>
                      )}
                    </div>

                    {/* Image Container & Quick Actions Overlay */}
                    <div className="relative aspect-square w-full overflow-hidden bg-white/40 dark:bg-black/10 border-b border-primary-gold/10">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-chocolate-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="h-10 w-10 bg-white hover:bg-primary-gold text-chocolate-dark hover:text-chocolate-dark rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => toggleWishlist(product)}
                          className={`h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer ${
                            isInWishlist(product.id) ? 'text-red-500 hover:bg-white' : 'text-chocolate-dark hover:text-red-500'
                          }`}
                          title="Add to Wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Details Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-primary-gold uppercase tracking-wider font-sans">{product.category}</span>
                        <h3 className="text-sm sm:text-base font-serif font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1 hover:text-primary-gold cursor-pointer" onClick={() => setSelectedProduct(product)}>
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-[10px] text-chocolate-accent font-semibold">{product.rating} ({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Prices & Color options */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-bold text-primary-gold">${mainPrice.toFixed(2)}</span>
                          {product.discountPrice && (
                            <span className="text-[10px] text-chocolate-accent line-through">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          {product.colors.slice(0, 3).map((col, idx) => (
                            <span 
                              key={idx} 
                              style={{ backgroundColor: col.hex }} 
                              className="h-2.5 w-2.5 rounded-full border border-white/50 shadow-sm"
                              title={col.name}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-[8px] text-chocolate-accent font-bold">+{product.colors.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors border-t border-primary-gold/15 cursor-pointer ${
                        isItemAdded 
                          ? 'bg-green-500 text-white border-t-green-500' 
                          : 'bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold hover:text-chocolate-dark text-chocolate-dark dark:text-cream-bg'
                      }`}
                    >
                      {isItemAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-chocolate-accent italic">No matching packaging foils found in catalog. Try clearing your search parameters.</p>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* Render Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  );
}
