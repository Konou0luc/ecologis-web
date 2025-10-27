import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Menu,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import './Header.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const { toggleMobileMenu } = useMenu();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, title: 'Nouvelle facture générée', time: '2 min', unread: true },
    { id: 2, title: 'Consommation élevée détectée', time: '15 min', unread: true },
    { id: 3, title: 'Abonnement expirant bientôt', time: '1h', unread: false },
  ];

  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        {/* Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          title={darkMode ? 'Mode clair' : 'Mode sombre'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="notifications-container">
          <button 
            className="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <span className="notifications-count">
                  {notifications.filter(n => n.unread).length} non lues
                </span>
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                    {notification.unread && <div className="notification-dot"></div>}
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn">Voir toutes les notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user?.prenom.charAt(0)}{user?.nom.charAt(0)}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.prenom} {user?.nom}</div>
              <div className="user-role">
                {user?.role === 'super-admin' ? 'Super Admin' : 'Administrateur'}
              </div>
            </div>
            <ChevronDown size={16} className="chevron" />
          </button>

          {showUserMenu && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <div className="user-avatar-large">
                  {user?.prenom.charAt(0)}{user?.nom.charAt(0)}
                </div>
                <div className="user-details">
                  <div className="user-name-large">{user?.prenom} {user?.nom}</div>
                  <div className="user-email">{user?.email}</div>
                </div>
              </div>
              <div className="user-menu-items">
                <button className="user-menu-item" onClick={handleProfileClick}>
                  <User size={16} />
                  <span>Profil</span>
                </button>
                <button className="user-menu-item" onClick={handleSettingsClick}>
                  <Settings size={16} />
                  <span>Paramètres</span>
                </button>
                <hr className="user-menu-divider" />
                <button className="user-menu-item logout" onClick={handleLogout}>
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
