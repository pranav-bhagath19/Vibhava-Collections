'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/mockData';

interface CartItem extends Product {
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  toasts: Toast[];
  isMiniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isSizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vibhava_cart');
    const savedWishlist = localStorage.getItem('vibhava_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('vibhava_cart', JSON.stringify(cart));
    localStorage.setItem('vibhava_wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to bag`);
    setMiniCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast(`Item removed from bag`, 'info');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider value={{ 
      cart, 
      wishlist, 
      toasts,
      isMiniCartOpen,
      setMiniCartOpen,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleWishlist, 
      isWishlisted,
      showToast,
      isSizeGuideOpen,
      setSizeGuideOpen,
      isAuthModalOpen,
      setAuthModalOpen,
      cartTotal,
      cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
