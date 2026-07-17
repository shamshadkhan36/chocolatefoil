'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Box, ShoppingCart, Users, Settings, 
  Sparkles, Check, AlertTriangle, ArrowUpRight, 
  ArrowDownRight, RefreshCcw, Landmark, Percent 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'inventory' | 'analytics' | 'settings'>('dashboard');

  // Stats Counters
  const summaryStats = [
    { label: 'Net Business Revenue', value: '$84,920.00', change: '+14.2%', up: true },
    { label: 'Active Order Volume', value: '1,240 orders', change: '+8.4%', up: true },
    { label: 'Customer Conversion', value: '4.82%', change: '-0.3%', up: false },
    { label: 'Active Live Users', value: '82 visitors', change: '+24%', up: true }
  ];

  // Mock Products Database
  const [adminProducts, setAdminProducts] = useState([
    { id: '1', name: 'Royal Gold Chocolate Foil Roll', price: 89.00, stock: 45, category: 'Gold Foils', status: 'In Stock' },
    { id: '2', name: 'Imperial Silver Wrapping Foil', price: 79.00, stock: 60, category: 'Silver Foils', status: 'In Stock' },
    { id: '3', name: 'Ruby Red Candy Wrappers', price: 34.00, stock: 120, category: 'Candy Wrappers', status: 'In Stock' },
    { id: '4', name: 'Vanguard Embossed Chocolate Foil', price: 95.00, stock: 12, category: 'Chocolate Foils', status: 'Low Stock' },
    { id: '5', name: 'Classic Color Aluminium Foil Set', price: 65.00, stock: 0, category: 'Color Foils', status: 'Out Of Stock' }
  ]);

  // Mock Orders
  const [adminOrders, setAdminOrders] = useState([
    { id: 'ORD-894102', customer: 'Valerie Dupont', date: '2026-06-15', total: 267.00, status: 'Shipped' },
    { id: 'ORD-752109', customer: 'Marcus Sterling', date: '2026-06-14', total: 102.00, status: 'Processing' },
    { id: 'ORD-624108', customer: 'Stefan K.', date: '2026-06-12', total: 48.00, status: 'Delivered' },
    { id: 'ORD-519208', customer: 'Elena Rostova', date: '2026-06-10', total: 720.00, status: 'Processing' }
  ]);

  // Mock Customers
  const customersList = [
    { name: 'Valerie Dupont', company: 'Maison du Chocolat', email: 'valerie@maisonchocolat.ch', spend: '$4,890.00', orders: 12 },
    { name: 'Marcus Sterling', company: 'Sterling Chocolates', email: 'marcus@sterling.co.uk', spend: '$12,400.00', orders: 24 },
    { name: 'Stefan K.', company: 'Bavarian Sweets', email: 'stefan@bavariansweets.de', spend: '$2,100.00', orders: 6 },
    { name: 'Elena Rostova', company: 'Moscow Sweet Craft', email: 'elena@sweetcraft.ru', spend: '$9,820.00', orders: 19 }
  ];

  // CRUD Product Forms
  const [editingProd, setEditingProd] = useState<any>(null);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(0);
  const [newProdStock, setNewProdStock] = useState(0);

  const handleUpdatePriceStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProd) return;
    
    setAdminProducts(prev => prev.map(p => {
      if (p.id === editingProd.id) {
        let status = 'In Stock';
        if (newProdStock === 0) status = 'Out Of Stock';
        else if (newProdStock < 15) status = 'Low Stock';
        return { ...p, price: newProdPrice, stock: newProdStock, status };
      }
      return p;
    }));
    setEditingProd(null);
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <>
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-cream-bg dark:bg-chocolate-dark text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold font-sans">Control Center</span>
              <h1 className="text-3xl font-serif font-bold text-chocolate-dark dark:text-cream-bg mt-1">Admin Panel Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-primary-gold/10 border border-primary-gold/25 p-3 rounded-2xl">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
              <span className="text-[10px] uppercase font-bold text-chocolate-dark dark:text-cream-bg">Live Server Connections Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar (Left Grid) */}
            <div className="lg:col-span-3 glass-premium p-6 rounded-3xl space-y-2">
              <div className="flex items-center gap-3 border-b border-primary-gold/10 pb-4 mb-4">
                <div className="h-10 w-10 bg-chocolate-dark border border-primary-gold/30 rounded-full flex items-center justify-center text-primary-gold font-bold">AD</div>
                <div>
                  <h4 className="text-xs font-bold text-chocolate-dark dark:text-cream-bg">Concierge Admin</h4>
                  <span className="text-[10px] text-chocolate-accent">Role: Supervisor</span>
                </div>
              </div>

              {[
                { id: 'dashboard', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'products', label: 'Manage Products', icon: <Box className="h-4 w-4" /> },
                { id: 'orders', label: 'Sales Orders', icon: <ShoppingCart className="h-4 w-4" /> },
                { id: 'customers', label: 'Customers CRM', icon: <Users className="h-4 w-4" /> },
                { id: 'analytics', label: 'Market Analytics', icon: <Landmark className="h-4 w-4" /> },
                { id: 'settings', label: 'Portal Settings', icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setEditingProd(null); }}
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
            </div>

            {/* Content Display (Right Grid) */}
            <div className="lg:col-span-9 glass-premium rounded-3xl p-6 sm:p-8 min-h-[480px]">
              <AnimatePresence mode="wait">
                
                {/* 1. Overview */}
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {summaryStats.map((st, idx) => (
                        <div key={idx} className="border border-primary-gold/15 p-4 sm:p-5 rounded-2xl text-left space-y-1 bg-white/30 dark:bg-black/10">
                          <span className="text-[9px] uppercase font-bold text-chocolate-accent dark:text-cream-light/50 tracking-wider block">{st.label}</span>
                          <p className="text-lg sm:text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg">{st.value}</p>
                          <div className="flex items-center gap-1.5 text-[10px] mt-2">
                            {st.up ? (
                              <span className="text-green-500 font-bold flex items-center"><ArrowUpRight className="h-3 w-3" /> {st.change}</span>
                            ) : (
                              <span className="text-red-500 font-bold flex items-center"><ArrowDownRight className="h-3 w-3" /> {st.change}</span>
                            )}
                            <span className="text-chocolate-accent/60">vs last week</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SVG Chart display */}
                    <div className="border border-primary-gold/10 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-primary-gold font-serif">Quarterly Financial Trend</h4>
                        <span className="text-[10px] font-sans text-chocolate-accent">Values in Thousands (CHF)</span>
                      </div>
                      <div className="w-full h-48 bg-chocolate-dark/5 dark:bg-white/5 rounded-xl flex items-end justify-between p-4 relative">
                        {/* Simulated chart bars using div shapes */}
                        {[
                          { month: 'Jan', revenue: 65, height: '65%' },
                          { month: 'Feb', revenue: 78, height: '78%' },
                          { month: 'Mar', revenue: 95, height: '95%' },
                          { month: 'Apr', revenue: 84, height: '84%' },
                          { month: 'May', revenue: 110, height: '100%' },
                          { month: 'Jun', revenue: 92, height: '92%' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <span className="text-[9px] font-bold text-primary-gold">{item.revenue}K</span>
                            <div className="w-8 sm:w-12 bg-gradient-to-t from-primary-dark-gold to-primary-gold rounded-t-lg transition-all duration-1000" style={{ height: item.height }} />
                            <span className="text-[9px] uppercase font-bold text-chocolate-accent">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Products List */}
                {activeTab === 'products' && (
                  <motion.div 
                    key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Active Catalog Manager</h3>
                    
                    {editingProd ? (
                      <form onSubmit={handleUpdatePriceStock} className="space-y-4 max-w-md bg-chocolate-dark/5 dark:bg-white/5 p-6 rounded-2xl border border-primary-gold/25">
                        <h4 className="font-serif font-bold text-chocolate-dark dark:text-cream-bg text-sm">Modify "{editingProd.name}"</h4>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Price ($)</label>
                            <input 
                              type="number" step="0.01" required
                              value={newProdPrice}
                              onChange={(e) => setNewProdPrice(parseFloat(e.target.value))}
                              className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2 py-1.5 text-chocolate-dark dark:text-cream-bg focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Inventory Level</label>
                            <input 
                              type="number" required
                              value={newProdStock}
                              onChange={(e) => setNewProdStock(parseInt(e.target.value))}
                              className="w-full bg-white/5 border border-primary-gold/20 rounded-lg px-2 py-1.5 text-chocolate-dark dark:text-cream-bg focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                          <button 
                            type="button" 
                            onClick={() => setEditingProd(null)}
                            className="text-[10px] font-bold uppercase tracking-wider text-chocolate-accent px-4 py-2 border rounded-lg"
                          >
                            Cancel
                          </button>
                          
                          <button 
                            type="submit"
                            className="text-[10px] font-bold uppercase tracking-wider bg-primary-gold text-chocolate-dark px-4 py-2 rounded-lg"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-primary-gold/20 text-primary-gold uppercase tracking-wider font-bold">
                              <th className="py-3 px-2">Item Name</th>
                              <th className="py-3 px-2">Category</th>
                              <th className="py-3 px-2 text-right">Price</th>
                              <th className="py-3 px-2 text-right">Stock</th>
                              <th className="py-3 px-2 text-center">Status</th>
                              <th className="py-3 px-2 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-primary-gold/5 text-chocolate-dark dark:text-cream-bg">
                            {adminProducts.map((p) => (
                              <tr key={p.id} className="hover:bg-primary-gold/5 transition-colors">
                                <td className="py-3.5 px-2 font-semibold">{p.name}</td>
                                <td className="py-3.5 px-2 text-chocolate-accent">{p.category}</td>
                                <td className="py-3.5 px-2 text-right font-semibold">${p.price.toFixed(2)}</td>
                                <td className="py-3.5 px-2 text-right font-bold">{p.stock} units</td>
                                <td className="py-3.5 px-2 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                    p.status === 'In Stock' 
                                      ? 'bg-green-500/10 text-green-500' 
                                      : p.status === 'Low Stock' 
                                        ? 'bg-yellow-500/10 text-yellow-500 animate-pulse' 
                                        : 'bg-red-500/10 text-red-500'
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-2 text-center">
                                  <button
                                    onClick={() => {
                                      setEditingProd(p);
                                      setNewProdPrice(p.price);
                                      setNewProdStock(p.stock);
                                    }}
                                    className="text-[10px] font-bold text-primary-gold hover:underline"
                                  >
                                    Adjust
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. Orders list */}
                {activeTab === 'orders' && (
                  <motion.div 
                    key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Sales Order Pipeline</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-primary-gold/20 text-primary-gold uppercase tracking-wider font-bold">
                            <th className="py-3 px-2">Order ID</th>
                            <th className="py-3 px-2">Customer</th>
                            <th className="py-3 px-2">Date</th>
                            <th className="py-3 px-2 text-right">Invoice Sum</th>
                            <th className="py-3 px-2 text-center">Dispatch Status</th>
                            <th className="py-3 px-2 text-center">Status Control</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-gold/5 text-chocolate-dark dark:text-cream-bg">
                          {adminOrders.map((o) => (
                            <tr key={o.id} className="hover:bg-primary-gold/5 transition-colors">
                              <td className="py-3.5 px-2 font-bold font-mono">{o.id}</td>
                              <td className="py-3.5 px-2 font-semibold">{o.customer}</td>
                              <td className="py-3.5 px-2 text-chocolate-accent">{o.date}</td>
                              <td className="py-3.5 px-2 text-right font-bold text-primary-gold">${o.total.toFixed(2)}</td>
                              <td className="py-3.5 px-2 text-center">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  o.status === 'Delivered' 
                                    ? 'bg-green-500/10 text-green-500' 
                                    : o.status === 'Shipped' 
                                      ? 'bg-blue-500/10 text-blue-500' 
                                      : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                  {o.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-2 text-center">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                  className="bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded text-[10px] font-bold text-chocolate-dark dark:text-cream-bg focus:outline-none"
                                >
                                  <option>Processing</option>
                                  <option>Shipped</option>
                                  <option>Delivered</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* 4. Customers CRM */}
                {activeTab === 'customers' && (
                  <motion.div 
                    key="customers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Client Relationship CRM</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-primary-gold/20 text-primary-gold uppercase tracking-wider font-bold">
                            <th className="py-3 px-2">Account Name</th>
                            <th className="py-3 px-2">Company / Studio</th>
                            <th className="py-3 px-2">Contact Email</th>
                            <th className="py-3 px-2 text-right">Total Invoices</th>
                            <th className="py-3 px-2 text-right">Orders Volume</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-gold/5 text-chocolate-dark dark:text-cream-bg">
                          {customersList.map((c, idx) => (
                            <tr key={idx} className="hover:bg-primary-gold/5 transition-colors">
                              <td className="py-3.5 px-2 font-bold">{c.name}</td>
                              <td className="py-3.5 px-2 font-semibold text-chocolate-accent">{c.company}</td>
                              <td className="py-3.5 px-2 font-mono text-chocolate-accent">{c.email}</td>
                              <td className="py-3.5 px-2 text-right font-bold text-primary-gold">{c.spend}</td>
                              <td className="py-3.5 px-2 text-right font-bold">{c.orders} requests</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* 5. Analytics details */}
                {activeTab === 'analytics' && (
                  <motion.div 
                    key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Market & Traffic Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="border border-primary-gold/10 p-5 rounded-2xl space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary-gold font-serif">Category Performance Share</h4>
                        <div className="space-y-3 text-xs">
                          {[
                            { cat: 'Gold Foil Rolls', share: 45, width: '45%' },
                            { cat: 'Candy Wrappers', share: 25, width: '25%' },
                            { cat: 'Custom Die Emboss', share: 18, width: '18%' },
                            { cat: 'Chocolate Gift Boxes', share: 12, width: '12%' }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1 text-left">
                              <div className="flex justify-between font-bold text-chocolate-dark dark:text-cream-bg">
                                <span>{item.cat}</span>
                                <span>{item.share}%</span>
                              </div>
                              <div className="w-full bg-chocolate-dark/5 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary-gold h-full rounded-full" style={{ width: item.width }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-primary-gold/10 p-5 rounded-2xl text-left space-y-2 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary-gold font-serif mb-2">Regional Traffic Origin</h4>
                          <ul className="space-y-2 text-xs text-chocolate-accent">
                            <li className="flex justify-between border-b border-primary-gold/5 pb-1"><span>Europe (Switzerland, Germany, France)</span> <strong className="text-chocolate-dark dark:text-cream-bg">54%</strong></li>
                            <li className="flex justify-between border-b border-primary-gold/5 pb-1"><span>North America (USA, Canada)</span> <strong className="text-chocolate-dark dark:text-cream-bg">28%</strong></li>
                            <li className="flex justify-between border-b border-primary-gold/5 pb-1"><span>Asia Pacific & India</span> <strong className="text-chocolate-dark dark:text-cream-bg">18%</strong></li>
                          </ul>
                        </div>
                        <p className="text-[10px] text-chocolate-accent/65 leading-relaxed pt-4 border-t border-primary-gold/5">Origin analysis updated 10 minutes ago based on live geolocation tags.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 6. Portal Settings */}
                {activeTab === 'settings' && (
                  <motion.div 
                    key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-serif font-bold text-chocolate-dark dark:text-cream-bg border-b border-primary-gold/15 pb-2">Global System Settings</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Settings successfully updated!'); }} className="space-y-4 max-w-md text-xs">
                      <div>
                        <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Standard VAT Tax rate (%)</label>
                        <input 
                          type="text" 
                          defaultValue="8.0"
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Standard Flat Shipping rate ($)</label>
                        <input 
                          type="text" 
                          defaultValue="12.00"
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] uppercase font-bold text-primary-gold mb-1">Standard Free Shipping Threshold ($)</label>
                        <input 
                          type="text" 
                          defaultValue="150.00"
                          className="w-full bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-lg px-2.5 py-2 text-chocolate-dark dark:text-cream-bg"
                        />
                      </div>

                      <button type="submit" className="bg-primary-gold text-chocolate-dark px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-dark-gold">Save System Settings</button>
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
