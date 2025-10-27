import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone,
  Calendar,
  Shield
} from 'lucide-react';
import apiService from '../services/apiService';
import './UserManagement.css';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, [searchQuery, roleFilter]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getUsers({
        page: pagination.page,
        limit: pagination.limit,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
      console.error('Erreur users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const response = await apiService.deleteUser(userId);
      
      if (response.error) {
        alert('Erreur lors de la suppression: ' + response.error);
      } else {
        // Recharger la liste des utilisateurs
        loadUsers();
      }
    } catch (err) {
      alert('Erreur lors de la suppression de l\'utilisateur');
      console.error('Erreur suppression:', err);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'super-admin': { label: 'Super Admin', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
      'admin': { label: 'Admin', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
      'proprietaire': { label: 'Propriétaire', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
      'resident': { label: 'Résident', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.resident;
    
    return (
      <span 
        className="role-badge"
        style={{ color: config.color, backgroundColor: config.bg }}
      >
        {config.label}
      </span>
    );
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

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (loading) {
    return (
      <div className="user-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des utilisateurs</h1>
          <p>Gérez tous les utilisateurs de la plateforme</p>
        </div>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les rôles</option>
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="proprietaire">Propriétaire</option>
            <option value="resident">Résident</option>
          </select>
          
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <div className="table-header">
          <div className="table-info">
            <span>{pagination.total} utilisateur(s) trouvé(s)</span>
          </div>
        </div>
        
        <div className="users-table">
          <div className="table-header-row">
            <div className="col-user">Utilisateur</div>
            <div className="col-role">Rôle</div>
            <div className="col-status">Statut</div>
            <div className="col-created">Créé le</div>
            <div className="col-last-login">Dernière connexion</div>
            <div className="col-actions">Actions</div>
          </div>
          
          {users.map((user) => (
            <div key={user._id} className="table-row">
              <div className="col-user">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.prenom.charAt(0)}{user.nom.charAt(0)}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.prenom} {user.nom}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="col-role">
                {getRoleBadge(user.role)}
              </div>
              
              <div className="col-status">
                <span className="status-badge">Actif</span>
              </div>
              
              <div className="col-created">
                <div className="date-info">
                  <Calendar size={14} />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </div>
              
              <div className="col-last-login">
                {user.lastLogin ? (
                  <div className="date-info">
                    <Calendar size={14} />
                    <span>{formatDate(user.lastLogin)}</span>
                  </div>
                ) : (
                  <span className="no-data">Jamais connecté</span>
                )}
              </div>
              
              <div className="col-actions">
                <div className="action-buttons">
                  <button 
                    className="action-btn view"
                    onClick={() => handleViewUser(user)}
                    title="Voir les détails"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn edit"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteUser(user._id)}
                    title="Supprimer"
                  >
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
            <p>Chargement des utilisateurs...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadUsers}>Réessayer</button>
          </div>
        )}
        
        {!loading && users.length === 0 && !error && (
          <div className="empty-state">
            <p>Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails de l'utilisateur</h2>
              <button 
                className="modal-close"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="user-profile">
                <div className="profile-avatar">
                  {selectedUser.prenom.charAt(0)}{selectedUser.nom.charAt(0)}
                </div>
                <div className="profile-info">
                  <h3>{selectedUser.prenom} {selectedUser.nom}</h3>
                  <p>{selectedUser.email}</p>
                  <div className="profile-badges">
                    {getRoleBadge(selectedUser.role)}
                    <span className="status-badge">Actif</span>
                  </div>
                </div>
              </div>
              
              <div className="user-details-grid">
                <div className="detail-item">
                  <Phone size={16} />
                  <div>
                    <label>Téléphone</label>
                    <span>{selectedUser.telephone}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Calendar size={16} />
                  <div>
                    <label>Créé le</label>
                    <span>{formatDate(selectedUser.createdAt)}</span>
                  </div>
                </div>
                
                {selectedUser.lastLogin && (
                  <div className="detail-item">
                    <Calendar size={16} />
                    <div>
                      <label>Dernière connexion</label>
                      <span>{formatDate(selectedUser.lastLogin)}</span>
                    </div>
                  </div>
                )}
                
                <div className="detail-item">
                  <Shield size={16} />
                  <div>
                    <label>Rôle</label>
                    <span>{selectedUser.role}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowUserModal(false)}
              >
                Fermer
              </button>
              <button className="btn-primary">
                Modifier l'utilisateur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
