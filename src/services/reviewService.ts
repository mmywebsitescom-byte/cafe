import { Review } from '../types/review';
import { INITIAL_REVIEWS } from '../data/reviews';

const STORAGE_KEY = 'khatti_cafe_reviews_v2';

export const reviewService = {
  getReviews(): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read reviews from localStorage', e);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
    } catch (e) {
      console.warn('Failed to seed reviews to localStorage', e);
    }
    return INITIAL_REVIEWS;
  },

  getApprovedReviews(): Review[] {
    return this.getReviews().filter((r) => r.approved);
  },

  addReview(reviewData: { name: string; email?: string; rating: number; comment: string }): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: reviewData.name.trim(),
      email: reviewData.email?.trim() || undefined,
      rating: reviewData.rating,
      comment: reviewData.comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      approved: true, // auto-approve in demo for instant gratification, but toggleable in admin
    };
    reviews.unshift(newReview);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save review', e);
    }
    return newReview;
  },

  toggleApproval(id: string, approved: boolean): void {
    const reviews = this.getReviews();
    const target = reviews.find((r) => r.id === id);
    if (target) {
      target.approved = approved;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
      } catch (e) {
        console.error('Failed to update review approval', e);
      }
    }
  },

  deleteReview(id: string): void {
    const reviews = this.getReviews().filter((r) => r.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to delete review', e);
    }
  },

  resetToDefault(): Review[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
    } catch (e) {
      console.error('Failed to reset reviews', e);
    }
    return INITIAL_REVIEWS;
  }
};
