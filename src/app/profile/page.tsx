'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

interface Order {
  id?: string;
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
  items: any[];
}

export default function ProfilePage() {
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const { showToast } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      console.log(`🔍 Fetching orders for: ${user.email} (ID: ${user.id})`);
      
      // We use email as the primary key for "Grouping by Gmail"
      const q = query(
        collection(db, 'orders'),
        where('email', '==', user.email),
        orderBy('createdAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(`📦 Orders found: ${snapshot.size}`);
        const ordersData = snapshot.docs.map(doc => {
          const data = doc.data() as Order;
          return {
            ...data,
            id: doc.id
          };
        });
        setOrders(ordersData);
        setIsLoadingOrders(false);
      }, (error) => {
        console.error('❌ Order listener error:', error);
        if (error.message.includes('index')) {
          console.warn('⚠️ MISSING INDEX: You need to create a Firestore index for "orders" (email: ASC, createdAt: DESC). Check the link in the error message above.');
        }
        setIsLoadingOrders(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully', 'info');
    router.push('/');
  };

  if (isAuthLoading || !user) return null;

  return (
    <main className="min-h-screen bg-cream pt-32 md:pt-40">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8 rounded-xl shadow-luxury text-center border border-gray-50">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <User size={32} />
              </div>
              <h2 className="text-xl font-bold text-luxury italic">{user.name}</h2>
              <p className="text-sm text-gray-500 font-light">{user.email}</p>
            </div>

            <nav className="bg-white rounded-xl shadow-luxury overflow-hidden border border-gray-50">
              <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 text-primary font-bold">
                <div className="flex items-center gap-3">
                  <Package size={18} />
                  <span className="text-xs uppercase tracking-widest">Order History</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button onClick={() => router.push('/wishlist')} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <Heart size={18} />
                  <span className="text-xs uppercase tracking-widest">My Wishlist</span>
                </div>
                <ChevronRight size={16} />
              </button>
              <button onClick={handleLogout} className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors text-red-500">
                <div className="flex items-center gap-3">
                  <LogOut size={18} />
                  <span className="text-xs uppercase tracking-widest">Sign Out</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white p-10 rounded-xl shadow-luxury border border-gray-50">
              <h3 className="text-2xl font-bold text-luxury mb-10 italic">Recent Orders</h3>
              
              {isLoadingOrders ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.orderId} className="border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/30 transition-all hover:shadow-md">
                      <div className="flex gap-6 items-center">
                        <div className="w-16 h-20 bg-gray-50 rounded-lg shrink-0 overflow-hidden shadow-sm">
                          <img src={order.items[0]?.image || "/assets/images/vibhava_hero_saree.png"} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order #{order.orderId}</p>
                          <h4 className="font-bold text-gray-800 italic">{order.items[0]?.name || 'Heritage Piece'} {order.items.length > 1 ? `+ ${order.items.length - 1} more` : ''}</h4>
                          <p className="text-xs text-gray-500 font-light mt-1">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                          <p className="font-bold text-primary">₹{order.total}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                        }`}>
                          {order.status}
                        </span>
                        <button className="text-primary font-bold text-[10px] uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-1 transition-all">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-cream/30 rounded-xl border border-dashed border-gray-200">
                  <Package className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-400 italic">No orders found. Start your journey with us.</p>
                  <button onClick={() => router.push('/shop')} className="btn-primary mt-8 py-4">Explore Collection</button>
                </div>
              )}
            </section>

            <section className="bg-white p-10 rounded-xl shadow-luxury border border-gray-50">
              <h3 className="text-2xl font-bold text-luxury mb-10 italic">Account Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-gray-50 bg-cream/10 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-12 -translate-y-12" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Default Shipping</h4>
                  <p className="font-bold text-gray-800 mb-2 italic">{user.name}</p>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">
                    123 Heritage Lane, Silk Market<br />
                    Kanchipuram, Tamil Nadu 631501<br />
                    Phone: +91 98765 43210
                  </p>
                  <button className="mt-8 text-primary font-bold text-[10px] uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-1 transition-all">Edit Address</button>
                </div>
                
                <div className="p-8 border border-gray-50 bg-cream/10 rounded-xl relative overflow-hidden">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Security</h4>
                   <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">Manage your password and authentication preferences to keep your account secure.</p>
                   <button className="text-primary font-bold text-[10px] uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-1 transition-all">Change Password</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
