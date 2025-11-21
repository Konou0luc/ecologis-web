import React from 'react';
import { cn } from '../../utils/cn';

interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'info' | 'warning';
  children: React.ReactNode;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-xl border bg-white shadow-sm';
  
  const variants = {
    default: 'border-[#E5E7EB]',
    primary: 'border-l-4 border-l-[#FFA800]',
    success: 'border-l-4 border-l-[#4CAF50]',
    info: 'border-l-4 border-l-[#2196F3]',
    warning: 'border-l-4 border-l-[#FF9800]',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const AdminCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-5 border-b border-gray-100 text-left', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const AdminCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn('text-lg font-bold text-gray-900 text-left', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const AdminCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm text-gray-500 mt-1 text-left', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const AdminCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

