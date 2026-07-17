'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/shop-context';
import { 
  ShoppingBag, Trash2, ArrowLeft, Ticket, 
  Truck, ArrowRight, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, updateCartQuantity, removeFromCart, 
    couponCode, discount, applyCoupon, clearCart 
  } = useShop();

  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(couponCode !== '');

  // Shipping calculator state
  const [shippingCountry, setShippingCountry] = useState('Switzerland');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    if (couponInput.trim() === '') return;
    
    const isValid = applyCoupon(couponInput);
    if (isValid) {
      setCouponSuccess(true);
    } else {
      setCouponError('Invalid promotion code. Try "LUXURY10"');
    }
  };

  // Math totals
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    const sizeMod = item.selectedSize.priceModifier;
    return total + (itemPrice + sizeMod) * item.quantity;
  }, 0);

  const discountAmount = subtotal * (discount / 100);
  const tax = (subtotal - discountAmount) * 0.08; // 8% Swiss VAT standard
  
  const shippingCharge = subtotal > 150 
    ? 0 
    : shippingMethod === 'express' ? 25 : 12;

  const finalTotal = subtotal - discountAmount + tax + shippingCharge;

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-cream-bg dark:bg-chocolate-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg text-left mb-8">
            Your Shopping Cart
          </h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Items List (Left Grid) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="glass-premium rounded-3xl p-6 shadow-sm overflow-hidden">
                  <div className="divide-y divide-primary-gold/10">
                    
                    {cart.map((item) => {
                      const itemPrice = item.product.discountPrice || item.product.price;
                      const sizeMod = item.selectedSize.priceModifier;
                      const singleItemCost = itemPrice + sizeMod;
                      
                      return (
                        <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 text-left">
                          
                          {/* Image */}
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-24 w-24 object-cover rounded-2xl border border-primary-gold/15 flex-shrink-0"
                          />

                          {/* Detail */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-primary-gold uppercase">{item.product.category}</span>
                              <Link 
                                href={`/product/${item.product.id}`}
                                className="text-sm sm:text-base font-bold font-serif text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors block"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-[10px] text-chocolate-accent dark:text-cream-light/60">
                                Color: <strong>{item.selectedColor.name}</strong> | Size: <strong>{item.selectedSize.name}</strong>
                              </p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-primary-gold/25 rounded-xl overflow-hidden">
                                <button 
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="px-2.5 py-1.5 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/15 text-chocolate-dark dark:text-cream-bg transition-colors"
                                >-</button>
                                <span className="px-3.5 text-xs font-bold text-chocolate-dark dark:text-cream-bg">{item.quantity}</span>
                                <button 
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="px-2.5 py-1.5 bg-chocolate-dark/5 dark:bg-white/5 hover:bg-primary-gold/15 text-chocolate-dark dark:text-cream-bg transition-colors"
                                >+</button>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-primary-gold">
                                  ${(singleItemCost * item.quantity).toFixed(2)}
                                </span>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="h-4.5 w-4.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* Actions under list */}
                  <div className="flex items-center justify-between pt-6 border-t border-primary-gold/15 mt-4">
                    <Link 
                      href="/#products-section"
                      className="text-xs font-bold text-primary-gold hover:text-primary-dark-gold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Catalog</span>
                    </Link>
                    
                    <button 
                      onClick={clearCart}
                      className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-wider flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear All Items</span>
                    </button>
                  </div>
                </div>

                {/* Sub-block panels: Promo and Shipping estimate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  
                  {/* Coupon Code Panel */}
                  <div className="glass-premium rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-primary-gold mb-4">
                      <Ticket className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider font-serif">Apply Business Coupon</h4>
                    </div>
                    <p className="text-[10px] text-chocolate-accent dark:text-cream-light/65 mb-4 leading-relaxed">
                      Enter discount coupon code (e.g. <strong>LUXURY10</strong> for 10% subtotal savings on checkout orders).
                    </p>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Coupon Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                      <button 
                        type="submit"
                        className="bg-chocolate-dark text-white dark:bg-white dark:text-chocolate-dark text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-primary-gold hover:text-chocolate-dark dark:hover:bg-primary-gold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                    
                    {couponError && <p className="text-[10px] text-red-500 font-bold mt-2">{couponError}</p>}
                    {couponSuccess && (
                      <p className="text-[10px] text-green-500 font-bold mt-2">
                        Coupon code '{couponCode}' applied! ({discount}% discount)
                      </p>
                    )}
                  </div>

                  {/* Shipping Estimator Panel */}
                  <div className="glass-premium rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-primary-gold mb-4">
                      <Truck className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider font-serif">Shipping Estimate</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[8px] uppercase font-bold text-chocolate-accent mb-1">Destination Country</label>
                        <select 
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                        >
                          <option>Switzerland</option>
                          <option>United Kingdom</option>
                          <option>Germany</option>
                          <option>United States</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-chocolate-accent mb-1">Zip/Postal Code</label>
                          <input 
                            type="text"
                            placeholder="Zip Code"
                            value={shippingZip}
                            onChange={(e) => setShippingZip(e.target.value)}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2 py-1 text-xs text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-chocolate-accent mb-1">Freight Speed</label>
                          <select 
                            value={shippingMethod}
                            onChange={(e) => setShippingMethod(e.target.value as any)}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                          >
                            <option value="standard">Standard Air</option>
                            <option value="express">Express Cargo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Order Summary (Right Grid) */}
              <div className="lg:col-span-4 text-left">
                <div className="glass-premium rounded-3xl p-6 shadow-sm space-y-6">
                  <h3 className="text-lg font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-3">Order Invoice Summary</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-chocolate-accent">
                      <span>Cart Subtotal</span>
                      <span className="font-bold text-chocolate-dark dark:text-cream-bg">${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Coupon Discount ({discount}%)</span>
                        <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-chocolate-accent">
                      <span>Estimated VAT/Tax (8%)</span>
                      <span className="font-bold text-chocolate-dark dark:text-cream-bg">${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-chocolate-accent">
                      <span>Delivery Shipping Charge</span>
                      <span className="font-bold text-chocolate-dark dark:text-cream-bg">
                        {shippingCharge === 0 ? 'FREE' : `$${shippingCharge.toFixed(2)}`}
                      </span>
                    </div>

                    {subtotal < 150 && (
                      <p className="text-[9px] text-primary-gold italic">Add ${(150 - subtotal).toFixed(2)} more to qualify for Free Shipping!</p>
                    )}

                    <div className="border-t border-primary-gold/15 pt-3 flex justify-between text-sm font-bold text-chocolate-dark dark:text-cream-bg">
                      <span>Grand Total</span>
                      <span className="text-lg text-primary-gold">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout"
                    className="block text-center w-full bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-gold/15 hover:shadow-primary-gold/25 transition-all duration-300 flex items-center justify-center space-x-1.5"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center gap-2 pt-2 border-t border-primary-gold/10 text-[9px] text-chocolate-accent dark:text-cream-light/45">
                    <ShieldCheck className="h-4 w-4 text-primary-gold flex-shrink-0" />
                    <span>Transactions are fully encrypted using military-grade security.</span>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            <div className="py-20 text-center glass-premium rounded-3xl max-w-lg mx-auto">
              <ShoppingBag className="h-16 w-16 text-chocolate-accent/30 mx-auto mb-4" />
              <h2 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">Your Cart is Empty</h2>
              <p className="text-xs text-chocolate-accent mt-2 mb-6">Explore our catalog and find the perfect foils for your brand.</p>
              
              <Link 
                href="/#products-section"
                className="bg-primary-gold text-chocolate-dark px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold transition-all duration-300 inline-block"
              >
                Go to Catalog
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
