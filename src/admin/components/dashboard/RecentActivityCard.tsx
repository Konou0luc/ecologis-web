import React, { useState } from 'react';
import { Filter, ChevronUp, ChevronDown, Activity, Receipt, Zap, Users, Home, UserCheck, CreditCard } from 'lucide-react';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../ui/AdminCard';

interface RecentActivity {
  id: string;
  type: 'user' | 'house' | 'resident' | 'consumption' | 'bill' | 'subscription';
  action: string;
  user: string;
  itemId?: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  isNew?: boolean;
  originalDate?: Date;
}

interface RecentActivityCardProps {
  activities: RecentActivity[];
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'bill': 'Facture',
    'consumption': 'Consommation',
    'user': 'Utilisateur',
    'house': 'Maison',
    'resident': 'Résident',
    'subscription': 'Abonnement'
  };
  return labels[type] || type;
};

const getTypeIcon = (type: string) => {
  const iconClass = "w-4 h-4";
  switch (type) {
    case 'bill':
      return <Receipt className={iconClass} />;
    case 'consumption':
      return <Zap className={iconClass} />;
    case 'user':
      return <Users className={iconClass} />;
    case 'house':
      return <Home className={iconClass} />;
    case 'resident':
      return <UserCheck className={iconClass} />;
    case 'subscription':
      return <CreditCard className={iconClass} />;
    default:
      return <Activity className={iconClass} />;
  }
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    'bill': 'bg-blue-100 text-blue-700',
    'consumption': 'bg-yellow-100 text-yellow-700',
    'user': 'bg-green-100 text-green-700',
    'house': 'bg-purple-100 text-purple-700',
    'resident': 'bg-pink-100 text-pink-700',
    'subscription': 'bg-indigo-100 text-indigo-700'
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
};

const getInitials = (text: string) => {
  if (!text) return 'U';
  const words = text.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return text.charAt(0).toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'success':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Réussi
        </span>
      );
    case 'warning':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          En attente
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Erreur
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      );
  }
};

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  const [filter, setFilter] = useState<'all' | 'bill' | 'consumption' | 'user' | 'house'>('all');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let comparison = 0;
    switch (sortColumn) {
      case 'itemId':
        comparison = (a.itemId || '').localeCompare(b.itemId || '');
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'user':
        comparison = a.user.localeCompare(b.user);
        break;
      case 'timestamp':
        // Use original date if available, otherwise compare timestamps
        if (a.originalDate && b.originalDate) {
          comparison = a.originalDate.getTime() - b.originalDate.getTime();
        } else {
          comparison = a.timestamp.localeCompare(b.timestamp);
        }
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="w-3 h-3 text-gray-400 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-3 h-3 text-gray-600" />
      : <ChevronDown className="w-3 h-3 text-gray-600" />;
  };

  return (
    <AdminCard className="bg-white border border-gray-200 shadow-lg overflow-hidden">
      <AdminCardHeader className="px-6 pt-6 pb-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between mb-5">
          <div className="text-left">
            <AdminCardTitle className="text-xl font-bold text-gray-900 mb-1 text-left">Activités récentes</AdminCardTitle>
            <AdminCardDescription className="text-sm text-gray-500 text-left">
              Suivez vos activités récentes sur la plateforme
            </AdminCardDescription>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl p-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('bill')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'bill'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Factures
            </button>
            <button
              onClick={() => setFilter('consumption')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'consumption'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Consommations
            </button>
            <button
              onClick={() => setFilter('user')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'user'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Utilisateurs
            </button>
            <button
              onClick={() => setFilter('house')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'house'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Maisons
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md">
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
        </div>
      </AdminCardHeader>
      
      <AdminCardContent className="p-0">
        {sortedActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('itemId')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      ID
                      <SortIcon column="itemId" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Type
                      <SortIcon column="type" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('user')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Utilisateur
                      <SortIcon column="user" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('timestamp')}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      Date
                      <SortIcon column="timestamp" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sortedActivities.map((activity, index) => (
                  <tr 
                    key={activity.id} 
                    className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
                        {activity.itemId || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${getTypeColor(activity.type)}`}>
                          {getTypeIcon(activity.type)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {getTypeLabel(activity.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${getAvatarColor(activity.user)} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
                          {getInitials(activity.user)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {activity.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">
                        {activity.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 font-medium">
                        {activity.timestamp}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(activity.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Aucune activité récente</p>
            <p className="text-xs text-gray-500">Les nouvelles activités apparaîtront ici</p>
          </div>
        )}
      </AdminCardContent>
    </AdminCard>
  );
};
