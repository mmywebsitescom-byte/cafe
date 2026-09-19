import React from 'react';
import { Link } from 'react-router-dom';
import { useCafe } from '../../context/CafeContext';

interface BrandLogoProps {
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
  className?: string;
  name?: string;
  subtitle?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'dark',
  showSubtitle = true,
  size = 'md',
  linkToHome = true,
  className = '',
  name,
  subtitle,
}) => {
  const { cafeInfo } = useCafe();
  const isDarkBg = theme === 'dark';

  const displayName = name || cafeInfo?.name || 'Artisan Cafe';
  const displaySubtitle = subtitle !== undefined ? subtitle : (cafeInfo?.businessName || 'Culinary Sanctuary');

  const words = displayName.trim().split(/\s+/);
  const firstWord = words[0] || '';
  const restWords = words.slice(1).join(' ');
  const initialLetter = (firstWord[0] || 'C').toUpperCase();

  const monogramSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.18em] leading-tight',
    md: 'text-base sm:text-lg tracking-[0.2em] leading-none',
    lg: 'text-2xl sm:text-3xl tracking-[0.25em] leading-none',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Dynamic Monogram Circular Badge */}
      <div
        className={`shrink-0 ${monogramSizes[size]} rounded-full flex items-center justify-center font-serif font-bold transition-all duration-300 ${
          isDarkBg
            ? 'bg-gradient-to-br from-[#D8BC82] to-[#C6A15B] text-[#17120F] shadow-sm shadow-[#C6A15B]/30 group-hover:scale-105'
            : 'bg-[#17120F] text-[#D8BC82] border border-[#C6A15B]/40 group-hover:scale-105'
        }`}
      >
        <span>{initialLetter}</span>
      </div>

      {/* Typography Stack */}
      <div className="flex flex-col justify-center">
        <div
          className={`font-serif uppercase font-bold transition-colors ${titleSizes[size]} ${
            isDarkBg ? 'text-[#F8F3EC] group-hover:text-[#D8BC82]' : 'text-[#211A16]'
          }`}
        >
          {firstWord}{' '}
          {restWords ? (
            <span className="text-[#C6A15B] font-light">{restWords}</span>
          ) : null}
        </div>
        {showSubtitle && displaySubtitle && (
          <span
            className={`font-sans uppercase font-medium mt-1 transition-opacity truncate max-w-[200px] sm:max-w-xs ${subtitleSizes[size]} ${
              isDarkBg ? 'text-[#A99B8C]' : 'text-[#211A16]/60'
            }`}
          >
            {displaySubtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A15B]">
        {content}
      </Link>
    );
  }

  return content;
};

