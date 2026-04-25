'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship our collections worldwide. Shipping costs and delivery times vary by country. You can see the exact shipping cost at checkout after entering your address."
  },
  {
    question: "How do I care for my silk sarees?",
    answer: "Pure silk sarees should only be dry cleaned. Store them in a cool, dry place wrapped in a clean white muslin cloth. Avoid hanging them for long periods as the silk fibers might stretch."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused products in their original packaging with tags intact. Please note that custom-stitched products are not eligible for returns."
  },
  {
    question: "Are the colors on the website accurate?",
    answer: "We take great care to ensure that the colors on our website are as accurate as possible. However, due to different screen settings and the nature of natural dyes, slight variations may occur."
  },
  {
    question: "Do you provide blouse stitching services?",
    answer: "Yes, we offer custom blouse stitching for all our sarees and dress materials. You can select the 'Stitching Service' option on the product detail page."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
        <div className="text-center mb-16">
          <span className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Help Center</span>
          <h1 className="text-4xl md:text-5xl font-bold text-luxury mb-6">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-800 italic">{faq.question}</span>
                {openIdx === idx ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-500 font-light leading-relaxed border-t border-gray-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center p-12 bg-primary/5 rounded-xl">
          <h2 className="text-xl font-bold text-luxury mb-4 italic">Still have questions?</h2>
          <p className="text-gray-500 mb-8 font-light">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <div className="flex justify-center gap-4">
            <a href="/contact" className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Contact Us</a>
            <a href="#" className="px-8 py-3 border border-primary text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">Live Chat</a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
