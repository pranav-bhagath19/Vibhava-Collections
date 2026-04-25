'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import SearchBar from '@/components/layout/SearchBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, wishlist, setMiniCartOpen, setAuthModalOpen } = useAppContext();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-2xl shadow-luxury py-4' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <h1 className={`text-2xl md:text-3xl font-bold text-luxury transition-all duration-500 group-hover:scale-105 ${
            isScrolled ? 'text-primary scale-90' : 'text-white scale-100'
          }`}>
            VIBHAVA
          </h1>
          <span className={`text-[9px] tracking-[0.4em] uppercase font-bold -mt-1 group-hover:tracking-[0.5em] transition-all duration-500 ${
            isScrolled ? 'text-secondary' : 'text-secondary'
          }`}>
            Collections
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {[
            { name: 'Silk Sarees', href: '/shop?category=silk-sarees' },
            { name: 'Cotton', href: '/shop?category=cotton-sarees' },
            { name: 'Dress Materials', href: '/shop?category=dress-materials' },
            { name: 'Our Story', href: '/about' }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2 ${
                isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all group-hover:w-full ${
                isScrolled ? 'bg-primary' : 'bg-white'
              }`} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={`p-3 rounded-full transition-all hover:bg-black/5 ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => user ? window.location.href = '/profile' : setAuthModalOpen(true)}
            className={`p-3 rounded-full transition-all hover:bg-black/5 hidden sm:block ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            <User size={20} />
          </button>
          <Link href="/wishlist" className={`p-3 rounded-full transition-all hover:bg-black/5 relative ${isScrolled ? 'text-primary' : 'text-white'}`}>
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white" />
            )}
          </Link>
          <button 
            onClick={() => setMiniCartOpen(true)}
            className={`p-3 rounded-full transition-all hover:bg-black/5 relative ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-luxury text-white">VIBHAVA</h2>
                <span className="text-[8px] uppercase tracking-[0.4em] text-secondary font-bold -mt-1">Collections</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-white/5 rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-8 justify-center">
              {[
                { name: 'Silk Sarees', href: '/shop?category=silk-sarees' },
                { name: 'Cotton Sarees', href: '/shop?category=cotton-sarees' },
                { name: 'Dress Materials', href: '/shop?category=dress-materials' },
                { name: 'Our Story', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-bold text-white text-luxury hover:text-secondary transition-colors italic"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-12 border-t border-white/5 space-y-8">
              <div className="flex gap-6">
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-white flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                  <User size={18} className="text-secondary" />
                  Account
                </Link>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-white flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                  <Heart size={18} className="text-secondary" />
                  Wishlist
                </Link>
              </div>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
                Heritage Woven in Every Thread
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
