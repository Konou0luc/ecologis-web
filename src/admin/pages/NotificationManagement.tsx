import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import apiService from '../services/apiService';
import './NotificationManagement.css';

interface Notification {
  _id: string;
  titre: string;
  contenu: string;
  type: string;
  statut: string;
  destinataire: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  dateEnvoi: string;
  dateLecture?: string;
  priorite: string;
  createdAt: string;
}

const NotificationManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadNotifications();
    loadStats();
  }, [searchQuery, typeFilter, statusFilter, priorityFilter, pagination.page, pagination.limit]);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getNotifications({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setNotifications(response.data.notifications || []);
        setPagination(response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des notifications');
      console.error('Erreur notifications:', err);
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
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'envoye': 'status-badge envoye',
      'en_attente': 'status-badge en_attente',
      'echec': 'status-badge echec',
      'lu': 'status-badge lu'
    };

    return (
      <span className={statusClasses[status as keyof typeof statusClasses] || 'status-badge'}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Bell size={16} />;
      case 'alert':
        return <AlertTriangle size={16} />;
      case 'info':
        return <Info size={16} />;
      case 'warning':
        return <AlertCircle size={16} />;
      case 'success':
        return <CheckCircle2 size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      'basse': 'priority-badge basse',
      'normale': 'priority-badge normale',
      'haute': 'priority-badge haute',
      'critique': 'priority-badge critique'
    };

    return (
      <span className={priorityClasses[priority as keyof typeof priorityClasses] || 'priority-badge'}>
        {priority.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="notification-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des notifications...</p>
      </div>
    );
  }

  return (
    <div className="notification-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des notifications</h1>
          <p>Configurez et gérez les notifications système</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Bell size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.total || 0}</div>
            <div className="stat-label">Notifications envoyées</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+34% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Send size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">96.2%</div>
            <div className="stat-label">Taux de livraison</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>Excellent</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.total || 0}</div>
            <div className="stat-label">Utilisateurs notifiés</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+5% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">1.8s</div>
            <div className="stat-label">Temps de traitement</div>
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
            placeholder="Rechercher une notification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="system">Système</option>
            <option value="alert">Alerte</option>
            <option value="info">Info</option>
            <option value="warning">Avertissement</option>
            <option value="success">Succès</option>
          </select>
          
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="envoye">Envoyé</option>
            <option value="en_attente">En attente</option>
            <option value="echec">Échec</option>
            <option value="lu">Lu</option>
          </select>

          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Toutes les priorités</option>
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
            <option value="critique">Critique</option>
          </select>
        </div>
      </div>

      <div className="notifications-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} notification(s) trouvée(s)</span>
          </div>
        </div>

        <div className="notifications-table">
          <div className="table-header-row">
            <div>Type</div>
            <div>Destinataire</div>
            <div>Titre</div>
            <div>Priorité</div>
            <div>Date</div>
            <div>Statut</div>
            <div>Actions</div>
          </div>

          {notifications && notifications.length > 0 ? notifications.map((notification) => (
            <div key={notification._id} className="table-row">
              <div className="col-type">
                <div className="type-icon">
                  {getTypeIcon(notification.type)}
                </div>
                <span className="type-label">{notification.type.toUpperCase()}</span>
              </div>

              <div className="col-recipient">
                <div className="recipient-info">
                  <div className="recipient-name">{notification.destinataire.prenom} {notification.destinataire.nom}</div>
                  <div className="recipient-email">{notification.destinataire.email}</div>
                </div>
              </div>

              <div className="col-title">
                <div className="title-text">{notification.titre}</div>
                <div className="title-preview">{notification.contenu.substring(0, 50)}...</div>
              </div>

              <div className="col-priority">
                {getPriorityBadge(notification.priorite)}
              </div>

              <div className="col-date">
                <div className="date-info">
                  <div className="date-value">{formatDate(notification.dateEnvoi)}</div>
                  {notification.dateLecture && (
                    <div className="read-date">Lu: {formatDate(notification.dateLecture)}</div>
                  )}
                </div>
              </div>

              <div className="col-status">
                {getStatusBadge(notification.statut)}
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir la notification">
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
            <p>Chargement des notifications...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadNotifications}>Réessayer</button>
          </div>
        )}

        {!loading && (!notifications || notifications.length === 0) && !error && (
          <div className="empty-state">
            <Bell size={48} />
            <h3>Aucune notification trouvée</h3>
            <p>Il n'y a actuellement aucune notification dans la base de données.</p>
            <p className="empty-hint">Les notifications apparaîtront ici une fois que le système en aura généré.</p>
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

export default NotificationManagement;
