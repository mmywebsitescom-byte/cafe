import React from 'react';
import { useReviews } from '../../context/ReviewContext';
import { useCafe } from '../../context/CafeContext';
import { ContinuousReviewCarousel } from './ContinuousReviewCarousel';
import { FeedbackForm } from './FeedbackForm';
import { ReviewSkeleton } from '../ui/Loading';
import { Star } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const { approvedReviews, loading } = useReviews();
  const { cafeInfo } = useCafe();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#1D1612]">
      {/* Background Ambience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 text-[#D8BC82] text-xs">
            <Star className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
            <span className="font-semibold tracking-wider uppercase text-[11px]">
              {cafeInfo.rating || 4.8} ★ • {cafeInfo.reviewCount || 250}+ Verified Google Reviews
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F8F3EC]">
            Loved by Good-Food People.
          </h2>
          <p className="text-sm sm:text-base text-[#A99B8C] font-light">
            Read stories from friends, families, and travelers who found their favorite bites and cozy nook at {cafeInfo.name}.
          </p>
        </div>
      </div>

      {/* Full-width continuous left-to-right scrolling marquee */}
      <div className="w-full mt-4">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
            </div>
          </div>
        ) : approvedReviews.length === 0 ? (
          <div className="text-center py-10 text-[#A99B8C]">
            Be the first to share your experience with us!
          </div>
        ) : (
          <ContinuousReviewCarousel reviews={approvedReviews} speed={36} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback CTA Form */}
        <div className="max-w-3xl mx-auto pt-10">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
};
