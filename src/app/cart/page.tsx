'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/ui/EmptyState';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useAppContext();

  return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <header className="text-center mb-16">
          <span className="section-subheading">Review Items</span>
          <h1 className="section-heading italic">Shopping Bag</h1>
        </header>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white shadow-sm border border-gray-50 rounded-xl group hover:border-primary/20 transition-all">
                  <div className="relative w-full sm:w-32 aspect-[3/4] bg-gray-50 shrink-0 overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-luxury mb-1">{item.name}</h3>
                        <p className="text-xs text-secondary uppercase tracking-widest font-bold mb-4">{item.fabric} • {item.color}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-primary transition-colors p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-100 rounded-sm bg-gray-50/50">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:bg-white transition-colors"><Minus size={14} /></button>
                        <span className="w-12 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:bg-white transition-colors"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total</p>
                        <p className="text-xl font-bold text-primary">₹{(item.discountPrice || item.price) * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 md:p-10 shadow-premium sticky top-40 rounded-xl border border-gray-50">
                <h2 className="text-xl font-bold text-luxury mb-8 pb-4 border-b border-gray-100">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600 font-light text-sm">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-bold text-gray-800">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-light text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-10 pt-6 border-t border-gray-100">
                  <span className="text-lg font-bold text-luxury">Grand Total</span>
                  <span className="text-2xl font-bold text-primary">₹{cartTotal}</span>
                </div>

                <Link 
                  href="/checkout"
                  className="btn-primary w-full"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>

                <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-secondary" />
                    Secure Checkout
                  </div>
                  <div className="flex items-center justify-center gap-4 opacity-30 grayscale scale-75">
                    <span className="text-[10px] font-bold">VISA</span>
                    <span className="text-[10px] font-bold">MASTERCARD</span>
                    <span className="text-[10px] font-bold">UPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            type="cart"
            title="Your bag is waiting"
            description="Heritage isn't just about the past—it's about what you carry with you. Your shopping bag is currently empty. Explore our handpicked collections to find your masterpiece."
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
