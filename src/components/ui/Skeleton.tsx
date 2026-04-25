'use client';

import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-sm" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-4" />
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="aspect-[16/9] bg-gray-200 rounded-sm" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
};
