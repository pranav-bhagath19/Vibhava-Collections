'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppContext } from '@/context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const { cart, cartTotal, showToast } = useAppContext();
  const [isOrdered, setIsOrdered] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    pin: '',
    phone: '',
    paymentMethod: 'cod'
  });

  // Sync email when user changes
  useEffect(() => {
    if (user?.email) setFormData(prev => ({ ...prev, email: user.email }));
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.email || !formData.address || !formData.phone) {
        showToast('Please fill in all shipping details', 'error');
        return;
      }
    }
    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsLoading(false);
    }, 600);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const { clearCart } = useAppContext();
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('Please sign in to place an order', 'info');
      return;
    }

    setIsLoading(true);
    try {
      const orderId = `VB-${Math.floor(Math.random() * 90000) + 10000}`;
      const orderData = {
        orderId,
        userId: user.id,
        userName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} - ${formData.pin}`,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          image: item.images[0]
        })),
        total: cartTotal,
        status: 'placed',
        createdAt: new Date().toISOString() // Using string for simple cross-reference, but real-time listeners work with it
      };

      // 1. Save to global orders collection
      await setDoc(doc(db, 'orders', orderId), orderData);

      // 2. Clear cart in Firestore
      await clearCart();

      setIsOrdered(true);
      showToast('Order placed successfully!', 'success');
    } catch (error) {
      console.error('Order error:', error);
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <main className="min-h-screen bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4 pt-32">
          <div className="max-w-md w-full bg-white p-12 text-center shadow-luxury rounded-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
            <div className="flex justify-center mb-6">
              <CheckCircle2 size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-luxury mb-4 italic">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8 font-light leading-relaxed">
              Thank you for shopping with Vibhava Collections. Your order <span className="text-primary font-bold">#VB-{Math.floor(Math.random() * 90000) + 10000}</span> has been placed and is being prepared for shipment.
            </p>
            <Link 
              href="/shop"
              className="btn-primary w-full"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <header className="text-center mb-12">
          <span className="section-subheading">Seamless Checkout</span>
          <h1 className="text-4xl md:text-6xl font-bold text-luxury italic">Your Heritage Awaits</h1>
          
          <div className="flex justify-center items-center mb-16 px-4 pt-12">
            {[
              { id: 1, label: 'Shipping' },
              { id: 2, label: 'Payment' },
              { id: 3, label: 'Review' }
            ].map((s, index) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
                    currentStep >= s.id ? 'bg-primary text-white shadow-xl scale-110' : 'bg-white text-gray-300 border border-gray-100'
                  }`}>
                    {currentStep > s.id ? <CheckCircle2 size={24} /> : <span className="font-bold text-sm">{s.id}</span>}
                  </div>
                  <span className={`absolute -bottom-8 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap ${
                    currentStep >= s.id ? 'text-primary' : 'text-gray-300'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-16 md:w-32 h-[1px] mx-4 transition-all duration-1000 ${
                    currentStep > s.id ? 'bg-primary' : 'bg-gray-100'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="bg-white p-8 md:p-12 shadow-luxury rounded-xl border border-gray-50 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex-1">
                  {currentStep === 1 && (
                    <div className="space-y-8 animate-fade-in">
                      <h2 className="text-xl font-bold text-luxury italic">Shipping Details</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">First Name *</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Last Name *</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Street Address *</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="123 Heritage Street" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">City *</label>
                          <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="Bangalore" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">PIN Code *</label>
                          <input type="text" name="pin" value={formData.pin} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="560001" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Phone Number *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-5 bg-white border border-gray-100 rounded-lg outline-none focus:border-secondary transition-all shadow-sm text-sm" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8 animate-fade-in">
                      <h2 className="text-xl font-bold text-luxury italic">Payment Method</h2>
                      <div className="space-y-4">
                        <div 
                          onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                          className={`p-6 border rounded-xl cursor-pointer transition-all flex items-center gap-4 ${
                            formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-inner' : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
                            {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-luxury">Cash on Delivery</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pay when you receive the product</p>
                          </div>
                        </div>
                        
                        <div 
                          className="p-6 border border-gray-100 rounded-xl opacity-50 cursor-not-allowed flex items-center gap-4"
                        >
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                          <div>
                            <p className="font-bold text-sm text-luxury">Online Payment (UPI / Cards)</p>
                            <p className="text-[10px] text-red-400 uppercase tracking-widest italic">Temporarily Unavailable</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8 animate-fade-in">
                      <h2 className="text-xl font-bold text-luxury italic">Review & Confirm</h2>
                      <div className="space-y-6">
                        <div className="bg-cream/20 p-8 rounded-xl space-y-6">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Deliver to:</h4>
                            <p className="text-sm font-bold text-luxury">{formData.firstName} {formData.lastName}</p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">{formData.address}, {formData.city} - {formData.pin}</p>
                            <p className="text-xs text-gray-500 mt-1">{formData.phone}</p>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Payment:</h4>
                            <p className="text-sm font-bold text-luxury uppercase tracking-wider">{formData.paymentMethod.replace('-', ' ')}</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 italic leading-relaxed text-center">
                          By placing this order, you agree to Vibhava Collections' <br/> Terms of Service and Privacy Policy.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
              {currentStep > 1 && (
                <button 
                  onClick={prevStep}
                  className="btn-outline flex-1 py-5 rounded-xl"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button 
                  onClick={nextStep}
                  className="btn-primary flex-1 py-5 rounded-xl shadow-luxury"
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={handleOrder}
                  className="btn-primary flex-1 py-5 bg-green-700 hover:bg-green-800 rounded-xl shadow-luxury border-none"
                >
                  Confirm Order
                  <CheckCircle2 size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-10 shadow-luxury sticky top-32 rounded-xl border border-gray-50 space-y-8">
              <h2 className="text-xl font-bold text-luxury pb-4 border-b border-gray-100 italic">Order Summary</h2>
              
              <div className="max-h-64 overflow-y-auto pr-2 no-scrollbar space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-gray-50 shrink-0 rounded-lg overflow-hidden shadow-sm">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.quantity} x ₹{item.discountPrice || item.price}</p>
                    </div>
                    <p className="text-sm font-bold text-primary">₹{(item.discountPrice || item.price) * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 font-light text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <span className="text-lg font-bold text-luxury">Total Payable</span>
                  <span className="text-2xl font-bold text-primary">₹{cartTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-secondary" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Secure Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Authenticity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
