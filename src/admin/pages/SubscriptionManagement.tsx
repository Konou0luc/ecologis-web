import React, { useState, useEffect } from 'react';
import { 
  CreditCard,
  DollarSign,
  Users,
  Clock,
  Search,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Home,
  Mail,
  Phone,
  User
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Subscription {
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
    adresse?: string | {
      rue?: string;
      ville?: string;
      codePostal?: string;
      pays?: string;
    } | null;
  };
  typeAbonnement: string;
  montant: number;
  dateDebut: string;
  dateFin: string;
  statut: string;
  createdAt: string;
}

const SubscriptionManagement: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    loadSubscriptions();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, typeFilter, pagination.page, pagination.limit]);

  const loadSubscriptions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Pour l'instant, on utilise une structure similaire aux autres pages
      // Si l'API n'a pas encore getSubscriptions, on peut utiliser getResidents ou créer une méthode
      // Ici, je vais créer une structure qui fonctionne avec les données disponibles
      const response = await apiService.getResidents({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        // Pour l'instant, on simule des abonnements basés sur les résidents
        // Dans une vraie implémentation, on utiliserait getSubscriptions
        const mockSubscriptions: Subscription[] = response.data.residents?.map((resident: any) => ({
          _id: `sub_${resident._id}`,
          residentId: resident,
          maisonId: resident.maisonId || { _id: '', nomMaison: 'N/A', adresse: '' },
          typeAbonnement: 'mensuel',
          montant: 5000,
          dateDebut: new Date().toISOString(),
          dateFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          statut: 'actif',
          createdAt: resident.createdAt || new Date().toISOString()
        })) || [];
        
        setSubscriptions(mockSubscriptions);
        setPagination({
          ...pagination,
          total: response.data.pagination?.total || 0,
          pages: response.data.pagination?.pages || 0
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des abonnements');
      console.error('Erreur abonnements:', err);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (prenom: string, nom: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = (prenom.charCodeAt(0) + nom.charCodeAt(0)) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { label: string; bg: string; text: string; icon: any } } = {
      'actif': {
        label: 'Actif',
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle
      },
      'expire': {
        label: 'Expiré',
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle
      },
      'suspendu': {
        label: 'Suspendu',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: AlertCircle
      },
      'en_attente': {
        label: 'En attente',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: Clock
      }
    };

    const config = statusConfig[status] || statusConfig['en_attente'];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: { [key: string]: { label: string; bg: string; text: string } } = {
      'mensuel': {
        label: 'Mensuel',
        bg: 'bg-blue-100',
        text: 'text-blue-700'
      },
      'annuel': {
        label: 'Annuel',
        bg: 'bg-purple-100',
        text: 'text-purple-700'
      },
      'trimestriel': {
        label: 'Trimestriel',
        bg: 'bg-indigo-100',
        text: 'text-indigo-700'
      }
    };

    const config = typeConfig[type] || typeConfig['mensuel'];

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="w-4 h-4 text-gray-400 opacity-0" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-gray-600" />
      : <ChevronDown className="w-4 h-4 text-gray-600" />;
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = searchQuery === '' || 
      `${sub.residentId.prenom} ${sub.residentId.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.residentId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.maisonId.nomMaison.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sub.statut === statusFilter;
    const matchesType = typeFilter === 'all' || sub.typeAbonnement === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortColumn) {
      case 'resident':
        aValue = `${a.residentId.prenom} ${a.residentId.nom}`;
        bValue = `${b.residentId.prenom} ${b.residentId.nom}`;
        break;
      case 'maison':
        aValue = a.maisonId.nomMaison;
        bValue = b.maisonId.nomMaison;
        break;
      case 'type':
        aValue = a.typeAbonnement;
        bValue = b.typeAbonnement;
        break;
      case 'montant':
        aValue = a.montant;
        bValue = b.montant;
        break;
      case 'dateDebut':
        aValue = new Date(a.dateDebut).getTime();
        bValue = new Date(b.dateDebut).getTime();
        break;
      case 'statut':
        aValue = a.statut;
        bValue = b.statut;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowSubscriptionModal(true);
  };

  const formatAdresse = (adresse: string | { rue?: string; ville?: string; codePostal?: string; pays?: string; } | undefined | null) => {
    if (!adresse) {
      return 'Adresse non renseignée';
    }
    if (typeof adresse === 'string') {
      return adresse;
    }
    const parts = [];
    if (adresse.rue) parts.push(adresse.rue);
    if (adresse.codePostal) parts.push(adresse.codePostal);
    if (adresse.ville) parts.push(adresse.ville);
    if (adresse.pays) parts.push(adresse.pays);
    return parts.length > 0 ? parts.join(', ') : 'Adresse non renseignée';
  };

  if (loading && subscriptions.length === 0) {
    return (
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des abonnements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Abonnements</h1>
          <p className="text-sm text-gray-500">Gérez les abonnements et les offres de la plateforme</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Abonnements actifs</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.abonnements?.actifs || '0'}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+5 ce mois</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Revenus mensuels</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.abonnements?.revenus || 0)} FCFA</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+12% ce mois</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Résidents couverts</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.utilisateurs?.residents || '0'}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+18 nouveaux</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Expirant bientôt</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.abonnements?.expirant || '0'}</p>
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>7 jours</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>
      </div>

      {/* Filters */}
      <AdminCard className="mb-6">
        <AdminCardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un abonnement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="expire">Expiré</option>
              <option value="suspendu">Suspendu</option>
              <option value="en_attente">En attente</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les types</option>
              <option value="mensuel">Mensuel</option>
              <option value="annuel">Annuel</option>
              <option value="trimestriel">Trimestriel</option>
            </select>
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="text-left">Liste des abonnements</AdminCardTitle>
          <AdminCardDescription className="text-left">
            {pagination.total} abonnement(s) trouvé(s)
          </AdminCardDescription>
        </AdminCardHeader>
        <AdminCardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : sortedSubscriptions.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun abonnement trouvé</h3>
              <p className="text-gray-500">Modifiez vos critères de recherche</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('resident')}
                    >
                      <div className="flex items-center gap-2">
                        Résident
                        <SortIcon column="resident" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('maison')}
                    >
                      <div className="flex items-center gap-2">
                        Maison
                        <SortIcon column="maison" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center gap-2">
                        Type
                        <SortIcon column="type" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('montant')}
                    >
                      <div className="flex items-center gap-2">
                        Montant
                        <SortIcon column="montant" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('dateDebut')}
                    >
                      <div className="flex items-center gap-2">
                        Période
                        <SortIcon column="dateDebut" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('statut')}
                    >
                      <div className="flex items-center gap-2">
                        Statut
                        <SortIcon column="statut" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead>Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedSubscriptions.map((subscription) => (
                    <AdminTableRow key={subscription._id}>
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getAvatarColor(subscription.residentId.prenom, subscription.residentId.nom)} flex items-center justify-center text-white font-semibold text-sm`}>
                            {getInitials(subscription.residentId.prenom, subscription.residentId.nom)}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {subscription.residentId.prenom} {subscription.residentId.nom}
                            </div>
                            <div className="text-sm text-gray-500">{subscription.residentId.email}</div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{subscription.maisonId.nomMaison}</div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getTypeBadge(subscription.typeAbonnement)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="font-semibold text-gray-900">{formatCurrency(subscription.montant)} FCFA</div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatDate(subscription.dateDebut)} - {formatDate(subscription.dateFin)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getStatusBadge(subscription.statut)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <AdminButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSubscription(subscription)}
                        >
                          <Eye className="w-4 h-4" />
                        </AdminButton>
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </AdminTableBody>
              </AdminTable>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Page {pagination.page} sur {pagination.pages}
              </div>
              <div className="flex gap-2">
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </AdminButton>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>

      {/* Subscription Details Modal */}
      {showSubscriptionModal && selectedSubscription && (
        <AdminModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          title="Détails de l'abonnement"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-left">Résident</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedSubscription.residentId.prenom, selectedSubscription.residentId.nom)} flex items-center justify-center text-white font-semibold`}>
                    {getInitials(selectedSubscription.residentId.prenom, selectedSubscription.residentId.nom)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {selectedSubscription.residentId.prenom} {selectedSubscription.residentId.nom}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {selectedSubscription.residentId.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-left">Maison</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{selectedSubscription.maisonId?.nomMaison || 'N/A'}</div>
                    <div className="text-sm text-gray-500 mt-1">{formatAdresse(selectedSubscription.maisonId?.adresse)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 text-left">Type d'abonnement</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {getTypeBadge(selectedSubscription.typeAbonnement)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 text-left">Montant</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(selectedSubscription.montant)} FCFA</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 text-left">Date de début</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedSubscription.dateDebut)}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 text-left">Date de fin</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedSubscription.dateFin)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 text-left">Statut</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {getStatusBadge(selectedSubscription.statut)}
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default SubscriptionManagement;
