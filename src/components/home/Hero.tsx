'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center">
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="relative w-full h-full"
        >
          <Image
            src="/assets/images/vibhava_hero_saree.png"
            alt="Luxury Silk Saree Collection"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </motion.div>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/10 z-[5]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="pt-52 md:pt-40"
          >
            <span className="section-subheading text-left block text-secondary mb-4 tracking-[0.5em] drop-shadow-xl">Handcrafted Heritage</span>
            <h1 className="text-7xl md:text-[10rem] font-bold text-white text-luxury leading-[0.9] drop-shadow-2xl">
              Tradition <br />
              <span className="italic text-secondary font-light">Redefined</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl text-gray-200 font-light max-w-xl leading-relaxed italic"
          >
            "Discover a curated selection of Kanchipuram silks and designer drapes, woven for the modern connoisseur."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 mt-16"
          >
            <Link 
              href="/shop" 
              className="btn-primary py-6 px-14 bg-secondary text-primary hover:bg-white hover:text-primary border-none shadow-2xl scale-105 hover:scale-110 active:scale-95 rounded-[var(--radius-button)]"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="btn-outline py-6 px-14 border-white text-white hover:bg-white hover:text-primary backdrop-blur-md active:scale-95 rounded-[var(--radius-button)]"
            >
              Our Heritage
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
