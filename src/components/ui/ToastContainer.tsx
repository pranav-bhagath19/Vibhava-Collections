'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts } = useAppContext();

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl min-w-[300px] border-l-4 ${
              toast.type === 'success' ? 'bg-white border-green-500' : 
              toast.type === 'error' ? 'bg-white border-primary' : 
              'bg-white border-secondary'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
            {toast.type === 'error' && <AlertCircle className="text-primary" size={20} />}
            {toast.type === 'info' && <Info className="text-secondary" size={20} />}
            
            <p className="text-sm font-bold text-gray-800 flex-1">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
