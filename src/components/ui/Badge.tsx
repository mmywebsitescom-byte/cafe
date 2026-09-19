import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'muted' | 'veg' | 'nonveg' | 'light';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider',
  };

  const variantClasses = {
    gold: 'bg-[#C6A15B]/15 text-[#D8BC82] border border-[#C6A15B]/30',
    muted: 'bg-white/[0.04] text-[#A99B8C] border border-white/[0.08]',
    veg: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40',
    nonveg: 'bg-rose-950/60 text-rose-300 border border-rose-500/40',
    light: 'bg-[#F5EFE6] text-[#211A16] font-medium border border-[#E9DED0]',
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-medium rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
