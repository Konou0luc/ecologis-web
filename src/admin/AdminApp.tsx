import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import HouseManagement from './pages/HouseManagement';
import ResidentManagement from './pages/ResidentManagement';
import ConsumptionManagement from './pages/ConsumptionManagement';
import BillingManagement from './pages/BillingManagement';
import SubscriptionManagement from './pages/SubscriptionManagement';
import MessagingManagement from './pages/MessagingManagement';
import NotificationManagement from './pages/NotificationManagement';
import LogsManagement from './pages/LogsManagement';
import SettingsManagement from './pages/SettingsManagement';
import ProfileManagement from './pages/ProfileManagement';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import './styles/AdminApp.css';
import './styles/AdminTheme.css';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  // Déterminer quelle page afficher basée sur l'URL
  const getCurrentPage = () => {
    const path = location.pathname;
    
    if (path === '/profile') {
      return <ProfileManagement />;
    }
    if (path === '/settings') {
      return <SettingsManagement />;
    }
    if (path.startsWith('/admin/')) {
      const adminPath = path.replace('/admin', '');
      switch (adminPath) {
        case '/':
        case '/dashboard':
          return <Dashboard />;
        case '/users':
          return <UserManagement />;
        case '/houses':
          return <HouseManagement />;
        case '/residents':
          return <ResidentManagement />;
        case '/consumptions':
          return <ConsumptionManagement />;
        case '/billing':
          return <BillingManagement />;
        case '/subscriptions':
          return <SubscriptionManagement />;
        case '/messaging':
          return <MessagingManagement />;
        case '/notifications':
          return <NotificationManagement />;
        case '/logs':
          return <LogsManagement />;
        case '/settings':
          return <SettingsManagement />;
        case '/profile':
          return <ProfileManagement />;
        default:
          return <Dashboard />;
      }
    }
    
    // Par défaut, afficher le dashboard
    return <Dashboard />;
  };

  return (
    <MenuProvider>
      <div className="admin-app">
        <Sidebar />
        <div className="admin-main">
          <Header />
          <main className="admin-content">
            {getCurrentPage()}
          </main>
        </div>
      </div>
    </MenuProvider>
  );
};

const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
};

export default AdminApp;
