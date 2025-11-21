import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../ui/AdminCard';
import { adminTheme } from '../../theme/adminTheme';

interface DashboardChartProps {
  title: string;
  description?: string;
  data?: any[];
  type?: 'line' | 'area' | 'bar';
  dataKey?: string;
  color?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded border border-[#E5E7EB] shadow-sm p-2">
        <p className="text-xs text-[#6B7280] mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  description,
  data = [],
  type = 'bar',
  dataKey = 'value',
  color = adminTheme.colors.primary,
  height = 300
}) => {
  // Sample data if none provided
  const chartData = data.length > 0 ? data : [
    { name: 'Jan', value: 4000 },
    { name: 'Fév', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Avr', value: 2780 },
    { name: 'Mai', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  return (
    <AdminCard className="bg-white border border-[#E5E7EB]">
      <AdminCardHeader className="pb-4">
        <AdminCardTitle className="text-lg font-bold text-gray-900 text-left">{title}</AdminCardTitle>
        {description && (
          <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
            {description}
          </AdminCardDescription>
        )}
      </AdminCardHeader>
      <AdminCardContent className="pt-0">
        <div className="bg-white p-4 rounded-lg" style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  strokeWidth={2}
                  dot={{ fill: color, r: 3 }}
                />
              </LineChart>
            ) : type === 'area' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  strokeWidth={2}
                  fill={`url(#gradient-${color})`}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </AdminCardContent>
    </AdminCard>
  );
};
