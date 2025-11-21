import React from 'react';
import { cn } from '../../utils/cn';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border border-[#E5E7EB] rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent',
            'disabled:bg-[#F5F5F5] disabled:cursor-not-allowed',
            error && 'border-[#F44336] focus:ring-[#F44336]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#F44336]">{error}</p>
        )}
      </div>
    );
  }
);

AdminInput.displayName = 'AdminInput';

