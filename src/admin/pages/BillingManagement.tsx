import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Receipt,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import apiService from '../services/apiService';
import './BillingManagement.css';

interface Bill {
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
  consommationId: {
    _id: string;
    kwh: number;
    mois: number;
    annee: number;
  };
  montant: number;
  statut: string;
  dateEmission: string;
  datePaiement?: string;
  createdAt: string;
}

const BillingManagement: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<number>(new Date().getFullYear());
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadBills();
    loadStats();
  }, [searchQuery, statusFilter, yearFilter, pagination.page, pagination.limit]);

  const loadBills = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBills({
        page: pagination.page,
        limit: pagination.limit,
        statut: statusFilter !== 'all' ? statusFilter : undefined,
        annee: yearFilter,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setBills(response.data.factures);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des factures');
      console.error('Erreur factures:', err);
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
      'payee': 'status-badge payee',
      'en_attente': 'status-badge en_attente',
      'en_retard': 'status-badge en_retard',
      'annulee': 'status-badge annulee'
    };
    
    return (
      <span className={statusClasses[status as keyof typeof statusClasses] || 'status-badge'}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="billing-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des factures...</p>
      </div>
    );
  }

  return (
    <div className="billing-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des factures</h1>
          <p>Gérez et suivez toutes les factures de la plateforme</p>
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
            <Receipt size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.factures?.total || '0'}</div>
            <div className="stat-label">Factures totales</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+45 ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.factures?.chiffreAffaires?.toFixed(0) || '0'} FCFA</div>
            <div className="stat-label">Chiffre d'affaires</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+18% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.factures?.payees || '0'}</div>
            <div className="stat-label">Factures payées</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>97.4%</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.factures?.enAttente || '0'}</div>
            <div className="stat-label">En attente</div>
            <div className="stat-change negative">
              <XCircle size={14} />
              <span>2.6%</span>
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
            placeholder="Rechercher une facture..."
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
            <option value="payee">Payée</option>
            <option value="en_attente">En attente</option>
            <option value="en_retard">En retard</option>
            <option value="annulee">Annulée</option>
          </select>
          
          <select 
            className="filter-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(Number(e.target.value))}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bills-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} facture(s) trouvée(s)</span>
          </div>
        </div>

        <div className="bills-table">
          <div className="table-header-row">
            <div>Résident</div>
            <div>Maison</div>
            <div>Consommation</div>
            <div>Montant</div>
            <div>Date émission</div>
            <div>Statut</div>
            <div>Actions</div>
          </div>

          {bills && bills.length > 0 ? bills.map((bill) => (
            <div key={bill._id} className="table-row">
              <div className="col-resident">
                <div className="resident-avatar">
                  {bill.residentId.prenom.charAt(0)}{bill.residentId.nom.charAt(0)}
                </div>
                <div className="resident-details">
                  <div className="resident-name">{bill.residentId.prenom} {bill.residentId.nom}</div>
                  <div className="resident-email">{bill.residentId.email}</div>
                </div>
              </div>

              <div className="col-house">
                <div className="house-name">{bill.maisonId.nomMaison}</div>
                <div className="house-address">{typeof bill.maisonId.adresse === 'string' ? bill.maisonId.adresse : 'Adresse non renseignée'}</div>
              </div>

              <div className="col-consumption">
                <div className="consumption-info">
                  <div className="consumption-value">{bill.consommationId.kwh} kWh</div>
                  <div className="consumption-period">{bill.consommationId.mois}/{bill.consommationId.annee}</div>
                </div>
              </div>

              <div className="col-amount">
                <div className="amount-value">{bill.montant.toFixed(0)} FCFA</div>
              </div>

              <div className="col-date">
                <div className="date-info">
                  <div className="emission-date">{formatDate(bill.dateEmission)}</div>
                  {bill.datePaiement && (
                    <div className="payment-date">Payé le {formatDate(bill.datePaiement)}</div>
                  )}
                </div>
              </div>

              <div className="col-status">
                {getStatusBadge(bill.statut)}
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir la facture">
                    <Receipt size={14} />
                  </button>
                  <button className="action-btn edit" title="Modifier">
                    <DollarSign size={14} />
                  </button>
                  <button className="action-btn delete" title="Supprimer">
                    <XCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
          )) : null}
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Chargement des factures...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadBills}>Réessayer</button>
          </div>
        )}

        {!loading && (!bills || bills.length === 0) && !error && (
          <div className="empty-state">
            <Receipt size={48} />
            <h3>Aucune facture trouvée</h3>
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

export default BillingManagement;
