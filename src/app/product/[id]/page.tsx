'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Share2, ShieldCheck, Truck, RefreshCw, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

import ReviewSection from '@/components/product/ReviewSection';
import ProductCard from '@/components/product/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const { products, isLoadingProducts, addToCart, toggleWishlist, isWishlisted, setSizeGuideOpen } = useAppContext();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Unstitched');
  const [isAdding, setIsAdding] = useState(false);

  if (isLoadingProducts) {
    return (
      <main className="min-h-screen bg-cream pt-32 md:pt-40 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  if (!product) return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-luxury mb-4">Piece Not Found</h1>
        <p className="text-gray-500 italic">The exquisite piece you are looking for is no longer available.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-xl shadow-luxury">
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name} 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all shadow-sm ${selectedImage === idx ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent hover:border-gray-200'}`}
                >
                  <Image src={img} alt={product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="space-y-8">
              <header className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex text-secondary">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={14} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} className={i <= Math.floor(product.rating) ? "" : "text-gray-200"} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{product.rating} • {product.reviews} Reviews</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-luxury leading-tight">{product.name}</h1>
                <p className="text-sm text-secondary uppercase tracking-[0.3em] font-bold">{product.category}</p>
              </header>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">₹{product.discountPrice || product.price}</span>
                {product.discountPrice && (
                  <span className="text-xl text-gray-400 line-through font-light">₹{product.price}</span>
                )}
                {product.discountPrice && (
                  <span className="bg-primary/5 text-primary text-[10px] px-2 py-1 uppercase font-bold tracking-widest">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% Off
                  </span>
                )}
              </div>

              <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-50 shadow-sm space-y-8">
                <p className="text-gray-600 font-light leading-relaxed italic border-l-4 border-secondary/30 pl-8 text-lg">
                  "{product.description}"
                </p>
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 uppercase text-[9px] tracking-[0.2em] font-bold">Fabric Essence</span>
                    <span className="font-bold text-luxury">{product.fabric}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 uppercase text-[9px] tracking-[0.2em] font-bold">Hue & Shade</span>
                    <span className="font-bold text-luxury">{product.color}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-secondary hover:text-primary transition-all group"
                >
                  <RefreshCw size={14} className="rotate-45 group-hover:rotate-180 transition-transform duration-700" />
                  View Sizing Portfolio
                </button>
              </div>

              {/* Selection Options */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Blouse Stitching</label>
                    <span className="text-[10px] text-primary font-bold">Unstitched Included</span>
                  </div>
                  <div className="flex gap-3">
                    {['Unstitched', 'Standard Stitching (+₹999)', 'Custom Tailoring (+₹1499)'].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          selectedOption === opt ? 'border-primary bg-primary text-white' : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  disabled={isAdding}
                  onClick={async () => {
                    setIsAdding(true);
                    await new Promise(r => setTimeout(r, 800));
                    addToCart(product);
                    setIsAdding(false);
                  }}
                  className="flex-[2] btn-primary relative overflow-hidden disabled:opacity-70 rounded-xl py-6 shadow-luxury"
                >
                  {isAdding ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Purchase Piece
                    </>
                  )}
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 btn-outline py-6 rounded-xl transition-all ${
                    isWishlisted(product.id) ? 'border-primary text-primary bg-primary/5 shadow-inner' : 'hover:shadow-lg'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                  {isWishlisted(product.id) ? 'Saved' : 'Save for Later'}
                </button>
              </div>

              {/* Trust Badges & Delivery - Refined */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-gray-100">
                <div className="flex items-center md:flex-col gap-5 md:gap-4 text-left md:text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-secondary shadow-premium shrink-0 border border-gray-50">
                    <Truck size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury block">Express Delivery</span>
                    <span className="text-[9px] text-gray-400 font-medium">By {new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
                <div className="flex items-center md:flex-col gap-5 md:gap-4 text-left md:text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-secondary shadow-premium shrink-0 border border-gray-50">
                    <RefreshCw size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury block">Bespoke Returns</span>
                    <span className="text-[9px] text-gray-400 font-medium">7-Day Premium Support</span>
                  </div>
                </div>
                <div className="flex items-center md:flex-col gap-5 md:gap-4 text-left md:text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-secondary shadow-premium shrink-0 border border-gray-50">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury block">Authentic Silk</span>
                    <span className="text-[9px] text-gray-400 font-medium">Silk Mark Certified</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-primary transition-colors">
                <Share2 size={14} />
                Share this product
              </button>
            </div>

            {/* Mobile Sticky Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-[40] flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => addToCart(product)}
                className="flex-[2] btn-primary py-4"
              >
                Add to Bag
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="w-14 btn-outline py-4 flex items-center justify-center"
              >
                <Heart size={20} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        <ReviewSection />

        {/* Related Products Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-luxury mb-12 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.id !== id).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
