'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useShop } from '@/context/shop-context';
import { products } from '@/data/products';
import { 
  Search, Heart, ShoppingBag, User, Menu, X, 
  ChevronDown, Sun, Moon, Trash2, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    cart, wishlist, theme, toggleTheme, 
    removeFromCart, updateCartQuantity, discount 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Popover States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Search State
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState(products.slice(0, 3));

  // Quote Request State
  const [quoteForm, setQuoteForm] = useState({
    name: '', email: '', phone: '', company: '', foilType: 'Gold Foils', quantity: '5000 pcs', description: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search filter
  useEffect(() => {
    if (searchVal.trim() === '') {
      setSearchResults(products.slice(0, 3));
    } else {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchVal.toLowerCase()) || 
        p.category.toLowerCase().includes(searchVal.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchVal]);

  // Click outside to close drawers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (searchRef.current && !searchRef.current.contains(target)) setIsSearchOpen(false);
      if (cartRef.current && !cartRef.current.contains(target)) setIsCartOpen(false);
      if (wishlistRef.current && !wishlistRef.current.contains(target)) setIsWishlistOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    const sizeMod = item.selectedSize.priceModifier;
    return total + (price + sizeMod) * item.quantity;
  }, 0);
  const discountedSubtotal = subtotal * (1 - discount / 100);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteOpen(false);
      setQuoteForm({
        name: '', email: '', phone: '', company: '', foilType: 'Gold Foils', quantity: '5000 pcs', description: ''
      });
    }, 2000);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-navbar py-3 shadow-lg shadow-chocolate-dark/5' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-chocolate-dark dark:text-cream-bg">
                Chocolate<span className="text-primary-gold">Foil</span>
                <span className="text-xs font-sans align-super text-chocolate-accent dark:text-primary-light-gold">.com</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary-gold ${
                pathname === '/' ? 'text-primary-gold' : 'text-chocolate-dark dark:text-cream-bg'
              }`}>
                Home
              </Link>
              
              {/* Mega Menu Toggle */}
              <div className="relative group py-2">
                <button className="flex items-center space-x-1 text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                  <span>Products</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] glass-premium p-6 rounded-2xl shadow-xl border border-primary-gold/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 flex gap-8">
                  <div className="w-1/2">
                    <p className="text-xs font-bold text-primary-gold uppercase tracking-widest mb-4 border-b border-primary-gold/20 pb-2">Categories</p>
                    <div className="grid grid-cols-1 gap-2">
                      {['Gold Foils', 'Silver Foils', 'Printed Foils', 'Color Foils', 'Candy Wrappers', 'Chocolate Boxes', 'Gift Packaging'].map((cat) => (
                        <Link 
                          key={cat} 
                          href={`/#products-section`}
                          className="text-sm text-chocolate-dark dark:text-cream-light hover:text-primary-gold transition-colors hover:translate-x-1 duration-200 inline-block font-medium"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 bg-chocolate-dark/5 dark:bg-white/5 p-4 rounded-xl flex flex-col justify-between border border-primary-gold/5">
                    <div>
                      <h4 className="font-serif font-bold text-chocolate-dark dark:text-cream-bg text-base">Custom Embossing</h4>
                      <p className="text-xs text-chocolate-accent dark:text-cream-light/70 mt-1 leading-relaxed">
                        Add texture to your brand. Upload custom dies for bespoke wrapping solutions.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsQuoteOpen(true)}
                      className="mt-4 flex items-center space-x-1 text-xs text-primary-gold hover:text-primary-dark-gold font-bold uppercase tracking-wider"
                    >
                      <span>Request Samples</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <Link href="/#custom-section" className="text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                Custom Printing
              </Link>
              <Link href="/#why-choose-us" className="text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                Industries
              </Link>
              <Link href="/#about-section" className="text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                About Us
              </Link>
              <Link href="/#testimonials-section" className="text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                Reviews
              </Link>
              <Link href="/#newsletter-section" className="text-sm font-medium tracking-wide uppercase text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors">
                Newsletter
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Search Toggle */}
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={() => { setIsSearchOpen(!isSearchOpen); setIsCartOpen(false); setIsWishlistOpen(false); }}
                  className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors"
                  aria-label="Open Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 glass-premium p-4 rounded-2xl shadow-xl z-50"
                    >
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="Search luxury foils..."
                          value={searchVal}
                          onChange={(e) => setSearchVal(e.target.value)}
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-chocolate-accent" />
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-bold text-primary-gold uppercase tracking-wider mb-2">Search Results</p>
                        <div className="space-y-2">
                          {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                              <Link 
                                key={item.id}
                                href={`/product/${item.id}`}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-gold/10 transition-colors"
                              >
                                <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md" />
                                <div className="text-left">
                                  <p className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{item.name}</p>
                                  <p className="text-[10px] text-primary-gold font-semibold">${item.price.toFixed(2)}</p>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <p className="text-xs text-chocolate-accent italic">No packaging products found.</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Icon */}
              <div className="relative" ref={wishlistRef}>
                <button 
                  onClick={() => { setIsWishlistOpen(!isWishlistOpen); setIsCartOpen(false); setIsSearchOpen(false); }}
                  className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-gold text-chocolate-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {isWishlistOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 glass-premium p-4 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto"
                    >
                      <p className="text-xs font-bold text-primary-gold uppercase tracking-wider mb-3">Wishlist</p>
                      {wishlist.length > 0 ? (
                        <div className="space-y-3">
                          {wishlist.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-3 border-b border-primary-gold/10 pb-2">
                              <Link 
                                href={`/product/${item.id}`}
                                onClick={() => setIsWishlistOpen(false)}
                                className="flex items-center gap-2"
                              >
                                <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md" />
                                <span className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1 hover:text-primary-gold text-left">{item.name}</span>
                              </Link>
                              <span className="text-xs text-primary-gold font-bold">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-chocolate-accent italic py-4">Your wishlist is empty.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Drawer Toggle */}
              <div className="relative" ref={cartRef}>
                <button 
                  onClick={() => { setIsCartOpen(!isCartOpen); setIsWishlistOpen(false); setIsSearchOpen(false); }}
                  className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-gold text-chocolate-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-[360px] glass-premium p-4 rounded-2xl shadow-xl z-50 text-left"
                    >
                      <div className="flex items-center justify-between border-b border-primary-gold/15 pb-2 mb-3">
                        <span className="text-sm font-bold text-chocolate-dark dark:text-cream-bg uppercase">My Cart ({totalCartCount})</span>
                        <button onClick={() => setIsCartOpen(false)} className="text-chocolate-accent hover:text-primary-gold">
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {cart.length > 0 ? (
                        <>
                          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {cart.map((item) => {
                              const itemPrice = item.product.discountPrice || item.product.price;
                              const sizeModifier = item.selectedSize.priceModifier;
                              const singleTotal = itemPrice + sizeModifier;
                              
                              return (
                                <div key={item.id} className="flex gap-3 border-b border-primary-gold/10 pb-2">
                                  <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-cover rounded-md border border-primary-gold/10" />
                                  <div className="flex-1">
                                    <h5 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{item.product.name}</h5>
                                    <p className="text-[10px] text-chocolate-accent dark:text-cream-light/60 mt-0.5">
                                      Size: {item.selectedSize.name.split(' ')[0]} | Color: {item.selectedColor.name}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                      <div className="flex items-center space-x-2 border border-primary-gold/20 rounded-md px-1">
                                        <button 
                                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                          className="text-xs px-1 text-chocolate-accent hover:text-primary-gold"
                                        >-</button>
                                        <span className="text-xs text-chocolate-dark dark:text-cream-bg font-bold">{item.quantity}</span>
                                        <button 
                                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                          className="text-xs px-1 text-chocolate-accent hover:text-primary-gold"
                                        >+</button>
                                      </div>
                                      <span className="text-xs font-bold text-primary-gold">${(singleTotal * item.quantity).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-primary-gold/15 space-y-2">
                            <div className="flex justify-between text-xs text-chocolate-dark dark:text-cream-light">
                              <span>Subtotal</span>
                              <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                              <div className="flex justify-between text-xs text-green-500 font-medium">
                                <span>Discount ({discount}%)</span>
                                <span>-${(subtotal * discount / 100).toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm font-bold text-chocolate-dark dark:text-cream-bg border-t border-primary-gold/10 pt-2">
                              <span>Total</span>
                              <span className="text-primary-gold">${discountedSubtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <Link 
                                href="/cart"
                                onClick={() => setIsCartOpen(false)}
                                className="block text-center border border-primary-gold text-primary-gold py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-gold hover:text-chocolate-dark transition-all duration-300"
                              >
                                View Cart
                              </Link>
                              <Link 
                                href="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="block text-center bg-primary-gold text-chocolate-dark py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold transition-all duration-300 shadow-md shadow-primary-gold/20"
                              >
                                Checkout
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="py-6 text-center">
                          <ShoppingBag className="h-10 w-10 text-chocolate-accent/40 mx-auto mb-2" />
                          <p className="text-xs text-chocolate-accent italic">Your cart is empty.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* My Account */}
              <Link href="/account" className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold transition-colors" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>

              {/* Get Quote button */}
              <button 
                onClick={() => setIsQuoteOpen(true)}
                className="bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark font-sans text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg shadow-primary-gold/20 hover:shadow-primary-gold/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Actions and Burger */}
            <div className="flex lg:hidden items-center space-x-3">
              <button onClick={toggleTheme} className="p-2 text-chocolate-dark dark:text-cream-bg" aria-label="Toggle Theme">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              
              <Link href="/cart" className="p-2 text-chocolate-dark dark:text-cream-bg relative" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-gold text-chocolate-dark text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                aria-label="Open Menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-cream-bg dark:bg-chocolate-dark z-40 shadow-2xl p-6 pt-24 flex flex-col justify-between border-l border-primary-gold/10"
          >
            <div className="space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search foils..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-chocolate-dark/5 dark:bg-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none border border-primary-gold/10 text-chocolate-dark dark:text-cream-bg"
                />
                <Search className="absolute right-3 top-3.5 h-4 w-4 text-chocolate-accent" />
              </div>

              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  Home
                </Link>
                <Link 
                  href="/#products-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  Products
                </Link>
                <Link 
                  href="/#custom-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  Custom Printing
                </Link>
                <Link 
                  href="/#why-choose-us" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  Why Choose Us
                </Link>
                <Link 
                  href="/account" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  My Account
                </Link>
                <Link 
                  href="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-chocolate-dark dark:text-cream-bg hover:text-primary-gold"
                >
                  Admin Portal
                </Link>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-primary-gold/10">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsQuoteOpen(true); }}
                className="w-full bg-primary-gold text-chocolate-dark py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-primary-dark-gold transition-all duration-300"
              >
                Request A Quote
              </button>
              <p className="text-center text-[10px] text-chocolate-accent">© 2026 ChocolateFoil.com. All Rights Reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Dialog Modal */}
      <AnimatePresence>
        {isQuoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream-bg dark:bg-chocolate-medium max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-primary-gold/20 text-left"
            >
              <button 
                onClick={() => setIsQuoteOpen(false)}
                className="absolute right-4 top-4 text-chocolate-accent hover:text-primary-gold cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-chocolate-dark dark:text-cream-bg mb-2">Request Business Quote</h3>
              <p className="text-xs text-chocolate-accent dark:text-cream-light/70 mb-6">
                Receive bulk pricing matrices and customized printing templates for custom foil orders.
              </p>

              {quoteSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-16 w-16 text-primary-gold animate-bounce mb-4" />
                  <h4 className="text-lg font-bold text-chocolate-dark dark:text-cream-bg font-serif">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-chocolate-accent dark:text-cream-light/60 mt-1">Our packaging engineers will call/email you in 2-4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Name</label>
                      <input 
                        type="text" required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Email</label>
                      <input 
                        type="email" required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Company</label>
                      <input 
                        type="text" required
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Foil Type</label>
                      <select 
                        value={quoteForm.foilType}
                        onChange={(e) => setQuoteForm({...quoteForm, foilType: e.target.value})}
                        className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                      >
                        <option>Gold Foils</option>
                        <option>Silver Foils</option>
                        <option>Printed Foils</option>
                        <option>Candy Wrappers</option>
                        <option>Chocolate Boxes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-primary-gold mb-1">Description of Requirements</label>
                    <textarea 
                      rows={3} required
                      placeholder="Specify sizes, quantities, color preferences or custom embossing needs..."
                      value={quoteForm.description}
                      onChange={(e) => setQuoteForm({...quoteForm, description: e.target.value})}
                      className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-primary-gold hover:bg-primary-dark-gold text-chocolate-dark font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all duration-300"
                  >
                    Submit Quotation Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
