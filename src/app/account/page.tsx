'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/shop-context';
import { 
  User, Package, Heart, MapPin, Download, 
  Settings, ShoppingBag, Eye, LogOut, CheckCircle2, 
  AlertCircle, ChevronRight, Sparkles, ShieldAlert 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function MyAccountPage() {
  const { wishlist, orders, toggleWishlist, addToCart } = useShop();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'downloads' | 'profile'>('dashboard');

  // Address State
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      type: 'Billing & Shipping (Primary)',
      fullName: 'Valerie Dupont',
      company: 'Maison du Chocolat',
      addressLine: '14 Avenue de la Concorde',
      city: 'Geneva',
      state: 'Geneva',
      zip: '1201',
      country: 'Switzerland'
    }
  ]);
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '', company: '', addressLine: '', city: '', state: '', zip: '', country: 'Switzerland'
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    firstName: 'Valerie',
    lastName: 'Dupont',
    email: 'valerie@maisonchocolat.ch',
    company: 'Maison du Chocolat',
    taxId: 'CHE-123.456.789 MWST',
    currentPass: '',
    newPass: ''
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Mock initial orders if user has not placed any during session
  const mockOrders = [
    {
      id: 'ORD-894102',
      date: '2026-06-15',
      status: 'Delivered',
      total: 267.00,
      paymentMethod: 'Credit Card',
      items: [
        { product: { name: 'Royal Gold Chocolate Foil Roll', image: 'https://images.unsplash.com/photo-1549007994-cb92ca818bc6?q=80&w=150' }, quantity: 2, selectedSize: { name: 'Boutique Roll (50m)' } }
      ]
    },
    {
      id: 'ORD-752109',
      date: '2026-05-01',
      status: 'Delivered',
      total: 102.00,
      paymentMethod: 'UPI Pay',
      items: [
        { product: { name: 'Ruby Red Candy Wrappers', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=150' }, quantity: 3, selectedSize: { name: 'Standard (10x10 cm)' } }
      ]
    }
  ];

  const allOrders = orders.length > 0 ? [...orders, ...mockOrders] : mockOrders;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `addr-${Date.now()}`;
    setSavedAddresses([...savedAddresses, {
      id,
      type: 'Additional Shipping',
      addressLine: newAddr.addressLine,
      city: newAddr.city,
      country: newAddr.country,
      fullName: newAddr.fullName,
      company: newAddr.company,
      state: newAddr.state,
      zip: newAddr.zip
    }]);
    setIsAddingAddr(false);
    setNewAddr({
      fullName: '', company: '', addressLine: '', city: '', state: '', zip: '', country: 'Switzerland'
    });
  };

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-cream-bg dark:bg-chocolate-dark text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation (Left) */}
            <div className="lg:col-span-3 glass-premium p-6 rounded-3xl space-y-2">
              <div className="flex items-center gap-3 border-b border-primary-gold/10 pb-4 mb-4">
                <div className="h-10 w-10 bg-primary-gold/15 rounded-full flex items-center justify-center text-primary-gold font-bold">VD</div>
                <div>
                  <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">Valerie Dupont</h4>
                  <span className="text-[10px] text-chocolate-accent line-clamp-1">{profileForm.email}</span>
                </div>
              </div>

              {[
                { id: 'dashboard', label: 'Dashboard', icon: <User className="h-4 w-4" /> },
                { id: 'orders', label: 'Orders History', icon: <Package className="h-4 w-4" /> },
                { id: 'wishlist', label: 'My Wishlist', icon: <Heart className="h-4 w-4" /> },
                { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="h-4 w-4" /> },
                { id: 'downloads', label: 'Print Templates', icon: <Download className="h-4 w-4" /> },
                { id: 'profile', label: 'Profile Details', icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-primary-gold text-chocolate-dark shadow-md shadow-primary-gold/10' 
                      : 'text-chocolate-accent dark:text-cream-light/60 hover:bg-primary-gold/10 hover:text-primary-gold'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}

              <Link 
                href="/" 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50/10 transition-colors pt-4 border-t border-primary-gold/10 mt-4"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Link>
            </div>

            {/* Dashboard Content Panel (Right) */}
            <div className="lg:col-span-9 glass-premium rounded-3xl p-6 sm:p-8 min-h-[460px]">
              <AnimatePresence mode="wait">
                
                {/* 1. Dashboard */}
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-primary-gold/10 border border-primary-gold/20 p-6 rounded-2xl">
                      <div className="space-y-1">
                        <h3 className="text-lg font-serif font-bold text-chocolate-dark dark:text-cream-bg flex items-center gap-1.5">
                          <Sparkles className="h-5 w-5 text-primary-gold" />
                          <span>Welcome back, Valerie!</span>
                        </h3>
                        <p className="text-xs text-chocolate-accent dark:text-cream-light/75">
                          Manage your factory orders, download artwork guidelines, or request new custom printing templates.
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 bg-chocolate-dark text-white rounded-full">Enterprise Tier</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border border-primary-gold/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-primary-gold">Recent Order Status</span>
                        <h4 className="text-lg font-bold text-chocolate-dark dark:text-cream-bg font-serif">{allOrders[0].id}</h4>
                        <p className="text-xs text-green-500 font-semibold">{allOrders[0].status}</p>
                      </div>
                      <div className="border border-primary-gold/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-primary-gold">Wishlisted Items</span>
                        <h4 className="text-2xl font-bold text-chocolate-dark dark:text-cream-bg font-serif">{wishlist.length}</h4>
                        <button onClick={() => setActiveTab('wishlist')} className="text-xs text-primary-gold font-bold hover:underline">View Wishlist</button>
                      </div>
                      <div className="border border-primary-gold/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-primary-gold">Tax Registration</span>
                        <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg font-mono line-clamp-1">{profileForm.taxId}</h4>
                        <span className="text-[10px] text-chocolate-accent">Verified</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Orders History */}
                {activeTab === 'orders' && (
                  <motion.div 
                    key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Orders Archive</h3>
                    
                    <div className="space-y-4">
                      {allOrders.map((ord) => (
                        <div key={ord.id} className="border border-primary-gold/10 rounded-2xl p-5 space-y-4 text-xs">
                          <div className="flex flex-col sm:flex-row justify-between border-b border-primary-gold/5 pb-3 gap-2">
                            <div>
                              <p className="font-bold text-chocolate-dark dark:text-cream-bg">{ord.id}</p>
                              <span className="text-chocolate-accent">Placed on {ord.date}</span>
                            </div>
                            <div className="text-left sm:text-right">
                              <span className="font-bold text-primary-gold block text-sm">${ord.total.toFixed(2)}</span>
                              <span className="text-[10px] text-chocolate-accent">{ord.paymentMethod}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {ord.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-3 items-center">
                                <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover rounded-lg border border-primary-gold/10" />
                                <div className="flex-1">
                                  <p className="font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{item.product.name}</p>
                                  <span className="text-[10px] text-chocolate-accent">Qty: {item.quantity} | Size: {item.selectedSize.name}</span>
                                </div>
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 text-chocolate-dark dark:text-cream-bg rounded">
                                  {ord.status}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-3 pt-2 justify-end border-t border-primary-gold/5">
                            <button className="text-[10px] font-bold uppercase tracking-wider text-primary-gold border border-primary-gold/25 px-4 py-2 rounded-lg hover:bg-primary-gold/10">Download Invoice</button>
                            <button className="text-[10px] font-bold uppercase tracking-wider bg-primary-gold text-chocolate-dark px-4 py-2 rounded-lg hover:bg-primary-dark-gold">Track Order</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. Wishlist */}
                {activeTab === 'wishlist' && (
                  <motion.div 
                    key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">My Wishlist</h3>
                    
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlist.map((item) => (
                          <div key={item.id} className="border border-primary-gold/10 rounded-2xl p-4 flex flex-col justify-between aspect-[3/4] relative">
                            
                            <button 
                              onClick={() => toggleWishlist(item)}
                              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white text-red-500 shadow flex items-center justify-center cursor-pointer"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </button>

                            <img src={item.image} alt={item.name} className="h-32 w-full object-cover rounded-xl mb-3" />
                            
                            <div className="text-left space-y-1">
                              <span className="text-[8px] font-bold text-primary-gold uppercase">{item.category}</span>
                              <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg line-clamp-1">{item.name}</h4>
                              <span className="text-xs font-bold text-primary-gold block mt-1">${item.price.toFixed(2)}</span>
                            </div>

                            <button 
                              onClick={() => addToCart(item, 1, item.colors[0], item.sizes[0])}
                              className="mt-3 w-full py-2 bg-chocolate-dark text-white hover:bg-primary-gold hover:text-chocolate-dark text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                              <span>Move To Cart</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <Heart className="h-12 w-12 text-chocolate-accent/30 mx-auto mb-2" />
                        <p className="text-xs text-chocolate-accent italic">Your wishlist is empty. Browse and save items!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. Addresses */}
                {activeTab === 'addresses' && (
                  <motion.div 
                    key="addresses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-primary-gold/15 pb-2">
                      <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">Saved Addresses</h3>
                      <button 
                        onClick={() => setIsAddingAddr(!isAddingAddr)}
                        className="text-xs font-bold uppercase tracking-wider text-primary-gold hover:text-primary-dark-gold"
                      >
                        {isAddingAddr ? 'Cancel' : '+ Add Address'}
                      </button>
                    </div>

                    {isAddingAddr ? (
                      <form onSubmit={handleAddAddress} className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Full Name</label>
                            <input 
                              type="text" required
                              value={newAddr.fullName}
                              onChange={(e) => setNewAddr({...newAddr, fullName: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Company</label>
                            <input 
                              type="text"
                              value={newAddr.company}
                              onChange={(e) => setNewAddr({...newAddr, company: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Address Line</label>
                          <input 
                            type="text" required
                            value={newAddr.addressLine}
                            onChange={(e) => setNewAddr({...newAddr, addressLine: e.target.value})}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="col-span-2">
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">City</label>
                            <input 
                              type="text" required
                              value={newAddr.city}
                              onChange={(e) => setNewAddr({...newAddr, city: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">State</label>
                            <input 
                              type="text" required
                              value={newAddr.state}
                              onChange={(e) => setNewAddr({...newAddr, state: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Zip Code</label>
                            <input 
                              type="text" required
                              value={newAddr.zip}
                              onChange={(e) => setNewAddr({...newAddr, zip: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/20 rounded-lg px-2.5 py-1.5 text-xs text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                        </div>
                        <button type="submit" className="bg-primary-gold text-chocolate-dark px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold">Save Address</button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-chocolate-accent">
                        {savedAddresses.map((addr) => (
                          <div key={addr.id} className="border border-primary-gold/15 rounded-2xl p-5 space-y-2 relative">
                            <span className="text-[8px] font-bold text-primary-gold uppercase tracking-widest">{addr.type}</span>
                            <p className="font-bold text-chocolate-dark dark:text-cream-bg mt-1">{addr.fullName}</p>
                            {addr.company && <p className="font-medium text-chocolate-dark/80 dark:text-cream-light/80">{addr.company}</p>}
                            <p>{addr.addressLine}</p>
                            <p>{addr.city}, {addr.state} - {addr.zip}</p>
                            <p className="font-bold text-chocolate-dark dark:text-cream-bg">{addr.country}</p>
                            
                            <div className="flex gap-3 pt-3 mt-3 border-t border-primary-gold/10 justify-end">
                              <button className="text-[9px] uppercase font-bold tracking-wider text-red-500 hover:text-red-600">Delete</button>
                              <button className="text-[9px] uppercase font-bold tracking-wider text-primary-gold hover:underline">Edit Address</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 5. Downloads */}
                {activeTab === 'downloads' && (
                  <motion.div 
                    key="downloads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Packaging Vector Guidelines</h3>
                    <p className="text-xs text-chocolate-accent dark:text-cream-light/75 leading-relaxed">
                      Download pre-press Adobe Illustrator (AI), PDF, and Photoshop (PSD) template files matching standard chocolate bar dimensions. Add your artwork within guide channels.
                    </p>

                    <div className="divide-y divide-primary-gold/10 text-xs">
                      {[
                        { title: 'Standard 100g Bar Wrapper Die Layout', type: 'PDF / Adobe Illustrator', size: '2.4 MB' },
                        { title: 'Artisanal Praline Wrap 10x10 cm Guide', type: 'PDF Guideline Document', size: '1.8 MB' },
                        { title: '16-Piece Grid Custom Lid Stamp Guide', type: 'PSD Photoshop Layered', size: '5.6 MB' }
                      ].map((doc, idx) => (
                        <div key={idx} className="py-4 first:pt-0 flex justify-between items-center gap-4 text-left">
                          <div>
                            <p className="font-bold text-chocolate-dark dark:text-cream-bg">{doc.title}</p>
                            <span className="text-[10px] text-chocolate-accent">{doc.type} | {doc.size}</span>
                          </div>
                          <button className="h-9 w-9 rounded-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/25 hover:bg-primary-gold hover:text-chocolate-dark transition-colors flex items-center justify-center text-primary-gold cursor-pointer">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 6. Profile */}
                {activeTab === 'profile' && (
                  <motion.div 
                    key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Profile Configuration</h3>
                    
                    {profileSaved && (
                      <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                        <span>Profile parameters saved successfully!</span>
                      </div>
                    )}

                    <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">First Name</label>
                          <input 
                            type="text" required
                            value={profileForm.firstName}
                            onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Last Name</label>
                          <input 
                            type="text" required
                            value={profileForm.lastName}
                            onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Business Email</label>
                          <input 
                            type="email" required
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Company / Studio</label>
                          <input 
                            type="text" required
                            value={profileForm.company}
                            onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                            className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">VAT Register ID</label>
                        <input 
                          type="text"
                          value={profileForm.taxId}
                          onChange={(e) => setProfileForm({...profileForm, taxId: e.target.value})}
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                        />
                      </div>

                      <div className="border-t border-primary-gold/10 pt-4 space-y-4">
                        <h4 className="font-serif font-bold text-chocolate-dark dark:text-cream-bg text-sm">Security Modification</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Current Password</label>
                            <input 
                              type="password"
                              placeholder="••••••••"
                              value={profileForm.currentPass}
                              onChange={(e) => setProfileForm({...profileForm, currentPass: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">New Password</label>
                            <input 
                              type="password"
                              placeholder="Min. 8 characters"
                              value={profileForm.newPass}
                              onChange={(e) => setProfileForm({...profileForm, newPass: e.target.value})}
                              className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                            />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="bg-primary-gold text-chocolate-dark px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold transition-colors">Save Profiles</button>
                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
