'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data/mockData';

const CategorySection = () => {
  return (
    <section className="section-padding bg-white">
      <header className="text-center mb-20">
        <span className="section-subheading">Curated Selections</span>
        <h2 className="section-heading italic">Shop by Category</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-luxury"
          >
            <Link href={`/shop?category=${category.slug}`} className="block w-full h-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Elegant Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold mb-3 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  Exclusive
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white text-luxury mb-4 italic translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  {category.name}
                </h3>
                <div className="h-[1px] w-16 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
                <p className="text-white/70 text-[9px] mt-8 font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                  View Masterpieces
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
