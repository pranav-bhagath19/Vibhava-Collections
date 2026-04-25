'use client';

import React, { useState } from 'react';
import { Star, User, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Anjali R.', rating: 5, date: '2 weeks ago', comment: 'Absolutely stunning saree. The zari work is even more beautiful in person. The fabric feels premium and royal.', helpful: 12 },
    { id: 2, user: 'Meera K.', rating: 4, date: '1 month ago', comment: 'Great quality, but the color is slightly darker than the pictures. Still very happy with the purchase.', helpful: 5 }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment) return;
    
    const review = {
      id: Date.now(),
      user: 'You',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      helpful: 0
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="mt-20 border-t border-gray-100 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Review Summary */}
        <div>
          <h2 className="text-3xl font-bold text-luxury mb-6">Customer Reviews</h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl font-bold text-primary">4.8</div>
            <div>
              <div className="flex text-secondary mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Based on 124 reviews</p>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center gap-4">
                <span className="text-xs font-bold w-4">{star}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-secondary rounded-full`} style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '2%' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 p-8 rounded-xl border border-primary/5">
            <h3 className="font-bold text-gray-800 mb-4 italic">Write a review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    key={s} 
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: s })}
                    className={`transition-colors ${s <= newReview.rating ? 'text-secondary' : 'text-gray-300'}`}
                  >
                    <Star size={24} fill={s <= newReview.rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <textarea 
                placeholder="Share your experience..." 
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-4 border border-gray-100 outline-none focus:border-primary transition-colors bg-white resize-none rounded-xl"
                rows={4}
              />
              <button className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-primary-light transition-all shadow-lg rounded-xl">
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-12">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-50 pb-10"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.user}</h4>
                    <div className="flex text-secondary scale-75 origin-left">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />)}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-light mb-6 italic">"{review.comment}"</p>
              <button className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-primary transition-colors">
                <ThumbsUp size={14} />
                Helpful ({review.helpful})
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
