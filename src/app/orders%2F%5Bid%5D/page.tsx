'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useAppContext } from '@/context/AppContext';
import { Order } from '@/types';
import TrackingTimeline from '@/components/orders/TrackingTimeline';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Printer, XCircle, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useAppContext();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, 'orders'),
      where('orderId', '==', id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const orderData = {
          ...snapshot.docs[0].data(),
          id: snapshot.docs[0].id
        } as Order;
        
        // Security: Ensure this order belongs to the current user
        if (user && orderData.email !== user.email) {
          router.push('/profile');
          return;
        }
        
        setOrder(orderData);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching order:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id, user, router]);

  const handleCancelOrder = async () => {
    if (!order || order.status !== 'placed') return;
    
    if (!confirm('Are you sure you want to cancel this order?')) return;

    setIsCancelling(true);
    try {
      const orderRef = doc(db, 'orders', order.id);
      const now = new Date().toISOString();
      
      await updateDoc(orderRef, {
        status: 'cancelled',
        trackingTimeline: arrayUnion({
          status: 'cancelled',
          timestamp: now,
          message: 'Order cancelled by customer.'
        })
      });
      
      showToast('Order cancelled successfully', 'success');
    } catch (error) {
      console.error("Error cancelling order:", error);
      showToast('Failed to cancel order', 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-cream">
        <Header />
        <div className="pt-40 flex justify-center">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
        <Footer />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-cream">
        <Header />
        <div className="pt-40 text-center max-w-xl mx-auto px-4">
          <Package size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-3xl font-bold text-luxury italic mb-4">Order Not Found</h2>
          <p className="text-gray-500 mb-8 font-light">We couldn't find the order you're looking for. It might have been removed or you may not have permission to view it.</p>
          <Link href="/profile" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const canCancel = order.status === 'placed';

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8">
          <Link href="/profile" className="hover:text-primary transition-colors">My Profile</Link>
          <ChevronRight size={10} />
          <span className="text-luxury">Order #{order.orderId}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Order Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracking Card */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-luxury border border-gray-50 overflow-hidden relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-luxury italic">Track Order</h1>
                  <p className="text-gray-400 text-xs mt-1">Expected Delivery: {new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
                <button onClick={() => window.print()} className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors text-gray-400">
                  <Printer size={20} />
                </button>
              </div>

              <TrackingTimeline timeline={order.trackingTimeline} currentStatus={order.status} />

              {canCancel && (
                <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    className="text-red-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                  >
                    {isCancelling ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                    Cancel Order
                  </button>
                </div>
              )}
            </section>

            {/* Items Card */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-luxury border border-gray-50">
              <h3 className="text-xl font-bold text-luxury italic mb-8">Items in your Order</h3>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center py-4 border-b border-gray-50 last:border-0">
                    <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shadow-sm shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-luxury text-lg">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
                      <p className="text-[10px] text-gray-400 mt-1">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Order Info */}
            <div className="bg-white p-8 rounded-2xl shadow-luxury border border-gray-50 space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center gap-2">
                  <Calendar size={14} />
                  Order Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order ID</span>
                    <span className="font-bold text-luxury">#{order.orderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-bold text-luxury">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Pieces</span>
                    <span className="font-bold text-luxury">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center gap-2">
                  <MapPin size={14} />
                  Shipping Address
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {order.address}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center gap-2">
                  <CreditCard size={14} />
                  Payment Method
                </h4>
                <p className="text-sm font-bold text-luxury uppercase tracking-wider">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
                </p>
              </div>

              <div className="pt-6 border-t-2 border-primary/20 bg-primary/[0.02] -mx-8 px-8 py-6 rounded-b-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-luxury">Order Total</span>
                  <span className="text-2xl font-bold text-primary">₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-luxury p-8 rounded-2xl shadow-xl text-white">
              <h4 className="font-bold text-lg mb-2 italic">Need Assistance?</h4>
              <p className="text-white/70 text-sm font-light mb-6">Our heritage consultants are available 24/7 to help you with your order.</p>
              <Link href="/contact" className="block w-full bg-white text-luxury py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] text-center hover:bg-cream transition-colors">
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
