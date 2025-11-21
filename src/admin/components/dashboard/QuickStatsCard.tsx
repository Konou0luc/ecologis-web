import React from 'react';
import { Receipt, Zap, Users, UserCheck } from 'lucide-react';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardContent } from '../ui/AdminCard';

interface QuickStat {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

interface QuickStatsCardProps {
  stats: QuickStat[];
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ stats }) => {
  return (
    <AdminCard className="bg-white border border-gray-200">
      <AdminCardHeader className="pb-3">
        <AdminCardTitle className="text-lg font-bold text-gray-900 text-left">Statistiques rapides</AdminCardTitle>
      </AdminCardHeader>
      <AdminCardContent className="pt-0 pb-4">
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center"
              >
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-1.5">
                  <Icon className={`w-3.5 h-3.5 ${stat.iconColor}`} />
                </div>
                <div className="text-base font-bold text-gray-900 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AdminCardContent>
    </AdminCard>
  );
};
