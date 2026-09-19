import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Review } from '../types/review';
import { reviewService } from '../services/reviewService';

interface ReviewContextType {
  reviews: Review[];
  approvedReviews: Review[];
  loading: boolean;
  addReview: (data: { name: string; email?: string; rating: number; comment: string }) => Review;
  toggleApproval: (id: string, approved: boolean) => void;
  deleteReview: (id: string) => void;
  refreshReviews: () => void;
  resetReviews: () => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshReviews = useCallback(() => {
    setLoading(true);
    const all = reviewService.getReviews();
    setReviews(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshReviews();
  }, [refreshReviews]);

  const addReview = (data: { name: string; email?: string; rating: number; comment: string }) => {
    const created = reviewService.addReview(data);
    refreshReviews();
    return created;
  };

  const toggleApproval = (id: string, approved: boolean) => {
    reviewService.toggleApproval(id, approved);
    refreshReviews();
  };

  const deleteReview = (id: string) => {
    reviewService.deleteReview(id);
    refreshReviews();
  };

  const resetReviews = () => {
    reviewService.resetToDefault();
    refreshReviews();
  };

  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        approvedReviews,
        loading,
        addReview,
        toggleApproval,
        deleteReview,
        refreshReviews,
        resetReviews,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
