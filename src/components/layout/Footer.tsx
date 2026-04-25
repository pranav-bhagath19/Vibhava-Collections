'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Globe, X, Mail, Phone, MapPin } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const Footer = () => {
  const { setSizeGuideOpen } = useAppContext();
  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Pattern Deco */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl font-bold text-luxury tracking-tight">VIBHAVA</h2>
              <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold -mt-1 block">Collections</span>
            </Link>
            <p className="text-gray-300 font-light leading-relaxed max-w-sm italic">
              "Weaving stories of Indian heritage since 1995. Our collections are a tribute to the timeless artistry of master weavers."
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group">
                <Camera size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group">
                <Globe size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group">
                <X size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary mb-10">Artistry</h3>
            <ul className="space-y-5">
              <li><Link href="/shop?category=silk-sarees" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Silk Sarees</Link></li>
              <li><Link href="/shop?category=cotton-sarees" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Cotton Sarees</Link></li>
              <li><Link href="/shop?category=dress-materials" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Dress Materials</Link></li>
              <li><Link href="/shop?category=designer-sarees" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Designer Wear</Link></li>
              <li><Link href="/shop" className="text-sm text-white/60 hover:text-white transition-all hover:translate-x-1 inline-block italic font-bold">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary mb-10">Care</h3>
            <ul className="space-y-5">
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Shipping Policy</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">Terms of Service</Link></li>
              <li><button onClick={() => setSizeGuideOpen(true)} className="text-sm text-white/60 hover:text-white transition-all hover:translate-x-1 inline-block italic font-bold cursor-pointer">Sizing Portfolio</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin size={20} className="text-secondary shrink-0" />
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  123 Heritage Lane, Silk Market, <br />
                  Kanchipuram, Tamil Nadu 631501
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-secondary shrink-0" />
                <p className="text-sm text-gray-300 font-light">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-secondary shrink-0" />
                <p className="text-sm text-gray-300 font-light">concierge@vibhava.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold text-center md:text-left">
            © 2024 Vibhava Collections. Handcrafted for the modern connoisseur.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Secured by</span>
              <div className="flex gap-4 grayscale opacity-30">
                <span className="text-[10px] font-bold">VISA</span>
                <span className="text-[10px] font-bold">MASTERCARD</span>
                <span className="text-[10px] font-bold">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
