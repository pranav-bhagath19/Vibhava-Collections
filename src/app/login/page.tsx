'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { showToast } = useAppContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast('Welcome back to Vibhava!', 'success');
      router.push('/profile');
    } catch (error: any) {
      showToast(error.message || 'Authentication failed. Please check your credentials.', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 md:p-12 shadow-premium rounded-sm">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-luxury mb-2">Login</h1>
            <p className="text-gray-500 text-sm">Access your orders and profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-100 outline-none focus:border-primary transition-colors bg-gray-50" 
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-100 outline-none focus:border-primary transition-colors bg-gray-50" 
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-lg disabled:opacity-70"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Create One</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
