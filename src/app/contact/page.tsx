'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Globe, Camera } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function ContactPage() {
  const { showToast } = useAppContext();
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      
      <div className="pt-32 md:pt-48 pb-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Contact Info */}
          <div className="space-y-16">
            <header className="space-y-6">
              <span className="section-subheading text-left">Get in Touch</span>
              <h1 className="text-5xl md:text-7xl font-bold text-luxury">Concierge <br/><span className="italic">Support</span></h1>
              <p className="text-gray-500 font-light leading-relaxed max-w-md">
                Have a question about our collections or need help with an order? Our heritage experts are here to assist you.
              </p>
            </header>

            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-luxury mb-1">Email Us</h3>
                  <p className="text-gray-600 font-light italic">concierge@vibhava.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-luxury mb-1">Call Us</h3>
                  <p className="text-gray-600 font-light italic">+91 98765 43210</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Mon - Sat, 10am - 7pm IST</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-luxury mb-1">Our Atelier</h3>
                  <p className="text-gray-600 font-light italic">123 Heritage Lane, Silk Market, Kanchipuram</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-10 md:p-16 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Thank you for reaching out. Our concierge will contact you shortly.', 'success');
              }}
              className="space-y-8 relative z-10"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-luxury">Send a Message</h2>
                <p className="text-xs text-gray-400 font-light">Fields marked * are required</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name *</label>
                  <input type="text" className="w-full bg-cream/50 border-b border-gray-100 p-3 outline-none focus:border-primary transition-all font-light" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address *</label>
                  <input type="email" className="w-full bg-cream/50 border-b border-gray-100 p-3 outline-none focus:border-primary transition-all font-light" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                <input type="text" className="w-full bg-cream/50 border-b border-gray-100 p-3 outline-none focus:border-primary transition-all font-light" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message *</label>
                <textarea className="w-full bg-cream/50 border-b border-gray-100 p-3 outline-none focus:border-primary transition-all font-light h-32 resize-none" required></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-5">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
