'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loginWithGoogle, isLoading } = useAuth();
  const { showToast } = useAppContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      showToast('Welcome to the Vibhava family!', 'success');
      router.push('/profile');
    } catch (error: any) {
      showToast(error.message || 'Signup failed. Please try again.', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-32">
      <Header />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 md:p-12 shadow-premium rounded-sm">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-luxury mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join our exclusive heritage circle</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-100 outline-none focus:border-primary transition-colors bg-gray-50" 
                  required
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              </div>
            </div>

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
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign Up'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login</Link>
            </p>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 tracking-widest">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={async () => {
              try {
                await loginWithGoogle();
                showToast('Welcome to the Vibhava family!', 'success');
                router.push('/profile');
              } catch (error: any) {
                showToast(error.message || 'Google signup failed', 'error');
              }
            }}
            disabled={isLoading}
            className="w-full border border-gray-200 py-4 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all disabled:opacity-70"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5" alt="Google" />
            Google
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
