import React from 'react';
import { cn } from '../../utils/cn';

interface AdminChartProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const AdminChart: React.FC<AdminChartProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn('bg-white rounded-xl border border-[#E5E7EB] shadow-sm', className)}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          {title && (
            <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-[#666666]">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

