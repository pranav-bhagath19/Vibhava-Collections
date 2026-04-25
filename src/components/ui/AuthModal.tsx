'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, setAuthModalOpen, showToast } = useAppContext();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        showToast('Welcome back to Vibhava!');
      } else {
        await signup(formData.name, formData.email, formData.password);
        showToast('Account created successfully!');
      }
      setAuthModalOpen(false);
    } catch (err) {
      showToast('Authentication failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthModalOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-luxury overflow-hidden"
        >
          <button 
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-primary transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-12">
            <header className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold mb-3 block">
                {isLogin ? 'Welcome Back' : 'Join the Legacy'}
              </span>
              <h2 className="text-3xl font-bold text-luxury">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-cream/30 border border-gray-100 p-3 pl-10 outline-none focus:border-primary transition-all text-sm font-light"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-cream/30 border border-gray-100 p-3 pl-10 outline-none focus:border-primary transition-all text-sm font-light"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-cream/30 border border-gray-100 p-3 pl-10 outline-none focus:border-primary transition-all text-sm font-light"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold hover:text-primary">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                disabled={isLoading}
                className="btn-primary w-full py-5 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <footer className="mt-10 text-center">
              <p className="text-sm text-gray-500 font-light">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-primary font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
