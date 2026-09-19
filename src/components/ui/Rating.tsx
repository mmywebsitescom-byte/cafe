import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 'md',
  readOnly = true,
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= value;

        if (readOnly) {
          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'text-[#C6A15B] fill-[#C6A15B]'
                  : 'text-[#A99B8C]/30 fill-transparent'
              }`}
            />
          );
        }

        return (
          <button
            type="button"
            key={index}
            onClick={() => onChange && onChange(starValue)}
            className="p-1 rounded-sm hover:scale-110 transition-transform focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A15B]"
            aria-label={`${starValue} stars`}
          >
            <Star
              className={`${sizeClasses[size]} cursor-pointer ${
                isFilled
                  ? 'text-[#C6A15B] fill-[#C6A15B]'
                  : 'text-[#A99B8C]/40 hover:text-[#C6A15B]/60'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};
