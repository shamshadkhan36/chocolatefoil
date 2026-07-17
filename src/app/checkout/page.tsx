'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/shop-context';
import { 
  ShieldCheck, CreditCard, ChevronRight, CheckCircle2, 
  ArrowLeft, CreditCard as CardIcon, HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, discount, clearCart, createOrder } = useShop();

  // Stepper state
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');

  // Form fields
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    email: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Switzerland',
    gstNumber: '',
    sameAsBilling: true
  });

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '', addressLine1: '', city: '', state: '', postalCode: '', country: 'Switzerland'
  });

  // Credit card state
  const [cardForm, setCardForm] = useState({
    number: '', name: '', expiry: '', cvc: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'banking' | 'cod'>('card');
  
  // Successful order outcome
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  // Totals calculations
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    const sizeMod = item.selectedSize.priceModifier;
    return total + (itemPrice + sizeMod) * item.quantity;
  }, 0);
  const discountAmt = subtotal * (discount / 100);
  const tax = (subtotal - discountAmt) * 0.08;
  const shippingCharge = subtotal > 150 ? 0 : 12;
  const finalTotal = subtotal - discountAmt + tax + shippingCharge;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalShipping = addressForm.sameAsBilling 
      ? {
          fullName: addressForm.fullName,
          addressLine1: addressForm.addressLine1,
          city: addressForm.city,
          state: addressForm.state,
          postalCode: addressForm.postalCode,
          country: addressForm.country
        }
      : shippingAddress;

    const newOrder = createOrder({
      items: cart,
      total: finalTotal,
      paymentMethod: paymentMethod === 'card' 
        ? 'Credit Card' 
        : paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'banking' ? 'Net Banking' : 'Cash On Delivery',
      shippingAddress: finalShipping,
      gstNumber: addressForm.gstNumber || undefined
    });

    setPlacedOrder(newOrder);
    setStep('success');
    clearCart();
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <>
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center bg-cream-bg dark:bg-chocolate-dark">
          <div className="text-center p-8 glass-premium rounded-3xl max-w-sm">
            <h2 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">No Checkout Available</h2>
            <p className="text-xs text-chocolate-accent mt-2 mb-6">Your shopping cart is currently empty.</p>
            <Link href="/" className="bg-primary-gold text-chocolate-dark px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold inline-block">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-cream-bg dark:bg-chocolate-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 text-[10px] md:text-xs font-bold uppercase tracking-widest text-chocolate-accent font-sans">
            <span className={step === 'info' ? 'text-primary-gold' : 'text-chocolate-dark dark:text-cream-bg'}>1. Shipping Info</span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 'payment' ? 'text-primary-gold' : 'text-chocolate-accent'}>2. Payment Gate</span>
            <ChevronRight className="h-4 w-4" />
            <span className={step === 'success' ? 'text-primary-gold' : 'text-chocolate-accent'}>3. Confirmation</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Shipping Form Left */}
                <form onSubmit={handleInfoSubmit} className="lg:col-span-8 glass-premium rounded-3xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-3">Delivery Addresses</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Full Name</label>
                      <input 
                        type="text" required
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Email Address</label>
                      <input 
                        type="email" required
                        value={addressForm.email}
                        onChange={(e) => setAddressForm({...addressForm, email: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Street Address</label>
                    <input 
                      type="text" required
                      value={addressForm.addressLine1}
                      onChange={(e) => setAddressForm({...addressForm, addressLine1: e.target.value})}
                      className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">City</label>
                      <input 
                        type="text" required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">State / Prov</label>
                      <input 
                        type="text" required
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Postal Code</label>
                      <input 
                        type="text" required
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({...addressForm, postalCode: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary-gold/10">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">GST / VAT Number (Optional)</label>
                      <input 
                        type="text"
                        placeholder="Corporate Tax ID"
                        value={addressForm.gstNumber}
                        onChange={(e) => setAddressForm({...addressForm, gstNumber: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Country</label>
                      <select
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      >
                        <option>Switzerland</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>United States</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Link 
                      href="/cart"
                      className="text-xs font-bold uppercase text-chocolate-accent hover:text-primary-gold flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Cart</span>
                    </Link>
                    
                    <button 
                      type="submit"
                      className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Continue To Payment
                    </button>
                  </div>

                </form>

                {/* mini summary right */}
                <div className="lg:col-span-4">
                  <div className="glass-premium rounded-3xl p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider font-serif border-b border-primary-gold/15 pb-2">Checkout Details</h3>
                    <div className="divide-y divide-primary-gold/5 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="py-2.5 flex justify-between gap-3 text-xs">
                          <span className="text-chocolate-accent flex-1 line-clamp-1">{item.product.name} (x{item.quantity})</span>
                          <span className="font-bold text-primary-gold">${((item.product.discountPrice || item.product.price + item.selectedSize.priceModifier) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-primary-gold/15 pt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between text-chocolate-accent">
                        <span>Cart Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-500 font-bold">
                          <span>Discount</span>
                          <span>-${discountAmt.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-chocolate-accent">
                        <span>Tax / VAT</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-chocolate-accent">
                        <span>Shipping Freight</span>
                        <span>{shippingCharge === 0 ? 'FREE' : `$${shippingCharge.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-primary-gold/10 pt-2 text-chocolate-dark dark:text-cream-bg">
                        <span>Grand Total</span>
                        <span className="text-primary-gold">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                
                {/* Payment form left */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-8 glass-premium rounded-3xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-3">Secure Payment Gateway</h2>
                  
                  {/* Selectors tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card', icon: <CardIcon className="h-4 w-4" /> },
                      { id: 'upi', label: 'UPI QR Pay', icon: <HelpCircle className="h-4 w-4" /> },
                      { id: 'banking', label: 'Net Banking', icon: <HelpCircle className="h-4 w-4" /> },
                      { id: 'cod', label: 'Pay On Delivery', icon: <HelpCircle className="h-4 w-4" /> }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === opt.id 
                            ? 'border-primary-gold bg-primary-gold/10 text-primary-gold' 
                            : 'border-primary-gold/15 text-chocolate-accent hover:border-primary-gold/45'
                        }`}
                      >
                        {opt.icon}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Render parameters base on selection */}
                  <div className="bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/10 p-6 rounded-2xl">
                    <AnimatePresence mode="wait">
                      {paymentMethod === 'card' && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
                        >
                          
                          {/* Card Preview template */}
                          <div className="aspect-[1.586/1] bg-gradient-to-tr from-[#1a0f0a] via-[#3E271E] to-[#8F6E4D] border border-primary-gold/30 rounded-2xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
                            {/* Gold mesh chip */}
                            <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-primary-gold/10 border border-primary-gold flex items-center justify-center text-[8px] font-bold text-primary-gold">
                              VIP
                            </div>
                            <div className="h-7 w-10 bg-primary-gold/25 rounded-md border border-primary-gold/40 mb-4" />
                            <div className="space-y-4">
                              <p className="text-base sm:text-lg font-mono tracking-widest text-primary-gold">
                                {cardForm.number || '•••• •••• •••• ••••'}
                              </p>
                              <div className="flex justify-between items-end">
                                <div className="text-left space-y-0.5">
                                  <span className="text-[7px] uppercase font-bold text-white/55">Cardholder</span>
                                  <p className="text-xs uppercase font-mono tracking-wider line-clamp-1">{cardForm.name || 'Your Full Name'}</p>
                                </div>
                                <div className="text-right space-y-0.5">
                                  <span className="text-[7px] uppercase font-bold text-white/55">Expiry</span>
                                  <p className="text-xs font-mono">{cardForm.expiry || 'MM/YY'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Inputs */}
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Card Number</label>
                              <input 
                                type="text" required
                                maxLength={19}
                                placeholder="4000 1234 5678 9010"
                                value={cardForm.number}
                                onChange={(e) => setCardForm({...cardForm, number: e.target.value})}
                                className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg focus:outline-none focus:border-primary-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Cardholder Name</label>
                              <input 
                                type="text" required
                                placeholder="Valerie Dupont"
                                value={cardForm.name}
                                onChange={(e) => setCardForm({...cardForm, name: e.target.value})}
                                className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg focus:outline-none focus:border-primary-gold"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Expiry Date</label>
                                <input 
                                  type="text" required
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={cardForm.expiry}
                                  onChange={(e) => setCardForm({...cardForm, expiry: e.target.value})}
                                  className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg focus:outline-none focus:border-primary-gold"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">CVC Code</label>
                                <input 
                                  type="password" required
                                  placeholder="•••"
                                  maxLength={4}
                                  value={cardForm.cvc}
                                  onChange={(e) => setCardForm({...cardForm, cvc: e.target.value})}
                                  className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg focus:outline-none focus:border-primary-gold"
                                />
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}

                      {paymentMethod === 'upi' && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-center py-4 space-y-4"
                        >
                          <div className="bg-white p-3 rounded-2xl max-w-xs mx-auto border border-primary-gold/20 shadow-sm flex items-center justify-center">
                            {/* Simulate QR code */}
                            <div className="h-44 w-44 bg-chocolate-dark flex items-center justify-center text-white text-[10px] font-mono p-4 font-bold border border-primary-gold">
                              [ChocolateFoil QR Code Payee Gateway]
                            </div>
                          </div>
                          <p className="text-[10px] text-chocolate-accent dark:text-cream-light/65">Scan using any UPI App (GooglePay, PhonePe, BHIM) to settle instant payments.</p>
                        </motion.div>
                      )}

                      {paymentMethod === 'banking' && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <label className="block text-[10px] uppercase font-bold text-primary-gold">Choose Bank Representative</label>
                          <select className="w-full bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs text-chocolate-dark dark:text-cream-bg">
                            <option>UBS Swiss Bank</option>
                            <option>Credit Suisse (Group)</option>
                            <option>HSBC Private Banking</option>
                            <option>Deutsche Bank</option>
                          </select>
                          <p className="text-[9px] text-chocolate-accent leading-relaxed">Settle via institutional direct banking portal. Secured credentials redirection.</p>
                        </motion.div>
                      )}

                      {paymentMethod === 'cod' && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-center py-6 space-y-2"
                        >
                          <p className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">Cash On Delivery Option Selected</p>
                          <p className="text-[10px] text-chocolate-accent dark:text-cream-light/65 leading-relaxed max-w-sm mx-auto">
                            Pay with cash or wire transfer directly to carrier logistics officers upon receiving shipment crate. Additional COD fees ($5.00) will be waived.
                          </p>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep('info')}
                      className="text-xs font-bold uppercase text-chocolate-accent hover:text-primary-gold flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Address</span>
                    </button>
                    
                    <button 
                      type="submit"
                      className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-gold/15 hover:shadow-primary-gold/25 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="h-4.5 w-4.5" />
                      <span>Complete Secure Purchase</span>
                    </button>
                  </div>

                </form>

                {/* Mini Summary Right */}
                <div className="lg:col-span-4">
                  <div className="glass-premium rounded-3xl p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider font-serif border-b border-primary-gold/15 pb-2">Order Invoice Summary</h3>
                    <div className="space-y-1.5 text-xs text-chocolate-accent">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-500 font-bold">
                          <span>Discount ({discount}%)</span>
                          <span>-${discountAmt.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>VAT Standard (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping freight</span>
                        <span>{shippingCharge === 0 ? 'FREE' : `$${shippingCharge.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-primary-gold/10 pt-2 text-chocolate-dark dark:text-cream-bg">
                        <span>Grand Total</span>
                        <span className="text-primary-gold">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {step === 'success' && placedOrder && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto glass-premium rounded-3xl p-8 sm:p-12 text-center space-y-6 relative border border-primary-gold/20 shadow-2xl"
              >
                <div className="h-20 w-20 rounded-full bg-primary-gold/10 border border-primary-gold flex items-center justify-center text-primary-gold mx-auto animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">Purchase Confirmed!</h2>
                  <p className="text-xs text-chocolate-accent dark:text-cream-light/65">
                    Order number: <strong>{placedOrder.id}</strong>. We've emailed your invoice details to <strong>{addressForm.email}</strong>.
                  </p>
                </div>

                <div className="bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/10 p-5 rounded-2xl text-left space-y-3 text-xs max-w-md mx-auto">
                  <p className="font-bold border-b border-primary-gold/10 pb-1.5 text-primary-gold uppercase tracking-wider text-[10px]">Shipping Coordinates</p>
                  <p className="font-bold text-chocolate-dark dark:text-cream-bg">{placedOrder.shippingAddress.fullName}</p>
                  <p className="text-chocolate-accent dark:text-cream-light/75">{placedOrder.shippingAddress.addressLine1}</p>
                  <p className="text-chocolate-accent dark:text-cream-light/75">{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.postalCode}</p>
                  <p className="text-chocolate-accent dark:text-cream-light/75 font-semibold">{placedOrder.shippingAddress.country}</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/account"
                    className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                  >
                    Track Orders Dashboard
                  </Link>
                  <Link 
                    href="/"
                    className="border border-primary-gold/20 hover:border-primary-gold text-chocolate-dark dark:text-cream-bg px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all"
                  >
                    Back to Storefront
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
