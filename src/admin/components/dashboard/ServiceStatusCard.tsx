import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Server, Database, Bell, HardDrive } from 'lucide-react';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../ui/AdminCard';

interface SystemService {
  name: string;
  status: string;
  responseTime: number | null;
  connected: boolean;
  indicator: 'online' | 'offline' | 'warning';
}

interface ServiceStatusCardProps {
  services: SystemService[];
}

const getServiceIcon = (name: string) => {
  const iconClass = "w-4 h-4 text-[#9CA3AF]";
  const nameLower = name.toLowerCase();
  if (nameLower.includes('api')) return <Server className={iconClass} />;
  if (nameLower.includes('base') || nameLower.includes('database') || nameLower.includes('données')) return <Database className={iconClass} />;
  if (nameLower.includes('notification')) return <Bell className={iconClass} />;
  if (nameLower.includes('stockage') || nameLower.includes('storage')) return <HardDrive className={iconClass} />;
  return <Server className={iconClass} />;
};

const getStatusDot = (indicator: string) => {
  switch (indicator) {
    case 'online':
      return 'bg-[#4CAF50]';
    case 'warning':
      return 'bg-[#FF9800]';
    case 'offline':
      return 'bg-[#F44336]';
    default:
      return 'bg-[#9CA3AF]';
  }
};

export const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ services }) => {
  const defaultServices: SystemService[] = services.length > 0 ? services : [
    { name: 'API', status: 'Opérationnel', responseTime: 4, connected: true, indicator: 'online' },
    { name: 'Base de données', status: 'Opérationnel', responseTime: 7, connected: true, indicator: 'online' },
    { name: 'Notifications', status: 'Opérationnel', responseTime: 5, connected: true, indicator: 'online' },
  ];

  return (
    <AdminCard className="bg-white border border-[#E5E7EB]">
      <AdminCardHeader className="pb-3">
        <AdminCardTitle className="text-base font-semibold text-[#111827]">Statut des services</AdminCardTitle>
        <AdminCardDescription className="text-xs text-[#6B7280]">
          État de santé des services système
        </AdminCardDescription>
      </AdminCardHeader>
      <AdminCardContent className="pt-0">
        <div className="space-y-3">
          {defaultServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                {getServiceIcon(service.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-[#111827]">{service.name}</p>
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(service.indicator)}`} />
                </div>
                <p className="text-xs text-[#6B7280]">{service.status}</p>
              </div>
              {service.responseTime !== null && (
                <span className="text-xs font-mono text-[#6B7280] bg-white px-2 py-1 rounded border border-[#E5E7EB]">
                  {service.responseTime}ms
                </span>
              )}
            </div>
          ))}
        </div>
      </AdminCardContent>
    </AdminCard>
  );
};
