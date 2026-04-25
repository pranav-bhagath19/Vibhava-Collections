'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/mockData';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const results = query 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 bg-white z-[101] shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
              <div className="flex justify-between items-center mb-12">
                <span className="section-subheading mb-0">Discover Heritage</span>
                <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="relative mb-16">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for sarees, materials, or collections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-2xl md:text-5xl font-bold bg-transparent border-b-2 border-gray-100 outline-none pb-6 focus:border-primary transition-all placeholder:text-gray-200"
                />
                <Search size={40} className="absolute right-0 bottom-8 text-gray-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {/* Popular Categories */}
                <div className="space-y-8">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary">Collections</h3>
                  <div className="flex flex-col gap-4">
                    {['Silk Sarees', 'Cotton Sarees', 'Designer Wear', 'New Arrivals'].map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => { setQuery(cat); }}
                        className="text-lg font-bold text-luxury hover:text-primary transition-colors text-left flex justify-between items-center group"
                      >
                        {cat}
                        <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Results */}
                <div className="md:col-span-2 space-y-8">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary">
                    {query ? `Results for "${query}"` : 'Quick Suggestions'}
                  </h3>
                  
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {results.map(product => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                          <div className="w-16 h-20 bg-gray-100 overflow-hidden shrink-0">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-luxury leading-tight">{product.name}</h4>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{product.category}</p>
                            <p className="text-sm font-bold text-primary mt-2">₹{product.discountPrice || product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">
                      {query ? 'No results found. Try a different term.' : 'Type something to see instant suggestions.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
