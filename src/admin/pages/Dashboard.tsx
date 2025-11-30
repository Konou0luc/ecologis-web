import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Zap, 
  Receipt, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { 
  RecentActivityCard, 
  QuickStatsCard, 
  DashboardChart
} from '../components/dashboard';
import { adminTheme } from '../theme/adminTheme';

interface DashboardStats {
  utilisateurs: {
    total: number;
    proprietaires: number;
    residents: number;
    admins: number;
  };
  maisons: {
    total: number;
  };
  consommations: {
    total: number;
    totalKwh: number;
    totalMontant: number;
  };
  factures: {
    total: number;
    payees: number;
    enRetard: number;
    enAttente: number;
    revenusTotaux: number;
  };
  graphiques: {
    consommationsParMois: Array<{
      _id: { annee: number; mois: number };
      totalKwh: number;
      totalMontant: number;
      count: number;
    }>;
    facturesParMois: Array<{
      _id: { annee: number; mois: number };
      totalMontant: number;
      count: number;
      payees: number;
    }>;
    topMaisons: Array<{
      _id: string;
      totalKwh: number;
      totalMontant: number;
      count: number;
      maison: {
        _id: string;
        nomMaison: string;
        adresse: string;
      };
    }>;
  };
}


interface RecentActivity {
  id: string;
  type: 'user' | 'house' | 'resident' | 'consumption' | 'bill' | 'subscription';
  action: string;
  user: string;
  itemId?: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  isNew?: boolean;
}

const Dashboard: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [statsResponse, billsResponse, consumptionsResponse, usersResponse, housesResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getBills({ limit: 5, page: 1 }),
          apiService.getConsumptions({ limit: 5, page: 1 }),
          apiService.getUsers({ limit: 5, page: 1 }),
          apiService.getHouses({ limit: 5, page: 1 })
        ]);
        
        if (statsResponse.error) {
          setError(statsResponse.error);
        } else if (statsResponse.data) {
          setStats(statsResponse.data);
        }

        // Format timestamp to relative time
        const formatRelativeTime = (dateString: string): string => {
          const date = new Date(dateString);
          const now = new Date();
          const diffMs = now.getTime() - date.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMs / 3600000);
          const diffDays = Math.floor(diffMs / 86400000);
          const diffMonths = Math.floor(diffDays / 30);
          const diffYears = Math.floor(diffDays / 365);

          if (diffMins < 1) return 'À l\'instant';
          if (diffMins < 60) return `il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
          if (diffHours < 24) return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
          if (diffDays < 30) return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
          if (diffMonths < 12) return `il y a ${diffMonths} mois`;
          return `il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
        };

        // Generate ID from MongoDB _id
        const generateItemId = (id: string, prefix: string): string => {
          return `${prefix}-${id.substring(id.length - 6).toUpperCase()}`;
        };

        const activities: RecentActivity[] = [];
        
        // Add bill activities
        if (billsResponse.data?.factures) {
          billsResponse.data.factures.forEach((bill, index) => {
            const userName = bill.residentId 
              ? `${bill.residentId.prenom} ${bill.residentId.nom}`
              : 'Utilisateur inconnu';
            
            const billDate = new Date(bill.createdAt || bill.dateEmission);
            const now = new Date();
            const diffMins = Math.floor((now.getTime() - billDate.getTime()) / 60000);
            
          activities.push({
              id: `bill-${bill._id}`,
              type: 'bill',
              action: 'a créé une facture',
              user: userName,
              itemId: generateItemId(bill._id, 'FAC'),
              timestamp: formatRelativeTime(bill.createdAt || bill.dateEmission),
              status: bill.statut === 'payée' ? 'success' : bill.statut === 'en_retard' ? 'error' : 'warning',
              isNew: index === 0 && diffMins < 15 // Mark as new if created less than 15 minutes ago
          });
          });
        }

        // Add consumption activities
        if (consumptionsResponse.data?.consommations) {
          consumptionsResponse.data.consommations.forEach((consumption) => {
            const userName = consumption.residentId 
              ? `${consumption.residentId.prenom} ${consumption.residentId.nom}`
              : 'Utilisateur inconnu';
            
          activities.push({
              id: `consumption-${consumption._id}`,
              type: 'consumption',
              action: 'a enregistré une consommation',
              user: userName,
              itemId: generateItemId(consumption._id, 'CON'),
              timestamp: formatRelativeTime(consumption.createdAt),
            status: 'success'
          });
          });
        }
        
        // Add user registration activities
        if (usersResponse.data?.users) {
          usersResponse.data.users.forEach((user) => {
            const userName = `${user.prenom} ${user.nom}`;
            
          activities.push({
              id: `user-${user._id}`,
              type: 'user',
              action: 'a enregistré un nouvel utilisateur',
              user: userName,
              itemId: generateItemId(user._id, 'USR'),
              timestamp: formatRelativeTime(user.createdAt),
            status: 'success'
          });
          });
        }

        // Add house creation activities
        if (housesResponse.data?.maisons) {
          housesResponse.data.maisons.forEach((house) => {
            const userName = house.proprietaireId 
              ? `${house.proprietaireId.prenom} ${house.proprietaireId.nom}`
              : 'Propriétaire inconnu';
            
          activities.push({
              id: `house-${house._id}`,
              type: 'house',
              action: 'a ajouté une nouvelle maison',
              user: userName,
              itemId: generateItemId(house._id, 'MAI'),
              timestamp: formatRelativeTime(house.createdAt),
              status: 'success'
            });
          });
        }

        // Sort activities by date (most recent first)
        // We need to store the original date for proper sorting
        const activitiesWithDates = activities.map(activity => {
          // Try to extract date from the original data
          let originalDate: Date | null = null;
          
          // Find the original date from the responses
          if (activity.id.startsWith('bill-')) {
            const billId = activity.id.replace('bill-', '');
            const bill = billsResponse.data?.factures.find(b => b._id === billId);
            if (bill) originalDate = new Date(bill.createdAt || bill.dateEmission);
          } else if (activity.id.startsWith('consumption-')) {
            const consumptionId = activity.id.replace('consumption-', '');
            const consumption = consumptionsResponse.data?.consommations.find(c => c._id === consumptionId);
            if (consumption) originalDate = new Date(consumption.createdAt);
          } else if (activity.id.startsWith('user-')) {
            const userId = activity.id.replace('user-', '');
            const user = usersResponse.data?.users.find(u => u._id === userId);
            if (user) originalDate = new Date(user.createdAt);
          } else if (activity.id.startsWith('house-')) {
            const houseId = activity.id.replace('house-', '');
            const house = housesResponse.data?.maisons.find(h => h._id === houseId);
            if (house) originalDate = new Date(house.createdAt);
          }
          
          return { ...activity, originalDate: originalDate || new Date(0) };
        });

        // Sort by original date (most recent first)
        activitiesWithDates.sort((a, b) => {
          return b.originalDate.getTime() - a.originalDate.getTime();
        });

        // Keep originalDate for sorting in the table, keep only the 10 most recent
        const sortedActivities = activitiesWithDates.slice(0, 10);

        // Set the sorted activities
        setRecentActivity(sortedActivities);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuthenticated, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFA800] mx-auto mb-4"></div>
          <p className="text-sm text-[#6B7280]">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AdminCard className="max-w-md">
          <AdminCardHeader>
            <AdminCardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#F44336]" />
              Erreur de chargement
            </AdminCardTitle>
            <AdminCardDescription>{error}</AdminCardDescription>
          </AdminCardHeader>
          <AdminCardContent>
            <AdminButton onClick={() => window.location.reload()}>
          Réessayer
            </AdminButton>
          </AdminCardContent>
        </AdminCard>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Simple Stat Cards with percentage changes
  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.utilisateurs.total,
      change: 12.5,
      isPositive: true,
    },
    {
      title: 'Revenus totaux',
      value: formatCurrency(stats.factures.revenusTotaux || 0),
      change: 8.3,
      isPositive: true,
    },
    {
      title: 'Consommations',
      value: stats.consommations.total,
      change: -3.2,
      isPositive: false,
    },
    {
      title: 'Maisons',
      value: stats.maisons.total,
      change: 5.7,
      isPositive: true,
    }
  ];

  // Quick Stats Data
  const quickStats = [
    {
      label: 'Factures payées',
      value: stats.factures.payees,
      icon: Receipt,
      iconColor: 'text-[#9CA3AF]'
    },
    {
      label: 'Total kWh',
      value: stats.consommations.totalKwh?.toLocaleString() || '0',
      icon: Zap,
      iconColor: 'text-[#9CA3AF]'
    },
    {
      label: 'Propriétaires',
      value: stats.utilisateurs.proprietaires,
      icon: Users,
      iconColor: 'text-[#9CA3AF]'
    },
    {
      label: 'Résidents',
      value: stats.utilisateurs.residents,
      icon: UserCheck,
      iconColor: 'text-[#9CA3AF]'
    }
  ];

  // Prepare chart data
  const chartData = stats.graphiques?.facturesParMois?.map((item) => ({
    name: `${item._id.mois}/${item._id.annee}`,
    value: item.totalMontant
  })) || [];

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Tableau de bord</h1>
            <p className="text-sm text-gray-500 text-left">Vue d'ensemble de votre plateforme Ecopower</p>
          </div>
          <AdminButton 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="text-sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </AdminButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          return (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Value */}
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
            </div>
              
              {/* Title */}
              <div className="text-sm font-medium text-gray-600 mb-4">
                  {stat.title}
                </div>
              
              {/* Change Badge */}
              <div className="flex items-center gap-2">
                <span 
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    stat.isPositive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.isPositive ? '+' : ''}{stat.change}%
                </span>
                <span className="text-xs text-gray-500">
                  le mois dernier
                </span>
              </div>
            </div>
          );
        })}
          </div>

      {/* Main Content Grid */}
      <div className="space-y-6">
        {/* Top Row: Chart and Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
          <DashboardChart
            title="Évolution des revenus"
            description="Revenus mensuels sur les 12 derniers mois"
            data={chartData}
            type="bar"
            dataKey="value"
            color={adminTheme.colors.primary}
            height={300}
          />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Alerts */}
            <AdminCard className="bg-white border border-gray-200">
              <AdminCardHeader className="pb-4">
                <AdminCardTitle className="text-lg font-bold text-gray-900 text-left">Alertes</AdminCardTitle>
                <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
                Notifications importantes
              </AdminCardDescription>
            </AdminCardHeader>
              <AdminCardContent className="pt-0">
                <div className="space-y-3">
                {stats.factures.enRetard > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2]">
                      <AlertTriangle className="w-4 h-4 text-[#F44336] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827]">Factures en retard</p>
                        <p className="text-xs text-[#6B7280] mt-1">
                        {stats.factures.enRetard} facture{stats.factures.enRetard > 1 ? 's' : ''} nécessitent une attention
                      </p>
                    </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F44336] text-white text-xs font-bold flex-shrink-0">
                        {stats.factures.enRetard}
                      </span>
                  </div>
                )}

                {stats.factures.enAttente > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FFFBEB] border border-[#FEF3C7]">
                      <Clock className="w-4 h-4 text-[#FF9800] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827]">En attente</p>
                        <p className="text-xs text-[#6B7280] mt-1">
                        {stats.factures.enAttente} facture{stats.factures.enAttente > 1 ? 's' : ''} en attente de paiement
                      </p>
                    </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9800] text-white text-xs font-bold flex-shrink-0">
                        {stats.factures.enAttente}
                      </span>
                  </div>
                )}

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#ECFDF5] border border-[#D1FAE5]">
                    <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827]">Système opérationnel</p>
                      <p className="text-xs text-[#6B7280] mt-1">
                      Tous les services fonctionnent normalement
                    </p>
                  </div>
                </div>
              </div>
            </AdminCardContent>
          </AdminCard>

          {/* Quick Stats */}
          <QuickStatsCard stats={quickStats} />
          </div>
        </div>

        {/* Recent Activity - Full Width */}
        <RecentActivityCard activities={recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;
