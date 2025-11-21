import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  ChevronDown,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { toggleMobileMenu } = useMenu();
  const navigate = useNavigate();

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

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F5F5F5] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#111827]" />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F5F5] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: Notifications & User Menu */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <Bell className="w-5 h-5 text-[#111827]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F44336] rounded-full border-2 border-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-20">
                  <div className="p-4 border-b border-[#E5E7EB]">
                    <h3 className="font-semibold text-[#111827]">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-[#E5E7EB] ${
                          notification.unread ? 'bg-[#F5F5F5]' : ''
                        }`}
                      >
                        <p className="text-sm font-medium text-[#111827]">
                          {notification.title}
                        </p>
                        <p className="text-xs text-[#666666] mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFA800] flex items-center justify-center">
                <span className="text-black text-sm font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#666666]" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-20">
                  <div className="p-4 border-b border-[#E5E7EB]">
                    <p className="text-sm font-semibold text-[#111827]">
                      {user?.email || 'Admin'}
                    </p>
                    <p className="text-xs text-[#666666] mt-1">Administrateur</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </button>
                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Paramètres</span>
                    </button>
                    <div className="border-t border-[#E5E7EB] my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F44336] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
