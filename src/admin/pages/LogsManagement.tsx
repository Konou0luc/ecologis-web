import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Search, 
  Filter, 
  Eye, 
  Trash2,
  Calendar,
  User,
  Activity,
  AlertCircle,
  XCircle
} from 'lucide-react';
import apiService from '../services/apiService';
import './LogsManagement.css';

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

  useEffect(() => {
    loadLogs();
    loadStats();
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
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getLevelBadge = (level: string) => {
    const levelClasses = {
      'debug': 'level-badge debug',
      'info': 'level-badge info',
      'warn': 'level-badge warn',
      'error': 'level-badge error',
      'fatal': 'level-badge fatal'
    };

    return (
      <span className={levelClasses[level as keyof typeof levelClasses] || 'level-badge'}>
        {level.toUpperCase()}
      </span>
    );
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'debug':
        return <Info size={16} />;
      case 'info':
        return <CheckCircle size={16} />;
      case 'warn':
        return <AlertTriangle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'fatal':
        return <XCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="logs-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des logs...</p>
      </div>
    );
  }

  return (
    <div className="logs-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des logs</h1>
          <p>Surveillez et analysez l'activité du système</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <Download size={20} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.total || 0}</div>
            <div className="stat-label">Logs aujourd'hui</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>Système stable</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">3</div>
            <div className="stat-label">Erreurs détectées</div>
            <div className="stat-change negative">
              <AlertTriangle size={14} />
              <span>À surveiller</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">99.8%</div>
            <div className="stat-label">Uptime système</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>Excellent</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Info size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">2.1s</div>
            <div className="stat-label">Temps de réponse</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>Rapide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher dans les logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
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
            className="filter-select"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            placeholder="Date de début"
          />

          <input
            type="date"
            className="filter-select"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            placeholder="Date de fin"
          />
        </div>
      </div>

      <div className="logs-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} log(s) trouvé(s)</span>
          </div>
        </div>

        <div className="logs-table">
          <div className="table-header-row">
            <div>Niveau</div>
            <div>Module</div>
            <div>Message</div>
            <div>Utilisateur</div>
            <div>Date</div>
            <div>Actions</div>
          </div>

          {logs && logs.length > 0 ? logs.map((log) => (
            <div key={log._id} className="table-row">
              <div className="col-level">
                <div className="level-icon">
                  {getLevelIcon(log.level)}
                </div>
                {getLevelBadge(log.level)}
              </div>

              <div className="col-module">
                <div className="module-info">
                  <div className="module-name">{log.module}</div>
                  <div className="module-action">{log.action}</div>
                </div>
              </div>

              <div className="col-message">
                <div className="message-text">{log.message}</div>
                {log.ip && (
                  <div className="message-meta">IP: {log.ip}</div>
                )}
              </div>

              <div className="col-user">
                {log.user ? (
                  <div className="user-info">
                    <div className="user-name">{log.user.prenom} {log.user.nom}</div>
                    <div className="user-email">{log.user.email}</div>
                  </div>
                ) : (
                  <span className="no-user">Système</span>
                )}
              </div>

              <div className="col-date">
                <div className="date-value">{formatDate(log.createdAt)}</div>
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir les détails">
                    <Eye size={14} />
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
            <p>Chargement des logs...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadLogs}>Réessayer</button>
          </div>
        )}

        {!loading && (!logs || logs.length === 0) && !error && (
          <div className="empty-state">
            <FileText size={48} />
            <h3>Aucun log trouvé</h3>
            <p>Il n'y a actuellement aucun log dans la base de données.</p>
            <p className="empty-hint">Les logs apparaîtront ici une fois que le système aura enregistré des activités.</p>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={pagination.page === 1}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            >
              Précédent
            </button>
            
            <span className="pagination-info">
              Page {pagination.page} sur {pagination.pages}
            </span>
            
            <button 
              className="pagination-btn"
              disabled={pagination.page === pagination.pages}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsManagement;
