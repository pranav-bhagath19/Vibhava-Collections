'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-luxury mb-12 text-center">Terms & Conditions</h1>
        
        <div className="bg-white p-8 md:p-16 shadow-premium rounded-sm prose prose-primary max-w-none">
          <p className="text-gray-500 italic mb-8">Last Updated: October 2023</p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              Welcome to Vibhava Collections. By accessing our website, you agree to comply with and be bound by the following terms and conditions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">2. Product Information</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              We make every effort to display the colors and details of our products as accurately as possible. However, actual colors may vary depending on your monitor settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">3. Pricing and Payments</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              All prices are in Indian Rupees (INR). We reserve the right to change prices at any time without notice. Payments must be made through our approved payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">4. Shipping and Delivery</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              Delivery times are estimates and may vary based on your location. We are not responsible for delays caused by third-party courier services.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
