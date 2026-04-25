'use client';

import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'search';
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, title, description, buttonText = "Start Shopping", buttonLink = "/shop" }) => {
  const Icon = type === 'cart' ? ShoppingBag : type === 'wishlist' ? Heart : Search;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-24 px-6 glass-card border-none bg-cream/50"
    >
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-premium">
        <Icon size={40} className="text-gray-200" />
      </div>
      <h2 className="text-3xl font-bold text-luxury mb-4 italic">{title}</h2>
      <p className="text-gray-500 max-w-md mb-10 font-light leading-relaxed">{description}</p>
      <Link href={buttonLink} className="btn-primary px-12 py-5 group">
        {buttonText}
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default EmptyState;
