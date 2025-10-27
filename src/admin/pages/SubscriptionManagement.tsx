import React, { useState, useEffect } from 'react';
import { 
  CreditCard,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import apiService from '../services/apiService';
import './SubscriptionManagement.css';

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
    adresse: string;
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

  useEffect(() => {
    loadSubscriptions();
    loadStats();
  }, [searchQuery, statusFilter, typeFilter, pagination.page, pagination.limit]);

  const loadSubscriptions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getSubscriptions({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        statut: statusFilter !== 'all' ? statusFilter : undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setSubscriptions(response.data.subscriptions);
        setPagination(response.data.pagination);
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
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'actif': 'status-badge actif',
      'expire': 'status-badge expire',
      'suspendu': 'status-badge suspendu',
      'en_attente': 'status-badge en_attente'
    };
    
    return (
      <span className={statusClasses[status as keyof typeof statusClasses] || 'status-badge'}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="subscription-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des abonnements...</p>
      </div>
    );
  }

  return (
    <div className="subscription-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des abonnements</h1>
          <p>Gérez les abonnements et les offres de la plateforme</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CreditCard size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.abonnements?.actifs || '0'}</div>
            <div className="stat-label">Abonnements actifs</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+5 ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.abonnements?.revenus?.toFixed(0) || '0'} FCFA</div>
            <div className="stat-label">Revenus mensuels</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+12% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.residents || '0'}</div>
            <div className="stat-label">Résidents couverts</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+18 nouveaux</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.abonnements?.expirant || '0'}</div>
            <div className="stat-label">Expirant bientôt</div>
            <div className="stat-change negative">
              <XCircle size={14} />
              <span>7 jours</span>
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
            placeholder="Rechercher un abonnement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="expire">Expiré</option>
            <option value="suspendu">Suspendu</option>
            <option value="en_attente">En attente</option>
          </select>
          
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="mensuel">Mensuel</option>
            <option value="annuel">Annuel</option>
            <option value="trimestriel">Trimestriel</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="subscriptions-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} abonnement(s) trouvé(s)</span>
          </div>
        </div>

        <div className="subscriptions-table">
          <div className="table-header-row">
            <div>Résident</div>
            <div>Maison</div>
            <div>Type</div>
            <div>Montant</div>
            <div>Période</div>
            <div>Statut</div>
            <div>Actions</div>
          </div>

          {subscriptions && subscriptions.length > 0 ? subscriptions.map((subscription) => (
            <div key={subscription._id} className="table-row">
              <div className="col-resident">
                <div className="resident-avatar">
                  {subscription.residentId.prenom.charAt(0)}{subscription.residentId.nom.charAt(0)}
                </div>
                <div className="resident-details">
                  <div className="resident-name">{subscription.residentId.prenom} {subscription.residentId.nom}</div>
                  <div className="resident-email">{subscription.residentId.email}</div>
                </div>
              </div>

              <div className="col-house">
                <div className="house-name">{subscription.maisonId.nomMaison}</div>
                <div className="house-address">{typeof subscription.maisonId.adresse === 'string' ? subscription.maisonId.adresse : 'Adresse non renseignée'}</div>
              </div>

              <div className="col-type">
                <div className="type-badge">{subscription.typeAbonnement}</div>
              </div>

              <div className="col-amount">
                <div className="amount-value">{subscription.montant.toFixed(0)} FCFA</div>
              </div>

              <div className="col-period">
                <div className="period-info">
                  <div className="date-range">
                    {formatDate(subscription.dateDebut)} - {formatDate(subscription.dateFin)}
                  </div>
                </div>
              </div>

              <div className="col-status">
                {getStatusBadge(subscription.statut)}
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir les détails">
                    <Eye size={14} />
                  </button>
                  <button className="action-btn edit" title="Modifier">
                    <Edit size={14} />
                  </button>
                  <button className="action-btn delete" title="Supprimer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          )) : null}
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Chargement des abonnements...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadSubscriptions}>Réessayer</button>
          </div>
        )}

        {!loading && (!subscriptions || subscriptions.length === 0) && !error && (
          <div className="empty-state">
            <CreditCard size={48} />
            <h3>Aucun abonnement trouvé</h3>
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

export default SubscriptionManagement;
