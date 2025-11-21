import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Calendar,
  Home,
  Zap,
  Receipt,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Mail
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Resident {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  maison?: {
    _id: string;
    nomMaison: string;
    adresse: string | {
      rue?: string;
      ville?: string;
      codePostal?: string;
      pays?: string;
    };
  };
  statistiques: {
    totalKwh: number;
    totalFactures: number;
  };
}

const ResidentManagement: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [showResidentModal, setShowResidentModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadResidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pagination.page]);

  const loadResidents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getResidents({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setResidents(response.data.residents);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des résidents');
      console.error('Erreur residents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResident = async (residentId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce résident ?')) {
      return;
    }

    try {
      const response = await apiService.deleteResident(residentId);

      if (response.error) {
        alert('Erreur lors de la suppression: ' + response.error);
      } else {
        loadResidents();
      }
    } catch (err) {
      alert('Erreur lors de la suppression du résident');
      console.error('Erreur suppression:', err);
    }
  };

  const getStatusBadge = (resident: Resident) => {
    const hasRecentActivity = resident.lastLogin && 
      new Date(resident.lastLogin).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 jours

    if (hasRecentActivity) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3" />
          Actif
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
          <XCircle className="w-3 h-3" />
          Inactif
        </span>
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  const formatAdresseCourte = (adresse: string | { rue?: string; ville?: string; codePostal?: string; pays?: string; }) => {
    if (typeof adresse === 'string') {
      return adresse.length > 30 ? adresse.substring(0, 30) + '...' : adresse;
    }
    
    if (!adresse || typeof adresse !== 'object') {
      return 'Non renseignée';
    }

    const parts = [
      adresse.ville,
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

  const handleViewResident = (resident: Resident) => {
    setSelectedResident(resident);
    setShowResidentModal(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedResidents = [...residents].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let comparison = 0;
    switch (sortColumn) {
      case 'name':
        comparison = `${a.prenom} ${a.nom}`.localeCompare(`${b.prenom} ${b.nom}`);
        break;
      case 'email':
        comparison = a.email.localeCompare(b.email);
        break;
      case 'maison':
        const maisonA = a.maison?.nomMaison || '';
        const maisonB = b.maison?.nomMaison || '';
        comparison = maisonA.localeCompare(maisonB);
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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

  if (loading && residents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Chargement des résidents...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Gestion des résidents</h1>
          <p className="text-sm text-gray-500 text-left">Gérez tous les résidents de la plateforme</p>
        </div>
        <AdminButton 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouveau résident
        </AdminButton>
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
                placeholder="Rechercher un résident..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm"
              />
            </div>

            {/* Clear Filters */}
            {searchQuery && (
              <AdminButton
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </AdminButton>
            )}
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Residents Table */}
      <AdminCard className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <AdminCardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <AdminCardTitle className="text-xl font-bold text-gray-900 text-left">Liste des résidents</AdminCardTitle>
              <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
                {pagination.total} résident{pagination.total > 1 ? 's' : ''} trouvé{pagination.total > 1 ? 's' : ''}
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
                onClick={loadResidents}
                className="mt-2"
              >
                Réessayer
              </AdminButton>
            </div>
          )}

          {!loading && sortedResidents.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Aucun résident trouvé</p>
              <p className="text-xs text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}

          {sortedResidents.length > 0 && (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Résident
                        <SortIcon column="name" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('email')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Email
                        <SortIcon column="email" />
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
                      <span className="flex items-center gap-2">Statistiques</span>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('createdAt')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Créé le
                        <SortIcon column="createdAt" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead className="text-right">Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedResidents.map((resident, index) => (
                    <AdminTableRow 
                      key={resident._id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(resident.prenom, resident.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                            {getInitials(resident.prenom, resident.nom)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {resident.prenom} {resident.nom}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              {resident.telephone}
                            </div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {resident.email}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {resident.maison ? (
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">
                              {resident.maison.nomMaison}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Aucune maison</span>
                        )}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {resident.statistiques.totalKwh.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-500">kWh</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {resident.statistiques.totalFactures}
                            </div>
                            <div className="text-xs text-gray-500">Factures</div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(resident.createdAt)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewResident(resident)}
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
                            onClick={() => handleDeleteResident(resident._id)}
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

      {/* Resident Details Modal */}
      <AdminModal
        isOpen={showResidentModal}
        onClose={() => setShowResidentModal(false)}
        title="Détails du résident"
        size="lg"
      >
        {selectedResident && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className={`w-16 h-16 rounded-full ${getAvatarColor(selectedResident.prenom, selectedResident.nom)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                {getInitials(selectedResident.prenom, selectedResident.nom)}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 text-left">{selectedResident.prenom} {selectedResident.nom}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1 text-left">
                  <Mail className="w-4 h-4" />
                  {selectedResident.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(selectedResident)}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Téléphone</label>
                  <span className="text-sm font-medium text-gray-900">{selectedResident.telephone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Créé le</label>
                  <span className="text-sm font-medium text-gray-900">{formatDate(selectedResident.createdAt)}</span>
                </div>
              </div>

              {selectedResident.lastLogin && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Dernière connexion</label>
                    <span className="text-sm font-medium text-gray-900">{formatDate(selectedResident.lastLogin)}</span>
                  </div>
                </div>
              )}

              {selectedResident.maison && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Home className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Maison</label>
                    <span className="text-sm font-medium text-gray-900">{selectedResident.maison.nomMaison}</span>
                  </div>
                </div>
              )}

              {selectedResident.maison && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Adresse</label>
                    <span className="text-sm font-medium text-gray-900">{formatAdresse(selectedResident.maison.adresse)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 text-left">Statistiques</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{selectedResident.statistiques.totalKwh.toFixed(1)}</div>
                    <div className="text-xs text-gray-500">kWh</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{selectedResident.statistiques.totalFactures}</div>
                    <div className="text-xs text-gray-500">Factures</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{(selectedResident.statistiques.totalKwh * 0.15).toFixed(0)}</div>
                    <div className="text-xs text-gray-500">FCFA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <AdminButton
                variant="outline"
                onClick={() => setShowResidentModal(false)}
              >
                Fermer
              </AdminButton>
              <AdminButton>
                <Edit className="w-4 h-4 mr-2" />
                Modifier le résident
              </AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default ResidentManagement;
