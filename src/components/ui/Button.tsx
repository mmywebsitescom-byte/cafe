import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isPill?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isPill = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const roundedClasses = isPill ? 'rounded-full' : 'rounded-sm';

  const variantClasses = {
    primary:
      'bg-[#C6A15B] text-[#17120F] font-semibold hover:bg-[#D8BC82] hover:-translate-y-0.5 shadow-md shadow-[#C6A15B]/15 hover:shadow-lg hover:shadow-[#C6A15B]/25',
    secondary:
      'bg-transparent border border-[#F5EFE6]/30 text-[#F5EFE6] hover:border-[#C6A15B] hover:text-[#C6A15B] hover:bg-[#C6A15B]/5',
    outline:
      'bg-transparent border border-[#C6A15B]/40 text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#17120F] hover:shadow-md',
    ghost:
      'bg-transparent text-[#A99B8C] hover:text-[#F8F3EC] hover:bg-white/[0.04]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${roundedClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
