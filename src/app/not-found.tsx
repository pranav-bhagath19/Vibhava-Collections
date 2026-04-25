'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-[120px] md:text-[200px] font-bold text-primary/5 leading-none select-none">404</h1>
          <div className="relative -mt-20 md:-mt-32">
            <h2 className="text-4xl md:text-6xl font-bold text-luxury mb-6 italic">Lost in Tradition?</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto font-light leading-relaxed">
              The page you are looking for has been moved or doesn't exist. Let's get you back to our exquisite collections.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-3 bg-primary text-white py-4 px-10 font-bold uppercase tracking-[0.2em] text-xs hover:bg-accent transition-all shadow-xl"
            >
              <ArrowLeft size={16} />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
