'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MiniCart = () => {
  const { cart, isMiniCartOpen, setMiniCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useAppContext();

  return (
    <AnimatePresence>
      {isMiniCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMiniCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-luxury flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-xl font-bold text-luxury">Your Bag ({cartCount})</h2>
              </div>
              <button onClick={() => setMiniCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-start pb-8 border-b border-gray-50 last:border-0">
                      <div className="relative w-24 h-32 bg-gray-50 shrink-0 rounded-lg overflow-hidden shadow-sm">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800 text-sm leading-tight pr-4">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-primary transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] text-secondary uppercase tracking-widest mt-1 font-bold">{item.fabric}</p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-gray-100 rounded-lg">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-gray-50"><Minus size={12} /></button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-gray-50"><Plus size={12} /></button>
                          </div>
                          <p className="font-bold text-primary">₹{(item.discountPrice || item.price) * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-bold text-luxury mb-2">Your bag is empty</h3>
                  <p className="text-sm text-gray-500 mb-8 font-light">Looks like you haven't added anything to your bag yet.</p>
                  <button 
                    onClick={() => setMiniCartOpen(false)}
                    className="btn-primary"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 space-y-6 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                {/* Shipping Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] font-bold">
                    <span className={cartTotal >= 5000 ? 'text-green-600' : 'text-gray-400'}>
                      {cartTotal >= 5000 ? '✓ Free Shipping unlocked' : `Add ₹${5000 - cartTotal} for free shipping`}
                    </span>
                    <span className="text-secondary italic">₹5000 Goal</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((cartTotal / 5000) * 100, 100)}%` }}
                      className={`h-full transition-all duration-1000 ${cartTotal >= 5000 ? 'bg-green-500' : 'bg-primary'}`}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Subtotal</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary block">₹{cartTotal}</span>
                    {cart.some(i => i.discountPrice) && (
                      <span className="text-[9px] text-green-600 font-bold uppercase tracking-widest">
                        Total Savings: ₹{cart.reduce((s, i) => s + (i.discountPrice ? (i.price - i.discountPrice) * i.quantity : 0), 0)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 pt-2">
                  <Link 
                    href="/checkout" 
                    onClick={() => setMiniCartOpen(false)}
                    className="btn-primary py-5 group shadow-luxury"
                  >
                    Checkout Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/cart" 
                    onClick={() => setMiniCartOpen(false)}
                    className="btn-outline bg-gray-50 border-none py-5 hover:bg-gray-100"
                  >
                    View Shopping Bag
                  </Link>
                </div>
                <p className="text-[9px] text-gray-400 italic text-center opacity-60">Handcrafted packaging included in every order</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
