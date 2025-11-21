import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
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
  Mail,
  Smartphone,
  Bell,
  MessageCircle,
  Calendar
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Message {
  _id: string;
  sujet: string;
  contenu: string;
  type: string;
  statut: string;
  expediteur: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  destinataire: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  dateEnvoi: string;
  dateLecture?: string;
  createdAt: string;
}

const MessagingManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
  const [stats, setStats] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    loadMessages();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, typeFilter, statusFilter, pagination.page, pagination.limit]);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getMessages({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setMessages(response.data.messages || []);
        setPagination(response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      console.error('Erreur messages:', err);
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
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <Smartphone className="w-4 h-4" />;
      case 'push':
        return <Bell className="w-4 h-4" />;
      case 'chat':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: { [key: string]: { label: string; bg: string; text: string } } = {
      'email': {
        label: 'Email',
        bg: 'bg-blue-100',
        text: 'text-blue-700'
      },
      'sms': {
        label: 'SMS',
        bg: 'bg-green-100',
        text: 'text-green-700'
      },
      'push': {
        label: 'Push',
        bg: 'bg-purple-100',
        text: 'text-purple-700'
      },
      'chat': {
        label: 'Chat',
        bg: 'bg-indigo-100',
        text: 'text-indigo-700'
      }
    };

    const config = typeConfig[type] || typeConfig['email'];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
        {getTypeIcon(type)}
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

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchQuery === '' || 
      msg.sujet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.contenu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${msg.expediteur.prenom} ${msg.expediteur.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${msg.destinataire.prenom} ${msg.destinataire.nom}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || msg.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || msg.statut === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortColumn) {
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'expediteur':
        aValue = `${a.expediteur.prenom} ${a.expediteur.nom}`;
        bValue = `${b.expediteur.prenom} ${b.expediteur.nom}`;
        break;
      case 'destinataire':
        aValue = `${a.destinataire.prenom} ${a.destinataire.nom}`;
        bValue = `${b.destinataire.prenom} ${b.destinataire.nom}`;
        break;
      case 'sujet':
        aValue = a.sujet;
        bValue = b.sujet;
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

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  if (loading && messages.length === 0) {
    return (
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-sm text-gray-500">Gérez la communication avec les utilisateurs</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Messages envoyés</p>
                <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+23% ce mois</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Taux de livraison</p>
                <p className="text-3xl font-bold text-gray-900">98.5%</p>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Utilisateurs actifs</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.utilisateurs?.total || '0'}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>+12 nouveaux</span>
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
                <p className="text-sm font-medium text-gray-600 mb-1">Temps de réponse</p>
                <p className="text-3xl font-bold text-gray-900">2.3s</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Rapide</span>
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
            placeholder="Rechercher un message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filtrer par type de message"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les types</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
            <option value="chat">Chat</option>
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
        </div>
        </AdminCardContent>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="text-left">Liste des messages</AdminCardTitle>
          <AdminCardDescription className="text-left">
            {pagination.total} message(s) trouvé(s)
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
          ) : sortedMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun message trouvé</h3>
              <p className="text-gray-500">Il n'y a actuellement aucun message dans la base de données.</p>
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
                      onClick={() => handleSort('expediteur')}
                    >
                      <div className="flex items-center gap-2">
                        Expéditeur
                        <SortIcon column="expediteur" />
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
                      onClick={() => handleSort('sujet')}
                    >
                      <div className="flex items-center gap-2">
                        Sujet
                        <SortIcon column="sujet" />
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
                  {sortedMessages.map((message) => (
                    <AdminTableRow key={message._id}>
                      <AdminTableCell>
                        {getTypeBadge(message.type)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getAvatarColor(message.expediteur.prenom, message.expediteur.nom)} flex items-center justify-center text-white font-semibold text-sm`}>
                            {getInitials(message.expediteur.prenom, message.expediteur.nom)}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {message.expediteur.prenom} {message.expediteur.nom}
                            </div>
                            <div className="text-sm text-gray-500">{message.expediteur.email}</div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getAvatarColor(message.destinataire.prenom, message.destinataire.nom)} flex items-center justify-center text-white font-semibold text-sm`}>
                            {getInitials(message.destinataire.prenom, message.destinataire.nom)}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {message.destinataire.prenom} {message.destinataire.nom}
                            </div>
                            <div className="text-sm text-gray-500">{message.destinataire.email}</div>
          </div>
        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{message.sujet}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{message.contenu.substring(0, 50)}...</div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatDateShort(message.dateEnvoi)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getStatusBadge(message.statut)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <AdminButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewMessage(message)}
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

      {/* Message Details Modal */}
      {showMessageModal && selectedMessage && (
        <AdminModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          title="Détails du message"
        >
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Type de message */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Type de message</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-start">
                  {getTypeBadge(selectedMessage.type)}
                </div>
              </div>
            </div>

            {/* Expéditeur et Destinataire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Expéditeur</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedMessage.expediteur.prenom, selectedMessage.expediteur.nom)} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                      {getInitials(selectedMessage.expediteur.prenom, selectedMessage.expediteur.nom)}
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-base mb-1">
                        {selectedMessage.expediteur.prenom} {selectedMessage.expediteur.nom}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="break-words">{selectedMessage.expediteur.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Destinataire</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedMessage.destinataire.prenom, selectedMessage.destinataire.nom)} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                      {getInitials(selectedMessage.destinataire.prenom, selectedMessage.destinataire.nom)}
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-base mb-1">
                        {selectedMessage.destinataire.prenom} {selectedMessage.destinataire.nom}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="break-words">{selectedMessage.destinataire.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sujet */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Sujet</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="font-semibold text-gray-900 text-base text-left break-words">{selectedMessage.sujet}</div>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Contenu</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[120px]">
                <div className="text-gray-900 whitespace-pre-wrap text-left break-words leading-relaxed">
                  {selectedMessage.contenu}
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
                    <span>{formatDate(selectedMessage.dateEnvoi)}</span>
                  </div>
                </div>
              </div>
              {selectedMessage.dateLecture && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Date de lecture</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 text-left">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formatDate(selectedMessage.dateLecture)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Statut */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Statut</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-start">
                  {getStatusBadge(selectedMessage.statut)}
                </div>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default MessagingManagement;
