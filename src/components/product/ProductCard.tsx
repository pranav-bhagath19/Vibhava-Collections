'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, CheckCircle2 } from 'lucide-react';
import { Product } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-lg mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        
        {/* Badges - Ultra Premium */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.discountPrice && (
            <span className="bg-primary/90 backdrop-blur-md text-white text-[8px] px-4 py-2 uppercase font-bold tracking-[0.2em] rounded-full shadow-lg border border-white/20">
              Limited Edition
            </span>
          )}
          {product.trending && (
            <span className="bg-secondary/90 backdrop-blur-md text-white text-[8px] px-4 py-2 uppercase font-bold tracking-[0.2em] rounded-full shadow-lg border border-white/20">
              Trending
            </span>
          )}
        </div>

        {/* Quick Actions - Floating Glass */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2 z-20">
          <button 
            onClick={async (e) => { 
              e.preventDefault(); 
              setIsAdded(true);
              addToCart(product); 
              setTimeout(() => setIsAdded(false), 2000);
            }}
            className={`flex-1 backdrop-blur-xl py-4 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.96] ${
              isAdded ? 'bg-green-600 text-white' : 'bg-white/95 text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <CheckCircle2 size={14} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Quick Add
              </>
            )}
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`w-14 backdrop-blur-xl rounded-lg bg-white/95 transition-all shadow-xl flex items-center justify-center active:scale-[0.96] ${
              isWishlisted(product.id) ? 'text-primary' : 'text-gray-400 hover:text-primary'
            }`}
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="space-y-3 px-1 text-center">
        <Link href={`/product/${product.id}`} className="block group/link">
          <p className="text-[9px] text-secondary uppercase tracking-[0.3em] font-bold mb-2">{product.category}</p>
          <h3 className="text-base md:text-lg font-bold text-gray-800 line-clamp-1 group-hover/link:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-primary">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-gray-400 text-xs line-through font-light">₹{product.price}</span>
            )}
          </div>
          <div className="w-[1px] h-3 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <Star size={10} className="text-secondary fill-secondary" />
            <span className="text-[10px] font-bold text-gray-500">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
