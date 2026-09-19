import React from 'react';

export const FoodCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#241B16] border border-[#C6A15B]/15 rounded-sm overflow-hidden animate-pulse">
      <div className="w-full aspect-[4/3] bg-white/[0.04]" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-3 w-16 bg-white/[0.06] rounded-sm" />
          <div className="h-4 w-12 bg-white/[0.06] rounded-sm" />
        </div>
        <div className="h-5 w-3/4 bg-white/[0.08] rounded-sm" />
        <div className="h-3.5 w-full bg-white/[0.04] rounded-sm" />
        <div className="h-3.5 w-2/3 bg-white/[0.04] rounded-sm" />
      </div>
    </div>
  );
};

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-[#241B16] border border-[#C6A15B]/15 rounded-sm animate-pulse"
        />
      ))}
    </div>
  );
};

export const ReviewSkeleton: React.FC = () => {
  return (
    <div className="bg-[#F5EFE6] rounded-sm p-6 space-y-4 border border-[#E9DED0] animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-[#211A16]/10 rounded-sm" />
        <div className="h-3 w-16 bg-[#211A16]/10 rounded-sm" />
      </div>
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-[#211A16]/10 rounded-sm" />
        <div className="h-3.5 w-4/5 bg-[#211A16]/10 rounded-sm" />
      </div>
      <div className="h-4 w-32 bg-[#211A16]/15 rounded-sm" />
    </div>
  );
};
