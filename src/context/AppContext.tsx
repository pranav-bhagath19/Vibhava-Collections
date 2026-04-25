'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/mockData';
import { db } from '@/lib/firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

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
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, delta: number) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isSizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  products: Product[];
  isLoadingProducts: boolean;
  clearCart: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Real-time Products Sync
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'), 
      (snapshot) => {
        if (snapshot.empty) {
          // Fallback to mock data if DB is empty (safe production fallback)
          import('@/data/mockData').then(({ products: mockProducts }) => {
            setProducts(mockProducts);
            setIsLoadingProducts(false);
          });
          return;
        }
        const productList = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as Product[];
        setProducts(productList);
        setIsLoadingProducts(false);
      },
      (error) => {
        console.error("Firestore sync error:", error);
        // CRITICAL FALLBACK: If Firebase is suspended or blocked, 
        // load mock data so the UI doesn't break for the user.
        import('@/data/mockData').then(({ products: mockProducts }) => {
          setProducts(mockProducts);
          setIsLoadingProducts(false);
        });
      }
    );

    return () => unsubscribe();
  }, []);

  // Real-time Cart & Wishlist Sync for Authenticated User
  useEffect(() => {
    if (!user) {
      // Fallback to local storage for guests
      const savedCart = localStorage.getItem('vibhava_cart');
      const savedWishlist = localStorage.getItem('vibhava_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      return;
    }

    // Sync with Firestore
    const unsubCart = onSnapshot(doc(db, 'carts', user.id), (doc) => {
      if (doc.exists()) {
        setCart(doc.data().items || []);
      } else {
        setCart([]);
      }
    });

    const unsubWishlist = onSnapshot(doc(db, 'wishlists', user.id), (doc) => {
      if (doc.exists()) {
        setWishlist(doc.data().productIds || []);
      } else {
        setWishlist([]);
      }
    });

    return () => {
      unsubCart();
      unsubWishlist();
    };
  }, [user]);

  // Guest Local Storage Persistence
  useEffect(() => {
    if (!user) {
      localStorage.setItem('vibhava_cart', JSON.stringify(cart));
      localStorage.setItem('vibhava_wishlist', JSON.stringify(wishlist));
    }
  }, [cart, wishlist, user]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = async (product: Product) => {
    const newCart = [...cart];
    const existing = newCart.find((item) => item.id === product.id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }

    if (user) {
      await setDoc(doc(db, 'carts', user.id), { items: newCart });
    } else {
      setCart(newCart);
    }
    
    showToast(`${product.name} added to bag`);
    setMiniCartOpen(true);
  };

  const removeFromCart = async (productId: string) => {
    const newCart = cart.filter((item) => item.id !== productId);
    
    if (user) {
      await setDoc(doc(db, 'carts', user.id), { items: newCart });
    } else {
      setCart(newCart);
    }
    
    showToast(`Item removed from bag`, 'info');
  };

  const updateQuantity = async (productId: string, delta: number) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    if (user) {
      await setDoc(doc(db, 'carts', user.id), { items: newCart });
    } else {
      setCart(newCart);
    }
  };

  const toggleWishlist = async (productId: string) => {
    const exists = wishlist.includes(productId);
    let newWishlist;

    if (exists) {
      newWishlist = wishlist.filter((id) => id !== productId);
      showToast('Removed from wishlist', 'info');
    } else {
      newWishlist = [...wishlist, productId];
      showToast('Added to wishlist');
    }

    if (user) {
      await setDoc(doc(db, 'wishlists', user.id), { productIds: newWishlist });
    } else {
      setWishlist(newWishlist);
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const clearCart = async () => {
    if (user) {
      await setDoc(doc(db, 'carts', user.id), { items: [] });
    } else {
      setCart([]);
    }
  };

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
      cartCount,
      products,
      isLoadingProducts,
      clearCart
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
