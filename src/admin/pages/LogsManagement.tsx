import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Search, 
  Eye, 
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  XCircle,
  User
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Log {
  _id: string;
  level: string;
  message: string;
  module: string;
  action: string;
  user?: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  ip?: string;
  userAgent?: string;
  createdAt: string;
}

const LogsManagement: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [stats, setStats] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    loadLogs();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, levelFilter, dateFrom, dateTo, pagination.page, pagination.limit]);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getLogs({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        level: levelFilter !== 'all' ? levelFilter : undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setLogs(response.data.logs);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des logs');
      console.error('Erreur logs:', err);
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
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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

  const getLevelBadge = (level: string) => {
    const levelConfig: { [key: string]: { label: string; bg: string; text: string; icon: any } } = {
      'debug': {
        label: 'Debug',
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        icon: Info
      },
      'info': {
        label: 'Info',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: CheckCircle
      },
      'warn': {
        label: 'Warning',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: AlertTriangle
      },
      'error': {
        label: 'Error',
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: AlertCircle
      },
      'fatal': {
        label: 'Fatal',
        bg: 'bg-red-200',
        text: 'text-red-800',
        icon: XCircle
      }
    };

    const config = levelConfig[level] || levelConfig['info'];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.text}`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'debug':
        return <Info className="w-4 h-4" />;
      case 'info':
        return <CheckCircle className="w-4 h-4" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'fatal':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
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

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user && `${log.user.prenom} ${log.user.nom}`.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortColumn) {
      case 'level':
        aValue = a.level;
        bValue = b.level;
        break;
      case 'module':
        aValue = a.module;
        bValue = b.module;
        break;
      case 'message':
        aValue = a.message;
        bValue = b.message;
        break;
      case 'user':
        aValue = a.user ? `${a.user.prenom} ${a.user.nom}` : '';
        bValue = b.user ? `${b.user.prenom} ${b.user.nom}` : '';
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleViewLog = (log: Log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  if (loading && logs.length === 0) {
    return (
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Logs</h1>
          <p className="text-sm text-gray-500">Surveillez et analysez l'activité du système</p>
        </div>
        <AdminButton variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </AdminButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Logs aujourd'hui</p>
                <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Système stable</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Erreurs détectées</p>
                <p className="text-3xl font-bold text-gray-900">{logs.filter(l => l.level === 'error' || l.level === 'fatal').length}</p>
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>À surveiller</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Uptime système</p>
                <p className="text-3xl font-bold text-gray-900">99.8%</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Excellent</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </AdminCardContent>
        </AdminCard>

        <AdminCard>
          <AdminCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Temps de réponse</p>
                <p className="text-3xl font-bold text-gray-900">2.1s</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Rapide</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Info className="w-6 h-6 text-purple-600" />
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
                placeholder="Rechercher dans les logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              aria-label="Filtrer par niveau"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Tous les niveaux</option>
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
              <option value="fatal">Fatal</option>
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Date de début"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Date de fin"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Table */}
      <AdminCard>
        <AdminCardHeader>
          <AdminCardTitle className="text-left">Liste des logs</AdminCardTitle>
          <AdminCardDescription className="text-left">
            {pagination.total} log(s) trouvé(s)
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
          ) : sortedLogs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun log trouvé</h3>
              <p className="text-gray-500">Il n'y a actuellement aucun log dans la base de données.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('level')}
                    >
                      <div className="flex items-center gap-2">
                        Niveau
                        <SortIcon column="level" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('module')}
                    >
                      <div className="flex items-center gap-2">
                        Module
                        <SortIcon column="module" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('message')}
                    >
                      <div className="flex items-center gap-2">
                        Message
                        <SortIcon column="message" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('user')}
                    >
                      <div className="flex items-center gap-2">
                        Utilisateur
                        <SortIcon column="user" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-2">
                        Date
                        <SortIcon column="createdAt" />
                      </div>
                    </AdminTableHead>
                    <AdminTableHead>Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedLogs.map((log) => (
                    <AdminTableRow key={log._id}>
                      <AdminTableCell>
                        {getLevelBadge(log.level)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{log.module}</div>
                          <div className="text-sm text-gray-500">{log.action}</div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-left">
                          <div className="text-gray-900">{log.message}</div>
                          {log.ip && (
                            <div className="text-sm text-gray-500 mt-1">IP: {log.ip}</div>
                          )}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {log.user ? (
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${getAvatarColor(log.user.prenom, log.user.nom)} flex items-center justify-center text-white font-semibold text-sm`}>
                              {getInitials(log.user.prenom, log.user.nom)}
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-gray-900">
                                {log.user.prenom} {log.user.nom}
                              </div>
                              <div className="text-sm text-gray-500">{log.user.email}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">Système</span>
                        )}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatDateShort(log.createdAt)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <AdminButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewLog(log)}
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

      {/* Log Details Modal */}
      {showLogModal && selectedLog && (
        <AdminModal
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          title="Détails du log"
        >
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Niveau */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Niveau</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-start">
                  {getLevelBadge(selectedLog.level)}
                </div>
              </div>
            </div>

            {/* Module et Action */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Module</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="font-semibold text-gray-900 text-left">{selectedLog.module}</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Action</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="font-semibold text-gray-900 text-left">{selectedLog.action}</div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Message</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[80px]">
                <div className="text-gray-900 whitespace-pre-wrap text-left break-words leading-relaxed">
                  {selectedLog.message}
                </div>
              </div>
            </div>

            {/* Utilisateur */}
            {selectedLog.user && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Utilisateur</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg ${getAvatarColor(selectedLog.user.prenom, selectedLog.user.nom)} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                      {getInitials(selectedLog.user.prenom, selectedLog.user.nom)}
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-base mb-1">
                        {selectedLog.user.prenom} {selectedLog.user.nom}
                      </div>
                      <div className="text-sm text-gray-600">{selectedLog.user.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Informations techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedLog.ip && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Adresse IP</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-gray-900 text-left">{selectedLog.ip}</div>
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">Date</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-900 text-left">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{formatDate(selectedLog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedLog.userAgent && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2.5 text-left">User Agent</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-gray-900 text-left break-words text-sm">{selectedLog.userAgent}</div>
                </div>
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default LogsManagement;
