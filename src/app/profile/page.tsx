'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const { showToast } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    router.push('/');
  };

  if (isLoading || !user) return null;

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8 rounded-sm shadow-sm text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <User size={32} />
              </div>
              <h2 className="text-xl font-bold text-luxury">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <nav className="bg-white rounded-sm shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-primary font-bold">
                <div className="flex items-center gap-3">
                  <Package size={18} />
                  <span className="text-sm uppercase tracking-widest">Orders</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button onClick={() => router.push('/wishlist')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Heart size={18} />
                  <span className="text-sm uppercase tracking-widest">Wishlist</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-500">
                <div className="flex items-center gap-3">
                  <LogOut size={18} />
                  <span className="text-sm uppercase tracking-widest">Logout</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white p-8 rounded-sm shadow-sm">
              <h3 className="text-xl font-bold text-luxury mb-8">Recent Orders</h3>
              <div className="space-y-6">
                {[1, 2].map(order => (
                  <div key={order} className="border border-gray-100 p-6 flex flex-col md:row justify-between items-center gap-6 group hover:border-primary/30 transition-colors">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-20 bg-gray-100 shrink-0">
                        <img src="/assets/images/vibhava_hero_saree.png" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Order #VB-1092{order}</p>
                        <h4 className="font-bold text-gray-800">Royal Maroon Kanchipuram Silk</h4>
                        <p className="text-sm text-gray-500">Delivered on 12th Oct 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-4 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Delivered</span>
                      <button className="text-primary font-bold text-xs uppercase tracking-widest border-b border-primary pb-1">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-sm shadow-sm">
              <h3 className="text-xl font-bold text-luxury mb-8">Shipping Address</h3>
              <div className="p-6 border border-gray-100 rounded-sm">
                <p className="font-bold text-gray-800 mb-2">{user.name}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  123 Heritage Lane, Silk Market<br />
                  Kanchipuram, Tamil Nadu 631501<br />
                  Phone: +91 98765 43210
                </p>
                <button className="mt-6 text-primary font-bold text-[10px] uppercase tracking-widest border-b border-primary pb-1">Edit Address</button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
