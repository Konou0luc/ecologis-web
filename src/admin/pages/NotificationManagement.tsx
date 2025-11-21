import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search, 
  Eye, 
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  AlertCircle,
  Mail,
  Calendar
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Notification {
  _id: string;
  titre: string;
  contenu: string;
  type: string;
  statut: string;
  destinataire: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  dateEnvoi: string;
  dateLecture?: string;
  priorite: string;
  createdAt: string;
}

const NotificationManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    loadNotifications();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, typeFilter, statusFilter, priorityFilter, pagination.page, pagination.limit]);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getNotifications({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setNotifications(response.data.notifications || []);
        setPagination(response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des notifications');
      console.error('Erreur notifications:', err);
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
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      'envoye': {
        label: 'Envoyé',
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle
      },
      'en_attente': {
        label: 'En attente',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock
      },
      'echec': {
        label: 'Échec',
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle
      },
      'lu': {
        label: 'Lu',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: CheckCircle
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Bell className="w-4 h-4" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: { [key: string]: { label: string; bg: string; text: string } } = {
      'system': {
        label: 'Système',
        bg: 'bg-gray-100',
        text: 'text-gray-700'
      },
      'alert': {
        label: 'Alerte',
        bg: 'bg-red-100',
        text: 'text-red-700'
      },
      'info': {
        label: 'Info',
        bg: 'bg-blue-100',
        text: 'text-blue-700'
      },
      'warning': {
        label: 'Avertissement',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700'
      },
      'success': {
        label: 'Succès',
        bg: 'bg-green-100',
        text: 'text-green-700'
      }
    };

    const config = typeConfig[type] || typeConfig['system'];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
        {getTypeIcon(type)}
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: { [key: string]: { label: string; bg: string; text: string } } = {
      'basse': {
        label: 'Basse',
        bg: 'bg-gray-100',
        text: 'text-gray-700'
      },
      'normale': {
        label: 'Normale',
        bg: 'bg-blue-100',
        text: 'text-blue-700'
      },
      'haute': {
        label: 'Haute',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700'
      },
      'critique': {
        label: 'Critique',
        bg: 'bg-red-100',
        text: 'text-red-700'
      }
    };

    const config = priorityConfig[priority] || priorityConfig['normale'];

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

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = searchQuery === '' || 
      notif.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.contenu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${notif.destinataire.prenom} ${notif.destinataire.nom}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notif.statut === statusFilter;
    const matchesPriority = priorityFilter === 'all' || notif.priorite === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortColumn) {
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'destinataire':
        aValue = `${a.destinataire.prenom} ${a.destinataire.nom}`;
        bValue = `${b.destinataire.prenom} ${b.destinataire.nom}`;
        break;
      case 'titre':
        aValue = a.titre;
        bValue = b.titre;
        break;
      case 'priorite':
        aValue = a.priorite;
        bValue = b.priorite;
        break;
      case 'dateEnvoi':
        aValue = new Date(a.dateEnvoi).getTime();
        bValue = new Date(b.dateEnvoi).getTime();
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

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  if (loading && notifications.length === 0) {
    return (
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-sm text-gray-500">Configurez et gérez les notifications système</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Notifications envoyées</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+34% ce mois</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Taux de livraison</p>
                <p className="text-3xl font-bold text-gray-900">96.2%</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Excellent</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Utilisateurs notifiés</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.utilisateurs?.total || '0'}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+5% ce mois</span>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Temps de traitement</p>
                <p className="text-3xl font-bold text-gray-900">1.8s</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Rapide</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
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
                placeholder="Rechercher une notification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filtrer par type"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les types</option>
              <option value="system">Système</option>
              <option value="alert">Alerte</option>
              <option value="info">Info</option>
              <option value="warning">Avertissement</option>
              <option value="success">Succès</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filtrer par statut"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="envoye">Envoyé</option>
              <option value="en_attente">En attente</option>
              <option value="echec">Échec</option>
              <option value="lu">Lu</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filtrer par priorité"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Toutes les priorités</option>
              <option value="basse">Basse</option>
              <option value="normale">Normale</option>
              <option value="haute">Haute</option>
              <option value="critique">Critique</option>
            </select>
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="text-left">Liste des notifications</AdminCardTitle>
          <AdminCardDescription className="text-left">
            {pagination.total} notification(s) trouvée(s)
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
          ) : sortedNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification trouvée</h3>
              <p className="text-gray-500">Il n'y a actuellement aucune notification dans la base de données.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
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
                      onClick={() => handleSort('destinataire')}
                    >
                      <div className="flex items-center gap-2">
                        Destinataire
                        <SortIcon column="destinataire" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('titre')}
                    >
                      <div className="flex items-center gap-2">
                        Titre
                        <SortIcon column="titre" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('priorite')}
                    >
                      <div className="flex items-center gap-2">
                        Priorité
                        <SortIcon column="priorite" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('dateEnvoi')}
                    >
                      <div className="flex items-center gap-2">
                        Date
                        <SortIcon column="dateEnvoi" />
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
                  {sortedNotifications.map((notification) => (
                    <AdminTableRow key={notification._id}>
                      <AdminTableCell>
                        {getTypeBadge(notification.type)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getAvatarColor(notification.destinataire.prenom, notification.destinataire.nom)} flex items-center justify-center text-white font-semibold text-sm`}>
                            {getInitials(notification.destinataire.prenom, notification.destinataire.nom)}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {notification.destinataire.prenom} {notification.destinataire.nom}
                            </div>
                            <div className="text-sm text-gray-500">{notification.destinataire.email}</div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{notification.titre}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{notification.contenu.substring(0, 50)}...</div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getPriorityBadge(notification.priorite)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatDateShort(notification.dateEnvoi)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getStatusBadge(notification.statut)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <AdminButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewNotification(notification)}
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

      {/* Notification Details Modal */}
      {showNotificationModal && selectedNotification && (
        <AdminModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          title="Détails de la notification"
        >
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Type</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-start">
                  {getTypeBadge(selectedNotification.type)}
                </div>
              </div>
            </div>

            {/* Destinataire */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Destinataire</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedNotification.destinataire.prenom, selectedNotification.destinataire.nom)} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                    {getInitials(selectedNotification.destinataire.prenom, selectedNotification.destinataire.nom)}
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-base mb-1">
                      {selectedNotification.destinataire.prenom} {selectedNotification.destinataire.nom}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="break-words">{selectedNotification.destinataire.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Titre */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Titre</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="font-semibold text-gray-900 text-base text-left break-words">{selectedNotification.titre}</div>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Contenu</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[120px]">
                <div className="text-gray-900 whitespace-pre-wrap text-left break-words leading-relaxed">
                  {selectedNotification.contenu}
                </div>
              </div>
            </div>

            {/* Priorité et Statut */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Priorité</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-start">
                    {getPriorityBadge(selectedNotification.priorite)}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Statut</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-start">
                    {getStatusBadge(selectedNotification.statut)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Date d'envoi</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-900 text-left">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatDate(selectedNotification.dateEnvoi)}</span>
                  </div>
                </div>
              </div>
              {selectedNotification.dateLecture && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Date de lecture</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 text-left">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formatDate(selectedNotification.dateLecture)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default NotificationManagement;
