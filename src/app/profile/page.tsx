'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, LogOut, ChevronRight, Loader2, MapPin, Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { db } from '@/lib/firebase';
import { Order } from '@/types';
import TrackingTimeline from '@/components/orders/TrackingTimeline';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { Address } from '@/types';

export default function ProfilePage() {
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const { showToast } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

  const deleteAddress = async (addressId: string) => {
    if (!user) return;
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const userRef = doc(db, 'users', user.id);
      const updatedAddresses = (user.savedAddresses || []).filter((a: Address) => a.id !== addressId);
      
      await setDoc(userRef, {
        savedAddresses: updatedAddresses
      }, { merge: true });
      
      showToast('Address removed', 'success');
    } catch (error) {
      showToast('Failed to remove address', 'error');
    }
  };

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      console.log(`🔍 Fetching orders for: ${user.email} (ID: ${user.id})`);
      
      // We use email as the primary key for "Grouping by Gmail"
      // Removed orderBy from query to avoid immediate index requirement
      const q = query(
        collection(db, 'orders'),
        where('email', '==', user.email)
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
        
        // Sort in-memory by createdAt (descending)
        ordersData.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setOrders(ordersData);
        setIsLoadingOrders(false);
      }, (error) => {
        console.error('❌ Order listener error:', error);
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
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 ${activeTab === 'orders' ? 'text-primary font-bold bg-gray-50' : 'text-gray-500'}`}
              >
                <div className="flex items-center gap-3">
                  <Package size={18} />
                  <span className="text-xs uppercase tracking-widest">Order History</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'orders' ? 'opacity-100' : 'opacity-0'} />
              </button>
              
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 ${activeTab === 'addresses' ? 'text-primary font-bold bg-gray-50' : 'text-gray-500'}`}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span className="text-xs uppercase tracking-widest">Saved Addresses</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'addresses' ? 'opacity-100' : 'opacity-0'} />
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
            {activeTab === 'orders' ? (
              <section className="bg-white p-10 rounded-xl shadow-luxury border border-gray-50">
                <h3 className="text-2xl font-bold text-luxury mb-10 italic">Recent Orders</h3>
              
              {isLoadingOrders ? (
                <div className="py-20 flex justify-center">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <Link 
                      href={`/orders/${order.orderId}`}
                      key={order.orderId} 
                      className="block border border-gray-100 rounded-xl p-6 group hover:border-primary/30 transition-all hover:shadow-md bg-white"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-6 items-center w-full md:w-auto">
                          <div className="w-16 h-20 bg-gray-50 rounded-lg shrink-0 overflow-hidden shadow-sm">
                            <img src={order.items[0]?.image || "/assets/images/vibhava_hero_saree.png"} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order #{order.orderId}</p>
                            <h4 className="font-bold text-gray-800 italic">{order.items[0]?.name || 'Heritage Piece'} {order.items.length > 1 ? `+ ${order.items.length - 1} more` : ''}</h4>
                            <p className="text-xs text-gray-500 font-light mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between w-full md:w-auto gap-8">
                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                            <p className="font-bold text-primary">₹{order.total}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                              order.status === 'cancelled' ? 'bg-red-50 text-red-500' :
                              'bg-primary/10 text-primary'
                            }`}>
                              {order.status.replace(/_/g, ' ')}
                            </span>
                            <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Mini Timeline Summary */}
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <div className="mt-6 pt-6 border-t border-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Current Progress</p>
                            <p className="text-[9px] font-bold text-primary italic">Tracking details available in view details</p>
                          </div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-1000" 
                              style={{ width: `${(['placed', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'].indexOf(order.status) / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-cream/30 rounded-xl border border-dashed border-gray-200">
                  <Package className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-400 italic">No orders found. Start your journey with us.</p>
                  <button onClick={() => router.push('/shop')} className="btn-primary mt-8 py-4 px-10">Explore Collection</button>
                </div>
              )}
            </section>
          ) : (
            <section className="bg-white p-10 rounded-xl shadow-luxury border border-gray-50">
              <h3 className="text-2xl font-bold text-luxury mb-10 italic">Saved Addresses</h3>
              
              {user.savedAddresses && user.savedAddresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {user.savedAddresses.map((addr) => (
                    <div key={addr.id} className="p-8 border border-gray-50 bg-cream/10 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full translate-x-12 -translate-y-12" />
                      
                      <button 
                        onClick={() => deleteAddress(addr.id)}
                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPin size={14} className="text-primary" />
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Shipping Address</h4>
                      </div>
                      
                      <p className="font-bold text-gray-800 mb-2 italic">{addr.firstName} {addr.lastName}</p>
                      <p className="text-gray-500 text-xs font-light leading-relaxed">
                        {addr.address}<br />
                        {addr.city}, {addr.pin}<br />
                        Phone: {addr.phone}
                      </p>
                      {addr.isDefault && (
                        <span className="mt-6 inline-block text-[8px] uppercase tracking-widest font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">Default Address</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-cream/30 rounded-xl border border-dashed border-gray-200">
                  <MapPin className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-400 italic">No saved addresses found. You can save an address during checkout.</p>
                  <button onClick={() => router.push('/shop')} className="btn-primary mt-8 py-4 px-10">Start Shopping</button>
                </div>
              )}
            </section>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
