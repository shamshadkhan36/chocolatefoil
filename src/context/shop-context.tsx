'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, ProductSize, Order } from '../types';

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  couponCode: string;
  discount: number;
  theme: 'light' | 'dark';
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  recentlyViewed: Product[];
  addToCart: (product: Product, quantity: number, color: ProductColor, size: ProductSize) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  toggleTheme: () => void;
  createOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  setSearch: (query: string, category: string) => void;
  addToRecentlyViewed: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cf_cart');
      const savedWishlist = localStorage.getItem('cf_wishlist');
      const savedCompare = localStorage.getItem('cf_compare');
      const savedOrders = localStorage.getItem('cf_orders');
      const savedTheme = localStorage.getItem('cf_theme') as 'light' | 'dark' | null;
      const savedRecently = localStorage.getItem('cf_recently');

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Default to dark mode if system prefers dark
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
      }
      if (savedRecently) setRecentlyViewed(JSON.parse(savedRecently));
      setIsInitialized(true);
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
      setIsInitialized(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_cart', JSON.stringify(cart));
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_wishlist', JSON.stringify(wishlist));
  }, [wishlist, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_compare', JSON.stringify(compareList));
  }, [compareList, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_orders', JSON.stringify(orders));
  }, [orders, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_recently', JSON.stringify(recentlyViewed));
  }, [recentlyViewed, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cf_theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme, isInitialized]);

  // Actions
  const addToCart = (product: Product, quantity: number, color: ProductColor, size: ProductSize) => {
    const id = `${product.id}-${color.name.replace(/\s+/g, '')}-${size.name.replace(/\s+/g, '')}`;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { id, product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscount(0);
  };

  const applyCoupon = (code: string): boolean => {
    const sanitized = code.toUpperCase().trim();
    if (sanitized === 'LUXURY10') {
      setCouponCode('LUXURY10');
      setDiscount(10); // 10% discount
      return true;
    }
    if (sanitized === 'GOLDEN50') {
      setCouponCode('GOLDEN50');
      setDiscount(50); // 50% discount
      return true;
    }
    return false;
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleCompare = (product: Product) => {
    setCompareList((prevCompare) => {
      const exists = prevCompare.some((item) => item.id === product.id);
      if (exists) {
        return prevCompare.filter((item) => item.id !== product.id);
      }
      if (prevCompare.length >= 3) {
        // limit comparison to 3 items
        return [...prevCompare.slice(1), product];
      }
      return [...prevCompare, product];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some((item) => item.id === productId);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prevCompare) => prevCompare.filter((item) => item.id !== productId));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const setSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
  };

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 5); // Keep last 5 viewed items
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        couponCode,
        discount,
        theme,
        orders,
        searchQuery,
        selectedCategory,
        recentlyViewed,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        toggleTheme,
        createOrder,
        setSearch,
        addToRecentlyViewed,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
