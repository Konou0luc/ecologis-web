import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Zap,
  Calendar,
  Home,
  User,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Mail,
  MapPin,
  Eye,
  Edit,
  Trash2,
  DollarSign
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Consumption {
  _id: string;
  residentId: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  maisonId: {
    _id: string;
    nomMaison: string;
    adresse: string | {
      rue?: string;
      ville?: string;
      codePostal?: string;
      pays?: string;
    };
  };
  kwh: number;
  mois: number;
  annee: number;
  montant: number;
  statut: string;
  createdAt: string;
}

const ConsumptionManagement: React.FC = () => {
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<number>(new Date().getFullYear());
  const [monthFilter, setMonthFilter] = useState<number>(0);
  const [houseFilter, setHouseFilter] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedConsumption, setSelectedConsumption] = useState<Consumption | null>(null);
  const [showConsumptionModal, setShowConsumptionModal] = useState(false);

  useEffect(() => {
    loadConsumptions();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, yearFilter, monthFilter, houseFilter, pagination.page, pagination.limit]);

  const loadConsumptions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getConsumptions({
        page: pagination.page,
        limit: pagination.limit,
        annee: yearFilter,
        mois: monthFilter || undefined,
        maisonId: houseFilter !== 'all' ? houseFilter : undefined,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setConsumptions(response.data.consommations);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des consommations');
      console.error('Erreur consommations:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Erreur stats:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthYear = (mois: number, annee: number) => {
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${monthNames[mois - 1]} ${annee}`;
  };

  const formatAdresse = (adresse: string | { rue?: string; ville?: string; codePostal?: string; pays?: string; }) => {
    if (typeof adresse === 'string') {
      return adresse;
    }
    
    if (!adresse || typeof adresse !== 'object') {
      return 'Non renseignée';
    }

    const parts = [
      adresse.rue,
      adresse.ville,
      adresse.codePostal,
      adresse.pays
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : 'Non renseignée';
  };

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
  };

  const getAvatarColor = (prenom: string, nom: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
    ];
    const index = ((prenom?.charCodeAt(0) || 0) + (nom?.charCodeAt(0) || 0)) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      'payee': { label: 'Payée', color: 'bg-green-100 text-green-700 border-green-200' },
      'en_attente': { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      'en_retard': { label: 'En retard', color: 'bg-red-100 text-red-700 border-red-200' },
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig] || statusConfig.en_attente;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleViewConsumption = (consumption: Consumption) => {
    setSelectedConsumption(consumption);
    setShowConsumptionModal(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedConsumptions = [...consumptions].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let comparison = 0;
    switch (sortColumn) {
      case 'resident':
        comparison = `${a.residentId.prenom} ${a.residentId.nom}`.localeCompare(`${b.residentId.prenom} ${b.residentId.nom}`);
        break;
      case 'maison':
        comparison = a.maisonId.nomMaison.localeCompare(b.maisonId.nomMaison);
        break;
      case 'kwh':
        comparison = a.kwh - b.kwh;
        break;
      case 'montant':
        comparison = a.montant - b.montant;
        break;
      case 'periode':
        const dateA = new Date(a.annee, a.mois - 1);
        const dateB = new Date(b.annee, b.mois - 1);
        comparison = dateA.getTime() - dateB.getTime();
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

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Generate month options
  const monthOptions = [];
  for (let i = 12; i >= 1; i--) {
    const date = new Date(yearFilter, i - 1);
    monthOptions.push({
      value: i,
      label: formatMonthYear(i, yearFilter)
    });
  }

  if (loading && consumptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Chargement des consommations...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Gestion des consommations</h1>
          <p className="text-sm text-gray-500 text-left">Suivez et analysez les consommations électriques</p>
        </div>
        <AdminButton 
          variant="outline"
          onClick={() => {}}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exporter
        </AdminButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.consommations?.totalKwh?.toFixed(1) || '0'} kWh
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Consommation totale</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              +12%
            </span>
            <span className="text-xs text-gray-500">ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.maisons?.total || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Maisons actives</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              +3
            </span>
            <span className="text-xs text-gray-500">nouvelles</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.utilisateurs?.residents || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Résidents actifs</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              +8
            </span>
            <span className="text-xs text-gray-500">nouveaux</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.consommations?.total || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Relevés ce mois</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">
              -5%
            </span>
            <span className="text-xs text-gray-500">vs mois dernier</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <AdminCard className="bg-white border border-gray-200 mb-6">
        <AdminCardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une consommation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm"
              />
            </div>
            
            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select 
                value={yearFilter}
                onChange={(e) => setYearFilter(Number(e.target.value))}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm bg-white min-w-[120px]"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <select 
              value={monthFilter}
              onChange={(e) => setMonthFilter(Number(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm bg-white min-w-[180px]"
            >
              <option value="0">Tous les mois</option>
              {monthOptions.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchQuery || monthFilter !== 0 || houseFilter !== 'all') && (
              <AdminButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setMonthFilter(0);
                  setHouseFilter('all');
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </AdminButton>
            )}
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Consumptions Table */}
      <AdminCard className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <AdminCardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <AdminCardTitle className="text-xl font-bold text-gray-900 text-left">Liste des consommations</AdminCardTitle>
              <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
                {pagination.total} consommation{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
              </AdminCardDescription>
            </div>
          </div>
        </AdminCardHeader>
        
        <AdminCardContent className="p-0">
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
              <AdminButton
                variant="outline"
                size="sm"
                onClick={loadConsumptions}
                className="mt-2"
              >
                Réessayer
              </AdminButton>
            </div>
          )}

          {!loading && sortedConsumptions.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Aucune consommation trouvée</p>
              <p className="text-xs text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}

          {sortedConsumptions.length > 0 && (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('resident')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Résident
                        <SortIcon column="resident" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('maison')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Maison
                        <SortIcon column="maison" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('kwh')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Consommation
                        <SortIcon column="kwh" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('periode')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Période
                        <SortIcon column="periode" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('montant')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Montant
                        <SortIcon column="montant" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <span className="flex items-center gap-2">Statut</span>
                    </AdminTableHead>
                    <AdminTableHead className="text-right">Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedConsumptions.map((consumption, index) => (
                    <AdminTableRow 
                      key={consumption._id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(consumption.residentId.prenom, consumption.residentId.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                            {getInitials(consumption.residentId.prenom, consumption.residentId.nom)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {consumption.residentId.prenom} {consumption.residentId.nom}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" />
                              {consumption.residentId.email}
                            </div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {consumption.maisonId.nomMaison}
                          </span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {consumption.kwh} kWh
                          </span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatMonthYear(consumption.mois, consumption.annee)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            {consumption.montant.toFixed(0)} FCFA
                          </span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getStatusBadge(consumption.statut)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewConsumption(consumption)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </AdminTableBody>
              </AdminTable>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pagination.page} sur {pagination.pages}
              </div>
              <div className="flex items-center gap-2">
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="flex items-center gap-1"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </AdminButton>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>

      {/* Consumption Details Modal */}
      <AdminModal
        isOpen={showConsumptionModal}
        onClose={() => setShowConsumptionModal(false)}
        title="Détails de la consommation"
        size="lg"
      >
        {selectedConsumption && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md">
                <Zap className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 text-left">Consommation électrique</h3>
                <p className="text-sm text-gray-500 text-left mt-1">
                  {formatMonthYear(selectedConsumption.mois, selectedConsumption.annee)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(selectedConsumption.statut)}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Résident */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Résident</label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(selectedConsumption.residentId.prenom, selectedConsumption.residentId.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                      {getInitials(selectedConsumption.residentId.prenom, selectedConsumption.residentId.nom)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedConsumption.residentId.prenom} {selectedConsumption.residentId.nom}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {selectedConsumption.residentId.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maison */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Home className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Maison</label>
                  <div className="text-sm font-medium text-gray-900 mt-1">{selectedConsumption.maisonId.nomMaison}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {formatAdresse(selectedConsumption.maisonId.adresse)}
                  </div>
                </div>
              </div>

              {/* Consommation */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Zap className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Consommation</label>
                  <span className="text-sm font-medium text-gray-900">{selectedConsumption.kwh} kWh</span>
                </div>
              </div>

              {/* Montant */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Montant</label>
                  <span className="text-sm font-medium text-gray-900">{selectedConsumption.montant.toFixed(0)} FCFA</span>
                </div>
              </div>

              {/* Date de création */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Créée le</label>
                  <span className="text-sm font-medium text-gray-900">{formatDate(selectedConsumption.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <AdminButton
                variant="outline"
                onClick={() => setShowConsumptionModal(false)}
              >
                Fermer
              </AdminButton>
              <AdminButton>
                <Edit className="w-4 h-4 mr-2" />
                Modifier la consommation
              </AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default ConsumptionManagement;
