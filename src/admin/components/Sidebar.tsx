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
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';

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

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/admin', '');
    return currentPath === `/${path}` || (path === 'dashboard' && currentPath === '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#262626] text-white z-50
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#333333]">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFA800] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-base">Ecopower</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#FFA800] rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5 text-black" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#333333] transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={`/admin/${item.path}`}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm
                    ${active 
                      ? 'bg-[#FFA800] text-black' 
                      : 'text-[#B0B0B0] hover:bg-[#333333] hover:text-white'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium text-left">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs font-semibold bg-[#F44336] text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-[#333333] p-3">
          <button
            onClick={logout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              text-[#B0B0B0] hover:bg-[#333333] hover:text-white transition-colors
              ${collapsed ? 'justify-center' : ''}
            `}
            title={collapsed ? 'Déconnexion' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
