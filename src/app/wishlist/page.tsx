'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppContext } from '@/context/AppContext';
import { products } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import EmptyState from '@/components/ui/EmptyState';

export default function WishlistPage() {
  const { wishlist } = useAppContext();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <header className="text-center mb-16">
          <span className="section-subheading">Saved For Later</span>
          <h1 className="section-heading italic">My Wishlist</h1>
        </header>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="wishlist"
            title="Curate Your Legacy"
            description="Your wishlist is a canvas for your future style. Browse our collections and heart the pieces that speak to you—they'll be waiting here when you're ready."
            buttonText="Start Exploring"
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
