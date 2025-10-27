import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Zap,
  Calendar,
  Home,
  User,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import apiService from '../services/apiService';
import './ConsumptionManagement.css';

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
    adresse: string;
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

  useEffect(() => {
    loadConsumptions();
    loadStats();
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

  if (loading) {
    return (
      <div className="consumption-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des consommations...</p>
      </div>
    );
  }

  return (
    <div className="consumption-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des consommations</h1>
          <p>Suivez et analysez les consommations électriques</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <Download size={20} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.consommations?.totalKwh?.toFixed(1) || '0'} kWh</div>
            <div className="stat-label">Consommation totale</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              <span>+12% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Home size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.maisons?.total || '0'}</div>
            <div className="stat-label">Maisons actives</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              <span>+3 nouvelles</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <User size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.residents || '0'}</div>
            <div className="stat-label">Résidents actifs</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              <span>+8 nouveaux</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.consommations?.total || '0'}</div>
            <div className="stat-label">Relevés ce mois</div>
            <div className="stat-change negative">
              <TrendingDown size={14} />
              <span>-5% vs mois dernier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une consommation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={houseFilter}
            onChange={(e) => setHouseFilter(e.target.value)}
          >
            <option value="all">Toutes les maisons</option>
            <option value="house1">Villa Sunshine</option>
            <option value="house2">Résidence Les Palmiers</option>
          </select>
          
          <select 
            className="filter-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(Number(e.target.value))}
          >
            <option value="0">Tous les mois</option>
            <option value="12">Décembre 2024</option>
            <option value="11">Novembre 2024</option>
            <option value="10">Octobre 2024</option>
          </select>
        </div>
      </div>

      {/* Consumptions Table */}
      <div className="consumptions-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} consommation(s) trouvée(s)</span>
          </div>
        </div>

        <div className="consumptions-table">
          <div className="table-header-row">
            <div>Résident</div>
            <div>Maison</div>
            <div>Consommation</div>
            <div>Période</div>
            <div>Montant</div>
            <div>Statut</div>
            <div>Actions</div>
          </div>

          {consumptions && consumptions.length > 0 ? consumptions.map((consumption) => (
            <div key={consumption._id} className="table-row">
              <div className="col-resident">
                <div className="resident-avatar">
                  {consumption.residentId.prenom.charAt(0)}{consumption.residentId.nom.charAt(0)}
                </div>
                <div className="resident-details">
                  <div className="resident-name">{consumption.residentId.prenom} {consumption.residentId.nom}</div>
                  <div className="resident-email">{consumption.residentId.email}</div>
                </div>
              </div>

              <div className="col-house">
                <div className="house-name">{consumption.maisonId.nomMaison}</div>
                <div className="house-address">{typeof consumption.maisonId.adresse === 'string' ? consumption.maisonId.adresse : 'Adresse non renseignée'}</div>
              </div>

              <div className="col-consumption">
                <div className="consumption-value">{consumption.kwh} kWh</div>
              </div>

              <div className="col-period">
                <div className="period-info">
                  {consumption.mois}/{consumption.annee}
                </div>
              </div>

              <div className="col-amount">
                <div className="amount-value">{consumption.montant.toFixed(0)} FCFA</div>
              </div>

              <div className="col-status">
                <span className={`status-badge ${consumption.statut}`}>
                  {consumption.statut}
                </span>
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir les détails">
                    <User size={14} />
                  </button>
                  <button className="action-btn edit" title="Modifier">
                    <Calendar size={14} />
                  </button>
                  <button className="action-btn delete" title="Supprimer">
                    <Zap size={14} />
                  </button>
                </div>
              </div>
            </div>
          )) : null}
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Chargement des consommations...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadConsumptions}>Réessayer</button>
          </div>
        )}

        {!loading && (!consumptions || consumptions.length === 0) && !error && (
          <div className="empty-state">
            <Zap size={48} />
            <h3>Aucune consommation trouvée</h3>
            <p>Modifiez vos critères de recherche</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Précédent
            </button>
            <span>Page {pagination.page} sur {pagination.pages}</span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumptionManagement;
