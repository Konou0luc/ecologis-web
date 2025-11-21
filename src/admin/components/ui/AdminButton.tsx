import React from 'react';
import { cn } from '../../utils/cn';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#FFA800] text-black hover:bg-[#E69500] focus:ring-[#FFA800]',
    secondary: 'bg-[#262626] text-white hover:bg-[#333333] focus:ring-[#262626]',
    outline: 'border-2 border-[#E5E7EB] bg-transparent text-[#111827] hover:bg-[#F5F5F5] focus:ring-[#FFA800]',
    ghost: 'bg-transparent text-[#666666] hover:bg-[#F5F5F5] focus:ring-[#FFA800]',
    danger: 'bg-[#F44336] text-white hover:bg-[#D32F2F] focus:ring-[#F44336]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

