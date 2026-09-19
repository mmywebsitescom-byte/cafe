import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageSquareHeart, Sparkles } from 'lucide-react';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';
import { validateFeedbackForm, isValidEmail } from '../../utils/validation';
import { useReviews } from '../../context/ReviewContext';
import { useCafe } from '../../context/CafeContext';

export const FeedbackForm: React.FC = () => {
  const { addReview } = useReviews();
  const { cafeInfo } = useCafe();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateFeedbackForm({ name, rating, comment });
    const localErrors = { ...validation.errors };

    if (email && !isValidEmail(email)) {
      localErrors.email = 'Please provide a valid email format';
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    addReview({ name, email, rating, comment });
    setIsSubmitted(true);

    // Reset after delay or allow submitting another
    setTimeout(() => {
      setName('');
      setEmail('');
      setRating(5);
      setComment('');
    }, 1500);
  };

  return (
    <div className="bg-[#241B16] border border-[#C6A15B]/30 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#C6A15B]/5 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#D8BC82]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#F8F3EC]">
                Thank you for sharing your experience.
              </h3>
              <p className="text-sm text-[#A99B8C] max-w-md mx-auto">
                Your feedback helps {cafeInfo.name} {cafeInfo.businessName ? `& ${cafeInfo.businessName}` : ''} continue serving memorable food and hospitality.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs uppercase tracking-widest font-semibold text-[#C6A15B] hover:text-[#D8BC82] underline underline-offset-4 pt-2"
            >
              Submit another review
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#C6A15B]">
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Guest Impressions</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EC]">
                Tell Us About Your Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#A99B8C]">
                Whether it was a quick kulhad chai or an evening dinner, your words mean the world to us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star selection */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                  Rating <span className="text-[#C6A15B]">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <Rating value={rating} onChange={setRating} size="lg" readOnly={false} />
                  <span className="text-xs font-serif italic text-[#D8BC82]">
                    {rating === 5 && 'Exemplary'}
                    {rating === 4 && 'Very Good'}
                    {rating === 3 && 'Good'}
                    {rating === 2 && 'Fair'}
                    {rating === 1 && 'Needs Improvement'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-xs text-rose-400">{errors.rating}</p>
                )}
              </div>

              {/* Grid: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Your Name <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-4 py-2.5 bg-[#17120F] border rounded-sm text-sm text-[#F8F3EC] placeholder-[#A99B8C]/40 focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-[#C6A15B]/30 focus:border-[#C6A15B] focus:ring-[#C6A15B]'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-rose-400">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                    Email Address <span className="text-[10px] text-[#A99B8C] lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className={`w-full px-4 py-2.5 bg-[#17120F] border rounded-sm text-sm text-[#F8F3EC] placeholder-[#A99B8C]/40 focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-[#C6A15B]/30 focus:border-[#C6A15B] focus:ring-[#C6A15B]'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E9DED0]">
                  Your Experience <span className="text-[#C6A15B]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you enjoyed, your favorite dish, or how our team served you..."
                  className={`w-full px-4 py-3 bg-[#17120F] border rounded-sm text-sm text-[#F8F3EC] placeholder-[#A99B8C]/40 focus:outline-none focus:ring-1 transition-all resize-none ${
                    errors.comment
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#C6A15B]/30 focus:border-[#C6A15B] focus:ring-[#C6A15B]'
                  }`}
                />
                {errors.comment && <p className="text-xs text-rose-400">{errors.comment}</p>}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto uppercase tracking-widest text-xs font-bold"
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Share Experience
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
