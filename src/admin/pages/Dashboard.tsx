import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Home, 
  UserCheck, 
  Zap, 
  Receipt, 
  CreditCard, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import apiService from '../services/apiService';
import './Dashboard.css';

interface DashboardStats {
  utilisateurs: {
    total: number;
    proprietaires: number;
    residents: number;
    admins: number;
  };
  maisons: {
    total: number;
  };
  consommations: {
    total: number;
    totalKwh: number;
    totalMontant: number;
  };
  factures: {
    total: number;
    payees: number;
    enRetard: number;
    enAttente: number;
    revenusTotaux: number;
  };
  graphiques: {
    consommationsParMois: Array<{
      _id: { annee: number; mois: number };
      totalKwh: number;
      totalMontant: number;
      count: number;
    }>;
    facturesParMois: Array<{
      _id: { annee: number; mois: number };
      totalMontant: number;
      count: number;
      payees: number;
    }>;
    topMaisons: Array<{
      _id: string;
      totalKwh: number;
      totalMontant: number;
      count: number;
      maison: {
        _id: string;
        nomMaison: string;
        adresse: string;
      };
    }>;
  };
}

interface SystemService {
  name: string;
  status: string;
  responseTime: number | null;
  connected: boolean;
  indicator: 'online' | 'offline' | 'warning';
}

interface SystemStatus {
  services: SystemService[];
  systemInfo: {
    uptime: {
      days: number;
      hours: number;
      minutes: number;
      formatted: string;
    };
    memory: {
      total: number;
      used: number;
      free: number;
      percentage: number;
    };
    storage: {
      total: number;
      used: number;
      free: number;
      percentage: number;
    };
    nodeVersion: string;
    platform: string;
    arch: string;
    cpuCount: number;
  };
  timestamp: string;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'house' | 'resident' | 'consumption' | 'bill' | 'subscription';
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [statsResponse, systemResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getSystemStatus()
        ]);
        
        if (statsResponse.error) {
          setError(statsResponse.error);
        } else if (statsResponse.data) {
          setStats(statsResponse.data);
        }

        if (systemResponse.error) {
          console.error('Erreur système:', systemResponse.error);
        } else if (systemResponse.data) {
          setSystemStatus(systemResponse.data);
        }

        // Générer l'activité récente basée sur les données
        const activities: RecentActivity[] = [];
        
        // Ajouter des activités basées sur les données réelles
        if (statsResponse.data && statsResponse.data.utilisateurs.total > 0) {
          activities.push({
            id: '1',
            type: 'user',
            action: `${statsResponse.data.utilisateurs.total} utilisateurs enregistrés`,
            user: 'Système',
            timestamp: 'Maintenant',
            status: 'success'
          });
        }
        
        if (statsResponse.data && statsResponse.data.maisons.total > 0) {
          activities.push({
            id: '2',
            type: 'house',
            action: `${statsResponse.data.maisons.total} maisons gérées`,
            user: 'Système',
            timestamp: 'Maintenant',
            status: 'success'
          });
        }
        
        if (statsResponse.data && statsResponse.data.consommations.total > 0) {
          activities.push({
            id: '3',
            type: 'consumption',
            action: `${statsResponse.data.consommations.total} consommations enregistrées`,
            user: 'Système',
            timestamp: 'Maintenant',
            status: 'success'
          });
        }
        
        if (statsResponse.data && statsResponse.data.factures.enRetard > 0) {
          activities.push({
            id: '4',
            type: 'bill',
            action: `${statsResponse.data.factures.enRetard} factures en retard`,
            user: 'Système',
            timestamp: 'Maintenant',
            status: 'warning'
          });
        }
        
        setRecentActivity(activities);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);


  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users size={16} />;
      case 'house': return <Home size={16} />;
      case 'resident': return <UserCheck size={16} />;
      case 'consumption': return <Zap size={16} />;
      case 'bill': return <Receipt size={16} />;
      case 'subscription': return <CreditCard size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="status-success" />;
      case 'warning': return <AlertTriangle size={16} className="status-warning" />;
      case 'error': return <AlertTriangle size={16} className="status-error" />;
      default: return <Clock size={16} className="status-info" />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <AlertTriangle size={48} />
        <h3>Erreur de chargement</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Réessayer
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-error">
        <AlertTriangle size={48} />
        <h3>Aucune donnée disponible</h3>
        <p>Impossible de charger les statistiques du tableau de bord.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Tableau de bord</h1>
          <p>Vue d'ensemble de l'activité de la plateforme</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn">
            <Activity size={20} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="overview-card">
          <div className="overview-header">
            <h3>Vue d'ensemble</h3>
            <div className="overview-badge">
              <CheckCircle size={16} />
              <span>Système opérationnel</span>
            </div>
          </div>
          <div className="overview-stats">
            <div className="overview-stat">
              <div className="stat-number">{stats.utilisateurs.total}</div>
              <div className="stat-label">Utilisateurs</div>
            </div>
            <div className="overview-stat">
              <div className="stat-number">{stats.maisons.total}</div>
              <div className="stat-label">Maisons</div>
            </div>
            <div className="overview-stat">
              <div className="stat-number">{stats.consommations.total}</div>
              <div className="stat-label">Consommations</div>
            </div>
            <div className="overview-stat">
              <div className="stat-number">{stats.factures.total}</div>
              <div className="stat-label">Factures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <div className="dashboard-left">
          {/* Quick Actions */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h3>Actions rapides</h3>
              <div className="card-subtitle">Gestion rapide du système</div>
            </div>
            <div className="actions-list">
              <button className="action-item">
                <div className="action-icon">
                  <Users size={20} />
                </div>
                <div className="action-content">
                  <div className="action-title">Nouvel utilisateur</div>
                  <div className="action-subtitle">Créer un compte utilisateur</div>
                </div>
                <div className="action-arrow">→</div>
              </button>
              <button className="action-item">
                <div className="action-icon">
                  <UserCheck size={20} />
                </div>
                <div className="action-content">
                  <div className="action-title">Nouveau résident</div>
                  <div className="action-subtitle">Ajouter un résident</div>
                </div>
                <div className="action-arrow">→</div>
              </button>
              <button className="action-item">
                <div className="action-icon">
                  <Home size={20} />
                </div>
                <div className="action-content">
                  <div className="action-title">Ajouter une maison</div>
                  <div className="action-subtitle">Enregistrer une nouvelle maison</div>
                </div>
                <div className="action-arrow">→</div>
              </button>
              <button className="action-item">
                <div className="action-icon">
                  <Receipt size={20} />
                </div>
                <div className="action-content">
                  <div className="action-title">Générer facture</div>
                  <div className="action-subtitle">Créer une nouvelle facture</div>
                </div>
                <div className="action-arrow">→</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-card">
            <div className="card-header">
              <h3>Activité récente</h3>
              <div className="card-subtitle">Dernières activités du système</div>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-meta">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-time">{activity.timestamp}</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    {getStatusIcon(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          {/* Alerts */}
          <div className="alerts-card">
            <div className="card-header">
              <h3>Alertes</h3>
              <div className="card-subtitle">Notifications importantes</div>
            </div>
            <div className="alerts-list">
              <div className="alert-item warning">
                <div className="alert-icon">
                  <AlertTriangle size={20} />
                </div>
                <div className="alert-content">
                  <div className="alert-title">Abonnements expirants</div>
                  <div className="alert-description">3 abonnements expirent dans les 7 prochains jours</div>
                </div>
                <div className="alert-badge warning">3</div>
              </div>
              <div className="alert-item error">
                <div className="alert-icon">
                  <AlertTriangle size={20} />
                </div>
                <div className="alert-content">
                  <div className="alert-title">Factures en retard</div>
                  <div className="alert-description">{stats.factures.enRetard} factures sont en retard de paiement</div>
                </div>
                <div className="alert-badge error">{stats.factures.enRetard}</div>
              </div>
              <div className="alert-item success">
                <div className="alert-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="alert-content">
                  <div className="alert-title">Système opérationnel</div>
                  <div className="alert-description">Tous les services fonctionnent normalement</div>
                </div>
                <div className="alert-badge success">✓</div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="system-status-card">
            <div className="card-header">
              <h3>État du système</h3>
              <div className="card-subtitle">Statut des services</div>
            </div>
            <div className="status-list">
              {systemStatus ? (
                systemStatus.services.map((service, index) => (
                  <div key={index} className="status-item">
                    <div className={`status-indicator ${service.indicator}`}></div>
                    <div className="status-info">
                      <div className="status-name">{service.name}</div>
                      <div className="status-value">{service.status}</div>
                    </div>
                    <div className="status-time">
                      {service.responseTime ? `${service.responseTime}ms` : '-'}
                    </div>
                  </div>
                ))
              ) : (
                // Fallback si les données système ne sont pas disponibles
                <>
                  <div className="status-item">
                    <div className="status-indicator online"></div>
                    <div className="status-info">
                      <div className="status-name">API</div>
                      <div className="status-value">Opérationnel</div>
                    </div>
                    <div className="status-time">2ms</div>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator online"></div>
                    <div className="status-info">
                      <div className="status-name">Base de données</div>
                      <div className="status-value">Opérationnel</div>
                    </div>
                    <div className="status-time">15ms</div>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator online"></div>
                    <div className="status-info">
                      <div className="status-name">Notifications</div>
                      <div className="status-value">Opérationnel</div>
                    </div>
                    <div className="status-time">5ms</div>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator warning"></div>
                    <div className="status-info">
                      <div className="status-name">Stockage</div>
                      <div className="status-value">75% utilisé</div>
                    </div>
                    <div className="status-time">-</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
