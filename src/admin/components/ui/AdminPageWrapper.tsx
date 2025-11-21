import React from 'react';
import { cn } from '../../utils/cn';

interface AdminPageWrapperProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({
  title,
  description,
  actions,
  children,
  className,
}) => {
  return (
    <div className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-[#666666]">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

