'use client';

import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] bg-gray-100 shimmer rounded-sm" />
      <div className="space-y-2">
        <div className="h-3 w-1/4 bg-gray-100 shimmer rounded" />
        <div className="h-5 w-3/4 bg-gray-100 shimmer rounded" />
        <div className="h-5 w-1/3 bg-gray-100 shimmer rounded" />
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="aspect-video bg-gray-100 shimmer rounded-sm" />
      ))}
    </div>
  );
};
