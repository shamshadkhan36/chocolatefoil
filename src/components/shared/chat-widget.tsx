'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, X, MessageCircle, 
  HelpCircle, UserCheck, Check, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: 'Hello! I am Clara, your Luxury Packaging Concierge. How can I assist you with your chocolate wrapper order today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Agent response based on user input
    setTimeout(() => {
      let replyText = "Thank you for reaching out! A senior packaging engineer has been notified and will review your inquiry. You can also request a fast quote via our 'Get Quote' button in the menu.";
      
      const query = inputValue.toLowerCase();
      if (query.includes('custom') || query.includes('logo') || query.includes('print')) {
        replyText = "We offer premium custom rotogravure printing up to 8 colors! Minimum order quantity is usually 50,000 sheets or 5 master rolls. You can upload your design on our Custom Printing section.";
      } else if (query.includes('price') || query.includes('cost') || query.includes('bulk')) {
        replyText = "For wholesale bulk orders above 10 master rolls, we offer up to a 35% discount. Our sales team will email you a complete PDF price matrix within 2 hours.";
      } else if (query.includes('food') || query.includes('safe') || query.includes('fda')) {
        replyText = "Yes, absolutely! All our aluminium foils are 100% FDA-approved food-grade, ISO 9001 certified, and plasticizer-free. We print using solvent-free organic inks.";
      } else if (query.includes('sample') || query.includes('free')) {
        replyText = "We supply free sample kits containing assorted gold, silver, embossed, and printed foil sheets! Just submit your shipping address in the 'Get Quote' form and note 'Free Samples Request'.";
      }

      const agentMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const selectWhatsAppTopic = (topic: string) => {
    setIsWhatsAppOpen(false);
    const mockWhatsAppUrl = `https://wa.me/41227958900?text=${encodeURIComponent(`Hello, I am interested in ${topic} for ChocolateFoil.com.`)}`;
    window.open(mockWhatsAppUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 font-sans">
      
      {/* WhatsApp Pulse Menu */}
      <AnimatePresence>
        {isWhatsAppOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-72 bg-white dark:bg-chocolate-medium p-4 rounded-2xl shadow-2xl border border-green-500/20 text-left"
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                <span className="text-xs font-bold text-gray-800 dark:text-cream-bg">WhatsApp Concierge</span>
              </div>
              <button onClick={() => setIsWhatsAppOpen(false)} className="text-gray-400 hover:text-green-500">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-cream-light/60 leading-relaxed mb-4">
              Select a conversation topic to chat directly with our sales team via WhatsApp:
            </p>
            <div className="space-y-2">
              {[
                'Bulk Roll Quotations',
                'Custom Logo Die Embossing',
                'Free Paper & Foil Sample Kit',
                'Active Order Delivery Tracking'
              ].map((topic) => (
                <button 
                  key={topic}
                  onClick={() => selectWhatsAppTopic(topic)}
                  className="w-full text-left text-xs bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600 border border-transparent hover:border-green-500/30 p-2.5 rounded-xl transition-all duration-200 font-medium text-chocolate-dark dark:text-cream-light"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[340px] sm:w-[360px] h-[480px] glass-premium rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Chat Header */}
            <div className="bg-chocolate-dark border-b border-primary-gold/15 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-primary-gold/10 border border-primary-gold flex items-center justify-center text-primary-gold">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">Clara</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-cream-light/60">Packaging Specialist</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 text-cream-light/40 hover:text-primary-gold transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-cream-bg/40 dark:bg-chocolate-dark/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl p-3 text-xs shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-gold text-chocolate-dark font-medium rounded-tr-none'
                      : 'bg-white dark:bg-chocolate-medium text-chocolate-dark dark:text-cream-bg rounded-tl-none border border-primary-gold/10'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-[8px] text-right mt-1.5 ${
                      msg.sender === 'user' ? 'text-chocolate-dark/60' : 'text-chocolate-accent dark:text-cream-light/40'
                    }`}>{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-chocolate-medium rounded-2xl rounded-tl-none p-3 border border-primary-gold/10 flex items-center space-x-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-chocolate-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-chocolate-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-chocolate-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-primary-gold/10 bg-white/80 dark:bg-chocolate-medium/80 flex items-center gap-2">
              <input 
                type="text"
                placeholder="Ask Clara about foils, quotes..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-chocolate-dark/5 dark:bg-white/5 border border-primary-gold/15 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary-gold text-chocolate-dark dark:text-cream-bg"
              />
              <button 
                type="submit"
                className="bg-primary-gold text-chocolate-dark p-2 rounded-xl hover:bg-primary-dark-gold transition-colors shadow-md shadow-primary-gold/10"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons Row */}
      <div className="flex items-center space-x-3">
        {/* WhatsApp Icon */}
        <button 
          onClick={() => { setIsWhatsAppOpen(!isWhatsAppOpen); setIsChatOpen(false); }}
          className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-105 transition-all duration-300 relative group cursor-pointer"
          aria-label="WhatsApp Support"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>

        {/* Live Chat Icon */}
        <button 
          onClick={() => { setIsChatOpen(!isChatOpen); setIsWhatsAppOpen(false); }}
          className="h-12 w-12 rounded-full bg-chocolate-dark border border-primary-gold/45 text-primary-gold flex items-center justify-center shadow-xl hover:bg-chocolate-medium hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label="Live Chat"
        >
          {isChatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </button>
      </div>

    </div>
  );
}
