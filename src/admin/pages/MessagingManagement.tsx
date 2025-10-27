import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Clock, 
  CheckCircle, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Mail,
  Smartphone,
  Bell,
  MessageCircle
} from 'lucide-react';
import apiService from '../services/apiService';
import './MessagingManagement.css';

interface Message {
  _id: string;
  sujet: string;
  contenu: string;
  type: string;
  statut: string;
  expediteur: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  destinataire: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  dateEnvoi: string;
  dateLecture?: string;
  createdAt: string;
}

const MessagingManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadMessages();
    loadStats();
  }, [searchQuery, typeFilter, statusFilter, pagination.page, pagination.limit]);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getMessages({
        page: pagination.page,
        limit: pagination.limit,
        search: searchQuery || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setMessages(response.data.messages || []);
        setPagination(response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      console.error('Erreur messages:', err);
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
      case 'email':
        return <Mail size={16} />;
      case 'sms':
        return <Smartphone size={16} />;
      case 'push':
        return <Bell size={16} />;
      case 'chat':
        return <MessageCircle size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="messaging-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className="messaging-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des messages</h1>
          <p>Gérez la communication avec les utilisateurs</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.utilisateurs?.total || 0}</div>
            <div className="stat-label">Messages envoyés</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+23% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Send size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">98.5%</div>
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
            <div className="stat-label">Utilisateurs actifs</div>
            <div className="stat-change positive">
              <CheckCircle size={14} />
              <span>+12 nouveaux</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">2.3s</div>
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
            placeholder="Rechercher un message..."
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
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
            <option value="chat">Chat</option>
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
        </div>
      </div>

      <div className="messages-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} message(s) trouvé(s)</span>
          </div>
        </div>

        <div className="messages-table">
          <div className="table-header-row">
            <div>Type</div>
            <div>Expéditeur</div>
            <div>Destinataire</div>
            <div>Sujet</div>
            <div>Date</div>
            <div>Statut</div>
            <div>Actions</div>
          </div>

          {messages && messages.length > 0 ? messages.map((message) => (
            <div key={message._id} className="table-row">
              <div className="col-type">
                <div className="type-icon">
                  {getTypeIcon(message.type)}
                </div>
                <span className="type-label">{message.type.toUpperCase()}</span>
              </div>

              <div className="col-sender">
                <div className="sender-info">
                  <div className="sender-name">{message.expediteur.prenom} {message.expediteur.nom}</div>
                  <div className="sender-email">{message.expediteur.email}</div>
                </div>
              </div>

              <div className="col-recipient">
                <div className="recipient-info">
                  <div className="recipient-name">{message.destinataire.prenom} {message.destinataire.nom}</div>
                  <div className="recipient-email">{message.destinataire.email}</div>
                </div>
              </div>

              <div className="col-subject">
                <div className="subject-text">{message.sujet}</div>
                <div className="subject-preview">{message.contenu.substring(0, 50)}...</div>
              </div>

              <div className="col-date">
                <div className="date-info">
                  <div className="date-value">{formatDate(message.dateEnvoi)}</div>
                  {message.dateLecture && (
                    <div className="read-date">Lu: {formatDate(message.dateLecture)}</div>
                  )}
                </div>
              </div>

              <div className="col-status">
                {getStatusBadge(message.statut)}
              </div>

              <div className="col-actions">
                <div className="action-buttons">
                  <button className="action-btn view" title="Voir le message">
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
            <p>Chargement des messages...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadMessages}>Réessayer</button>
          </div>
        )}

        {!loading && (!messages || messages.length === 0) && !error && (
          <div className="empty-state">
            <MessageSquare size={48} />
            <h3>Aucun message trouvé</h3>
            <p>Il n'y a actuellement aucun message dans la base de données.</p>
            <p className="empty-hint">Les messages apparaîtront ici une fois que le système en aura généré.</p>
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

export default MessagingManagement;
