'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-luxury mb-12 text-center">Privacy Policy</h1>
        
        <div className="bg-white p-8 md:p-16 shadow-premium rounded-sm prose prose-primary max-w-none">
          <p className="text-gray-500 italic mb-8">Last Updated: October 2023</p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, and payment information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              We use the information we collect to process your orders, provide customer support, and send you updates about our collections (if you opt-in). We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">3. Data Security</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-luxury mb-4 italic">4. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed font-light">
              If you have any questions about this Privacy Policy, please contact us at privacy@vibhava.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
