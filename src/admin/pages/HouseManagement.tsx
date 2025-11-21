import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Home,
  MapPin,
  Users,
  Zap,
  DollarSign,
  Calendar,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Mail,
  User,
  Building
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface House {
  _id: string;
  nomMaison: string;
  adresse: string | {
    rue?: string;
    ville?: string;
    codePostal?: string;
    pays?: string;
  };
  proprietaireId: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  listeResidents: Array<{
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  }>;
  createdAt: string;
}

const HouseManagement: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showHouseModal, setShowHouseModal] = useState(false);

  useEffect(() => {
    loadHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pagination.page]);

  const loadHouses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getHouses({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setHouses(response.data.maisons);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des maisons');
      console.error('Erreur houses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHouse = async (houseId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette maison ?')) {
      return;
    }

    try {
      const response = await apiService.deleteHouse(houseId);
      
      if (response.error) {
        alert('Erreur lors de la suppression: ' + response.error);
      } else {
        loadHouses();
      }
    } catch (err) {
      alert('Erreur lors de la suppression de la maison');
      console.error('Erreur suppression:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const handleViewHouse = (house: House) => {
    setSelectedHouse(house);
    setShowHouseModal(true);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedHouses = [...houses].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let comparison = 0;
    switch (sortColumn) {
      case 'nomMaison':
        comparison = a.nomMaison.localeCompare(b.nomMaison);
        break;
      case 'proprietaire':
        const propA = a.proprietaireId ? `${a.proprietaireId.prenom} ${a.proprietaireId.nom}` : '';
        const propB = b.proprietaireId ? `${b.proprietaireId.prenom} ${b.proprietaireId.nom}` : '';
        comparison = propA.localeCompare(propB);
        break;
      case 'residents':
        comparison = (a.listeResidents?.length || 0) - (b.listeResidents?.length || 0);
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

  if (loading && houses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Chargement des maisons...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Gestion des maisons</h1>
          <p className="text-sm text-gray-500 text-left">Gérez toutes les propriétés de la plateforme</p>
        </div>
        <AdminButton 
          onClick={() => {}}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nouvelle maison
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
                placeholder="Rechercher une maison..."
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

      {/* Houses Table */}
      <AdminCard className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <AdminCardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <AdminCardTitle className="text-xl font-bold text-gray-900 text-left">Liste des maisons</AdminCardTitle>
              <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
                {pagination.total} maison{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
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
                onClick={loadHouses}
                className="mt-2"
              >
                Réessayer
              </AdminButton>
            </div>
          )}

          {!loading && sortedHouses.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Aucune maison trouvée</p>
              <p className="text-xs text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}

          {sortedHouses.length > 0 && (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('nomMaison')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Maison
                        <SortIcon column="nomMaison" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <span className="flex items-center gap-2">Adresse</span>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('proprietaire')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Propriétaire
                        <SortIcon column="proprietaire" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('residents')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Résidents
                        <SortIcon column="residents" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('createdAt')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Créée le
                        <SortIcon column="createdAt" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead className="text-right">Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedHouses.map((house, index) => (
                    <AdminTableRow 
                      key={house._id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-sm">
                            <Home className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {house.nomMaison}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="max-w-xs truncate">{formatAdresseCourte(house.adresse)}</span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {house.proprietaireId ? (
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(house.proprietaireId.prenom, house.proprietaireId.nom)} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
                              {getInitials(house.proprietaireId.prenom, house.proprietaireId.nom)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {house.proprietaireId.prenom} {house.proprietaireId.nom}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {house.proprietaireId.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Non renseigné</span>
                        )}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {house.listeResidents?.length || 0}
                          </span>
                          {house.listeResidents && house.listeResidents.length > 0 && (
                            <span className="text-xs text-gray-500">
                              résident{house.listeResidents.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(house.createdAt)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewHouse(house)}
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
                            onClick={() => handleDeleteHouse(house._id)}
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

      {/* House Details Modal */}
      <AdminModal
        isOpen={showHouseModal}
        onClose={() => setShowHouseModal(false)}
        title="Détails de la maison"
        size="lg"
      >
        {selectedHouse && (
          <div className="space-y-6">
            {/* House Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <Home className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 text-left">{selectedHouse.nomMaison}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1 text-left">
                  <MapPin className="w-4 h-4" />
                  {formatAdresseCourte(selectedHouse.adresse)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Propriétaire */}
              {selectedHouse.proprietaireId && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Propriétaire</label>
                    <div className="flex items-center gap-3 mt-2">
                      <div className={`w-10 h-10 rounded-full ${getAvatarColor(selectedHouse.proprietaireId.prenom, selectedHouse.proprietaireId.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                        {getInitials(selectedHouse.proprietaireId.prenom, selectedHouse.proprietaireId.nom)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {selectedHouse.proprietaireId.prenom} {selectedHouse.proprietaireId.nom}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {selectedHouse.proprietaireId.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Adresse */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Adresse complète</label>
                  <span className="text-sm font-medium text-gray-900">{formatAdresse(selectedHouse.adresse)}</span>
                </div>
              </div>

              {/* Résidents */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">
                    Résidents ({selectedHouse.listeResidents?.length || 0})
                  </label>
                  {selectedHouse.listeResidents && selectedHouse.listeResidents.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {selectedHouse.listeResidents.map((resident) => (
                        <div key={resident._id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                          <div className={`w-8 h-8 rounded-full ${getAvatarColor(resident.prenom, resident.nom)} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
                            {getInitials(resident.prenom, resident.nom)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {resident.prenom} {resident.nom}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {resident.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Aucun résident</span>
                  )}
                </div>
              </div>

              {/* Date de création */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Créée le</label>
                  <span className="text-sm font-medium text-gray-900">{formatDate(selectedHouse.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <AdminButton
                variant="outline"
                onClick={() => setShowHouseModal(false)}
              >
                Fermer
              </AdminButton>
              <AdminButton>
                <Edit className="w-4 h-4 mr-2" />
                Modifier la maison
              </AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default HouseManagement;
