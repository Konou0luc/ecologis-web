import React from 'react';
import { cn } from '../../utils/cn';

interface DashboardSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardSectionWrapper: React.FC<DashboardSectionWrapperProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  );
};

