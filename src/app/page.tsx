import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import Testimonials from '@/components/home/Testimonials';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/mockData';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';


// Vibhava Collections - Luxury Heritage Experience
export default function Home() {
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Hero />
      
      {/* Category Section */}
      <CategorySection />

      {/* Featured Products */}
      <section className="section-padding pt-0">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl text-left">
            <span className="section-subheading text-left">The Masterpieces</span>
            <h2 className="section-heading italic">Handpicked Arrivals</h2>
            <p className="text-gray-500 font-light leading-relaxed mt-4">
              Our newest additions feature exclusive Kanchipuram silk and organic cotton sarees, woven for the modern connoisseur.
            </p>
          </div>
          <Link href="/shop" className="btn-outline px-12 py-5 group">
            Explore All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Storytelling Banner */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/vibhava_hero_saree.png" 
            alt="Handloom Heritage" 
            fill 
            className="object-cover opacity-30 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <span className="text-secondary uppercase tracking-[0.4em] text-xs font-bold">Our Philosophy</span>
            <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight">Woven with <br/><span className="italic text-secondary">Soul</span> & Tradition</h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-lg italic">
              "Every Vibhava piece is a testament to the artisan's journey, bringing centuries of Indian weaving techniques directly to your wardrobe."
            </p>
            <div className="flex gap-6">
              <Link href="/about" className="btn-primary bg-secondary text-primary hover:bg-white hover:text-primary border-none">Our Heritage</Link>
              <Link href="/shop" className="btn-outline border-white text-white hover:bg-white hover:text-primary">Shop Collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="section-padding">
        <header className="text-center mb-16">
          <span className="section-subheading">In the Spotlight</span>
          <h2 className="section-heading italic">Trending Now</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Brand Values */}
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
          <div className="text-center space-y-6">
            <h4 className="text-4xl md:text-5xl font-bold text-luxury text-secondary">100%</h4>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Authentic</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">Handloom Certified</p>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h4 className="text-4xl md:text-5xl font-bold text-luxury text-secondary">Global</h4>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Shipping</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">Premium Packaging</p>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h4 className="text-4xl md:text-5xl font-bold text-luxury text-secondary">Pure</h4>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Silk Mark</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">Quality Guaranteed</p>
            </div>
          </div>
          <div className="text-center space-y-6">
            <h4 className="text-4xl md:text-5xl font-bold text-luxury text-secondary">Hassle-Free</h4>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Returns</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">7-Day Exchange</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-cream">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-24 relative overflow-hidden border-none shadow-luxury">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-secondary rounded-b-full" />
          <span className="section-subheading">Join the circle</span>
          <h2 className="section-heading italic mb-8">Become a <span className="italic">Vibhava Insider</span></h2>
          <p className="text-gray-500 font-light mb-12 max-w-sm mx-auto leading-relaxed">
            Subscribe to receive exclusive access to our newest drops and heritage stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 p-5 bg-white border border-gray-100 outline-none focus:border-secondary transition-all rounded-[var(--radius-button)] text-sm"
            />
            <button className="btn-primary px-12 bg-primary text-white border-none shadow-lg">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
