'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/mockData';
import { SlidersHorizontal, ShieldCheck, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductSkeleton } from '@/components/ui/Skeleton';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (sortBy !== 'featured' ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryMap: { [key: string]: string } = {
        'silk-sarees': 'Silk Sarees',
        'cotton-sarees': 'Cotton Sarees',
        'designer-sarees': 'Designer Sarees',
        'dress-materials': 'Dress Materials'
      };
      result = result.filter(p => p.category === categoryMap[selectedCategory]);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Page Header */}
        <header className="text-center mb-16">
          <span className="section-subheading">Exquisite Collection</span>
          <h1 className="section-heading italic">Shop All Collections</h1>
        </header>

        {/* Mobile Filter Bar */}
        <div className="lg:hidden sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-y border-gray-100 flex divide-x divide-gray-100 -mx-4 mb-10">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex-1 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-800 relative"
          >
            <SlidersHorizontal size={14} />
            Filter
            {activeFiltersCount > 0 && (
              <span className="absolute top-3 right-8 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
          <div className="flex-1 py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-400">
            {filteredProducts.length} Pieces
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isFilterModalOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterModalOpen(false)}
                className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 bg-white z-[101] rounded-t-3xl p-8 pb-12 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold text-luxury italic">Filters & Sort</h2>
                  <button onClick={() => setIsFilterModalOpen(false)} className="p-2 bg-gray-50 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['all', 'silk-sarees', 'cotton-sarees', 'designer-sarees', 'dress-materials'].map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`py-3 px-4 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            selectedCategory === cat ? 'border-primary bg-primary text-white' : 'border-gray-100 text-gray-500'
                          }`}
                        >
                          {cat.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Sort By</h3>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'featured', label: 'Featured Selection' },
                        { id: 'price-low', label: 'Price: Low to High' },
                        { id: 'price-high', label: 'Price: High to Low' },
                        { id: 'rating', label: 'Highest Rated' }
                      ].map(sort => (
                        <button 
                          key={sort.id}
                          onClick={() => setSortBy(sort.id)}
                          className={`py-4 px-6 text-left text-xs font-bold uppercase tracking-widest rounded-sm border transition-all ${
                            sortBy === sort.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'
                          }`}
                        >
                          {sort.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="btn-primary w-full mt-12 py-5"
                >
                  Apply Filters
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3 text-primary">
                <SlidersHorizontal size={16} />
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury">Filters</h2>
              </div>
              {(selectedCategory !== 'all' || sortBy !== 'featured') && (
                <button 
                  onClick={() => { setSelectedCategory('all'); setSortBy('featured'); }}
                  className="text-[9px] uppercase tracking-widest text-primary font-bold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-8">
              <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Shop by Category</h3>
              <div className="flex flex-col gap-4">
                {['all', 'silk-sarees', 'cotton-sarees', 'designer-sarees', 'dress-materials'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs text-left capitalize transition-all py-2 px-4 rounded-lg ${
                      selectedCategory === cat ? 'bg-primary text-white font-bold shadow-lg' : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-8">
              <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Sort By</h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: 'featured', label: 'Featured Selection' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Highest Rated' }
                ].map(sort => (
                  <button 
                    key={sort.id}
                    onClick={() => setSortBy(sort.id)}
                    className={`text-xs text-left transition-all py-2 px-4 rounded-lg ${
                      sortBy === sort.id ? 'bg-primary text-white font-bold shadow-lg' : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Banner in Sidebar */}
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/5 space-y-6 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/10 rounded-full translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-700" />
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck size={20} className="text-secondary" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">100% Authentic</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light italic">
                "Every purchase is protected by our signature heritage guarantee and silk mark certification."
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 flex justify-between items-center">
              <p className="text-sm text-gray-400">Showing <span className="font-bold text-gray-800">{isLoading ? '...' : filteredProducts.length}</span> exquisite pieces</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12">
                {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 glass-card">
                <p className="text-gray-400 italic mb-6">No products found matching your selection.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSortBy('featured'); }}
                  className="btn-primary mx-auto"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
