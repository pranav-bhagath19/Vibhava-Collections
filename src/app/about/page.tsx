'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/vibhava_hero_saree.png" 
            alt="Heritage Loom" 
            fill 
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/0 via-cream/50 to-cream" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="section-subheading">Est. 1995</span>
          <h1 className="text-5xl md:text-8xl font-bold text-luxury mb-8">A Legacy in <br/><span className="italic">Every Thread</span></h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto italic">
            "Vibhava is not just a brand; it's a celebration of the hands that weave magic into fabric."
          </p>
        </div>
      </section>

      {/* Story Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-40 space-y-48">
        
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="relative aspect-[3/4] overflow-hidden shadow-luxury rounded-xl">
              <Image 
                src="/assets/images/designer_saree_category.png" 
                alt="Traditional Weaving" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 -z-10 rounded-full blur-3xl" />
          </div>
          <div className="space-y-10">
            <header>
              <span className="section-subheading">Our Roots</span>
              <h2 className="text-4xl md:text-6xl font-bold text-luxury leading-tight mt-6">Born from the heart of <span className="italic text-primary">Indian Handlooms</span></h2>
            </header>
            <div className="space-y-8 text-xl text-gray-600 font-light leading-relaxed italic">
              <p className="border-l-4 border-secondary/30 pl-8">
                "Started in a small workshop in Kanchipuram, Vibhava Collections began with a simple mission: to preserve the dying art of traditional hand-weaving while making it accessible to the modern woman."
              </p>
              <p className="not-italic text-base text-gray-500 font-normal leading-loose">
                We travel to the remotest corners of India to partner with master weavers, ensuring that every piece in our collection tells a unique story of heritage, skill, and passion.
              </p>
            </div>
            <div className="pt-8">
               <Link href="#process-section" className="btn-outline px-14 py-6 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg inline-flex">Our Master Process</Link>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="process-section" className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center pt-20">
          <div className="order-2 md:order-1 space-y-10">
            <span className="section-subheading">Quality First</span>
            <h2 className="section-heading">Uncompromising <br/><span className="italic">Excellence</span></h2>
            <p className="text-gray-500 font-light leading-loose text-lg">
              Each saree undergoes a rigorous 12-point quality check. From the purity of the silk to the intricacy of the zari work, we ensure that what reaches you is nothing short of a masterpiece.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8">
              <div className="space-y-2">
                <h4 className="text-5xl font-bold text-luxury text-primary italic">100%</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Pure Handloom</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-5xl font-bold text-luxury text-primary italic">500+</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Master Weavers</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="relative aspect-[3/4] shadow-luxury rounded-xl overflow-hidden">
              <Image src="/assets/images/silk_saree_category.png" alt="Quality Check" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 -z-10 rounded-xl" />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
