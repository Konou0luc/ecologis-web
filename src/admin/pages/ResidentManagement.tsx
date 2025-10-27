import React, { useState, useEffect, useCallback } from 'react';
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
  Clock
} from 'lucide-react';
import apiService from '../services/apiService';
import './ResidentManagement.css';

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
  const [statusFilter, setStatusFilter] = useState<string>('all');
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

  const loadResidents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getResidents({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        statut: statusFilter !== 'all' ? statusFilter : undefined
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
  }, [pagination.page, pagination.limit, searchQuery, statusFilter]);

  useEffect(() => {
    loadResidents();
  }, [loadResidents]);

  const handleDeleteResident = async (residentId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce résident ?')) {
      return;
    }

    try {
      const response = await apiService.deleteResident(residentId);

      if (response.error) {
        alert('Erreur lors de la suppression: ' + response.error);
      } else {
        // Recharger la liste des résidents
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
        <span className="status-badge active">
          <CheckCircle size={12} />
          Actif
        </span>
      );
    } else {
      return (
        <span className="status-badge inactive">
          <XCircle size={12} />
          Inactif
        </span>
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  const handleViewResident = (resident: Resident) => {
    setSelectedResident(resident);
    setShowResidentModal(true);
  };

  if (loading && residents.length === 0) {
    return (
      <div className="resident-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des résidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resident-management-error">
        <AlertTriangle size={48} />
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
        <button onClick={loadResidents}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="resident-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des résidents</h1>
          <p>Gérez tous les résidents de la plateforme</p>
        </div>
        <button className="add-resident-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          <span>Nouveau résident</span>
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un résident..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      {/* Residents Table */}
      <div className="residents-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} résident(s) trouvé(s)</span>
          </div>
        </div>

        <div className="residents-table">
          <div className="table-header-row">
            <div>Résident</div>
            <div>Maison</div>
            <div>Statut</div>
            <div>Statistiques</div>
            <div>Créé le</div>
            <div>Actions</div>
          </div>

          {residents.map((resident) => (
            <div key={resident._id} className="table-row">
              <div className="col-resident">
                <div className="resident-avatar">
                  {resident.prenom.charAt(0)}{resident.nom.charAt(0)}
                </div>
                <div className="resident-details">
                  <div className="resident-name">{resident.prenom} {resident.nom}</div>
                  <div className="resident-email">{resident.email}</div>
                </div>
              </div>

              <div className="col-house">
                {resident.maison ? (
                  <>
                    <div className="house-name">{resident.maison.nomMaison}</div>
                    <div className="house-address">
                      <MapPin size={12} />
                      <span>{formatAdresse(resident.maison.adresse)}</span>
                    </div>
                  </>
                ) : (
                  <span className="no-house">Aucune maison</span>
                )}
              </div>

              <div className="col-status">
                {getStatusBadge(resident)}
              </div>

              <div className="col-stats">
                <div className="stat-item">
                  <div className="stat-value">{resident.statistiques.totalKwh.toFixed(1)}</div>
                  <div className="stat-label">kWh</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{resident.statistiques.totalFactures}</div>
                  <div className="stat-label">Factures</div>
                </div>
              </div>

              <div className="col-date">
                <div className="date-info">
                  <Calendar size={12} />
                  <span>{formatDate(resident.createdAt)}</span>
                </div>
                {resident.lastLogin && (
                  <div className="last-login">
                    Dernière connexion: {formatDate(resident.lastLogin)}
                  </div>
                )}
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button 
                    className="action-btn view"
                    onClick={() => handleViewResident(resident)}
                    title="Voir les détails"
                  >
                    <Eye size={14} />
                  </button>
                  <button 
                    className="action-btn edit"
                    title="Modifier"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteResident(resident._id)}
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Chargement des résidents...</p>
        </div>
      )}

      {!loading && residents.length === 0 && !error && (
        <div className="empty-state">
          <User size={48} />
          <h3>Aucun résident trouvé</h3>
          <p>Commencez par ajouter un nouveau résident</p>
          <button className="add-resident-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            <span>Nouveau résident</span>
          </button>
        </div>
      )}

      {/* Resident Details Modal */}
      {showResidentModal && selectedResident && (
        <div className="modal-overlay" onClick={() => setShowResidentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails du résident</h2>
              <button
                className="modal-close"
                onClick={() => setShowResidentModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="resident-profile">
                <div className="profile-avatar">
                  {selectedResident.prenom.charAt(0)}{selectedResident.nom.charAt(0)}
                </div>
                <div className="profile-info">
                  <h3>{selectedResident.prenom} {selectedResident.nom}</h3>
                  <p>{selectedResident.email}</p>
                  <div className="profile-badges">
                    {getStatusBadge(selectedResident)}
                  </div>
                </div>
              </div>

              <div className="resident-details-grid">
                <div className="detail-item">
                  <Phone size={16} />
                  <div>
                    <label>Téléphone</label>
                    <span>{selectedResident.telephone}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <Calendar size={16} />
                  <div>
                    <label>Créé le</label>
                    <span>{formatDate(selectedResident.createdAt)}</span>
                  </div>
                </div>

                {selectedResident.lastLogin && (
                  <div className="detail-item">
                    <Clock size={16} />
                    <div>
                      <label>Dernière connexion</label>
                      <span>{formatDate(selectedResident.lastLogin)}</span>
                    </div>
                  </div>
                )}

                {selectedResident.maison && (
                  <div className="detail-item">
                    <Home size={16} />
                    <div>
                      <label>Maison</label>
                      <span>{selectedResident.maison.nomMaison}</span>
                    </div>
                  </div>
                )}

                {selectedResident.maison && (
                  <div className="detail-item">
                    <MapPin size={16} />
                    <div>
                      <label>Adresse</label>
                      <span>{formatAdresse(selectedResident.maison.adresse)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="resident-statistics">
                <h4>Statistiques</h4>
                <div className="stats-grid">
                  <div className="stat-card">
                    <Zap size={18} />
                    <div>
                      <div className="stat-value">{selectedResident.statistiques.totalKwh.toFixed(1)}</div>
                      <div className="stat-label">kWh</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <Receipt size={18} />
                    <div>
                      <div className="stat-value">{selectedResident.statistiques.totalFactures}</div>
                      <div className="stat-label">Factures</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <DollarSign size={18} />
                    <div>
                      <div className="stat-value">{(selectedResident.statistiques.totalKwh * 0.15).toFixed(0)}</div>
                      <div className="stat-label">FCFA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowResidentModal(false)}
              >
                Fermer
              </button>
              <button className="btn-primary">
                <Edit size={16} />
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentManagement;