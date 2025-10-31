import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  UserCheck, 
  Zap, 
  Receipt, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: 'dashboard' },
  { id: 'users', label: 'Utilisateurs', icon: Users, path: 'users' },
  { id: 'houses', label: 'Maisons', icon: Home, path: 'houses' },
  { id: 'residents', label: 'Résidents', icon: UserCheck, path: 'residents' },
  { id: 'consumptions', label: 'Consommations', icon: Zap, path: 'consumptions' },
  { id: 'billing', label: 'Factures', icon: Receipt, path: 'billing' },
  { id: 'subscriptions', label: 'Abonnements', icon: CreditCard, path: 'subscriptions' },
  { id: 'messaging', label: 'Messages', icon: MessageSquare, path: 'messaging', badge: 3 },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: 'notifications', badge: 7 },
  { id: 'logs', label: 'Logs', icon: FileText, path: 'logs' },
  { id: 'settings', label: 'Paramètres', icon: Settings, path: 'settings' },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isMobileMenuOpen, closeMobileMenu } = useMenu();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        />
      )}
      
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Zap size={24} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-title">Ecopower</span>
              <span className="logo-subtitle">Admin</span>
            </div>
          )}
        </div>
        <div className="sidebar-toggle-container">
          <button 
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          
          {/* Mobile Close Button */}
          <button 
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="sidebar-user">
          <div className="user-avatar">
            {user.prenom.charAt(0)}{user.nom.charAt(0)}
          </div>
          <div className="user-info">
            <div className="user-name">{user.prenom} {user.nom}</div>
            <div className="user-role">
              {user.role === 'super-admin' ? 'Super Admin' : 'Administrateur'}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.endsWith(item.path) || (item.path === 'dashboard' && location.pathname.endsWith('/admin'));
            
            return (
              <li key={item.id} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.label : undefined}
                  onClick={closeMobileMenu}
                >
                  <div className="nav-icon">
                    <Icon size={20} />
                    {item.badge && item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </div>
                  {!collapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button 
          className="logout-btn"
          onClick={handleLogout}
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
