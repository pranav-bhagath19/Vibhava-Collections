'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Info } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const SizeGuide = () => {
  const { isSizeGuideOpen, setSizeGuideOpen } = useAppContext();

  const categories = [
    {
      name: 'Sarees',
      details: [
        { label: 'Length', value: '5.5 Meters (Approx)' },
        { label: 'Width', value: '44 Inches (Approx)' },
        { label: 'Blouse Piece', value: '0.8 Meters (Included)' }
      ]
    },
    {
      name: 'Dress Materials',
      details: [
        { label: 'Top', value: '2.5 Meters' },
        { label: 'Bottom', value: '2.0 Meters' },
        { label: 'Dupatta', value: '2.4 Meters' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:h-auto bg-white z-[201] shadow-luxury overflow-hidden rounded-xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-cream">
              <div className="flex items-center gap-3">
                <Ruler size={20} className="text-primary" />
                <h2 className="text-xl font-bold text-luxury uppercase tracking-widest">Sizing & Dimensions</h2>
              </div>
              <button onClick={() => setSizeGuideOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-secondary border-b border-secondary/20 pb-2">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {cat.details.map((detail) => (
                      <div key={detail.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{detail.label}</span>
                        <span className="text-sm text-luxury font-bold">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-primary/5 p-6 rounded-xl flex gap-4">
                <Info size={20} className="text-primary shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  Note: Dimensions are approximate as our products are handcrafted by artisans. Minor variations add to the unique character of each piece.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 text-center">
              <button 
                onClick={() => setSizeGuideOpen(false)}
                className="btn-primary w-full"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
