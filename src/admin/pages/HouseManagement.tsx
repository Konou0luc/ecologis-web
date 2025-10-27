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
  Calendar
} from 'lucide-react';
import apiService from '../services/apiService';
import './HouseManagement.css';

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

  useEffect(() => {
    loadHouses();
  }, [searchQuery]);

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
        // Recharger la liste des maisons
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

  const formatAdresseCourte = (adresse: string | { rue?: string; ville?: string; codePostal?: string; pays?: string; }) => {
    if (typeof adresse === 'string') {
      return adresse;
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

  if (loading) {
    return (
      <div className="house-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des maisons...</p>
      </div>
    );
  }

  return (
    <div className="house-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des maisons</h1>
          <p>Gérez toutes les propriétés de la plateforme</p>
        </div>
        <button className="add-house-btn">
          <Plus size={20} />
          <span>Nouvelle maison</span>
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une maison..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
      </div>

      {/* Houses Grid */}
      <div className="houses-grid">
        {houses.map((house) => (
          <div key={house._id} className="house-card">
            <div className="house-header">
              <div className="house-icon">
                <Home size={24} />
              </div>
              <div className="house-info">
                <h3>{house.nomMaison}</h3>
                <div className="house-location">
                  <MapPin size={14} />
                  <span>{formatAdresseCourte(house.adresse)}</span>
                </div>
              </div>
              <span className="status-badge">Active</span>
            </div>

            <div className="house-details">
              <div className="detail-row">
                <span className="detail-label">Propriétaire:</span>
                <span className="detail-value">
                  {house.proprietaireId ? `${house.proprietaireId.prenom} ${house.proprietaireId.nom}` : 'Non renseigné'}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Adresse:</span>
                <span className="detail-value">{formatAdresse(house.adresse)}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Résidents:</span>
                <span className="detail-value">{house.listeResidents?.length || 0}</span>
              </div>
            </div>

            <div className="house-stats">
              <div className="stat-item">
                <Zap size={16} />
                <div>
                  <div className="stat-value">- kWh</div>
                  <div className="stat-label">Consommation</div>
                </div>
              </div>
              
              <div className="stat-item">
                <DollarSign size={16} />
                <div>
                  <div className="stat-value">-</div>
                  <div className="stat-label">Factures</div>
                </div>
              </div>
            </div>

            <div className="house-residents">
              <div className="residents-header">
                <Users size={16} />
                <span>Résidents ({house.listeResidents?.length || 0})</span>
              </div>
              <div className="residents-list">
                {house.listeResidents && house.listeResidents.length > 0 ? (
                  house.listeResidents.slice(0, 2).map((resident) => (
                    <div key={resident._id} className="resident-item">
                      <div className="resident-avatar">
                        {resident.prenom?.charAt(0) || '?'}{resident.nom?.charAt(0) || '?'}
                      </div>
                      <div className="resident-info">
                        <div className="resident-name">{resident.prenom || 'N/A'} {resident.nom || 'N/A'}</div>
                        <div className="resident-email">{resident.email || 'N/A'}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-residents">Aucun résident</div>
                )}
                {house.listeResidents && house.listeResidents.length > 2 && (
                  <div className="more-residents">
                    +{house.listeResidents.length - 2} autres
                  </div>
                )}
              </div>
            </div>

            <div className="house-footer">
              <div className="house-date">
                <Calendar size={14} />
                <span>Créée le {formatDate(house.createdAt)}</span>
              </div>
              
              <div className="house-actions">
                <button className="action-btn view" title="Voir les détails">
                  <Eye size={16} />
                </button>
                <button className="action-btn edit" title="Modifier">
                  <Edit size={16} />
                </button>
                <button className="action-btn delete" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Chargement des maisons...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadHouses}>Réessayer</button>
        </div>
      )}
      
      {!loading && houses.length === 0 && !error && (
        <div className="empty-state">
          <Home size={48} />
          <h3>Aucune maison trouvée</h3>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default HouseManagement;
