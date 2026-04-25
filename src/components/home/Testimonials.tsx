'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Bride",
    content: "The Kanchipuram silk saree I bought for my wedding was beyond beautiful. The quality of the zari and the richness of the silk are unmatched.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Collector",
    content: "Vibhava has become my go-to for authentic handlooms. Their commitment to supporting artisans is what keeps me coming back.",
    rating: 5
  },
  {
    name: "Meera Reddy",
    role: "Fashion Designer",
    content: "The dress materials are so versatile and high-quality. I love the unique motifs and the traditional-meets-modern aesthetic.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <header className="text-center mb-20">
        <span className="section-subheading">Voices of Heritage</span>
        <h2 className="section-heading italic">Trusted by Connoisseurs</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 relative group hover:bg-primary hover:text-white transition-all duration-500"
          >
            <Quote className="absolute top-6 right-6 text-primary/5 group-hover:text-white/10 transition-colors" size={64} />
            
            <div className="flex mb-6 text-secondary">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>

            <p className="text-lg font-light leading-relaxed mb-8 italic group-hover:text-gray-200 transition-colors">
              "{t.content}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-[1px] bg-secondary" />
              <div>
                <h4 className="font-bold text-luxury group-hover:text-white transition-colors">{t.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-secondary transition-colors font-bold">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
