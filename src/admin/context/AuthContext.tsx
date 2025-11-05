import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'super-admin' | 'proprietaire';
  firstLogin?: boolean;
  abonnementId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'https://ecopower-api.vercel.app';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('admin_access_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Vérifier si l'utilisateur a les droits admin
        if (parsedUser.role === 'admin' || parsedUser.role === 'super-admin') {
          setUser(parsedUser);
        } else {
          // Nettoyer le localStorage si l'utilisateur n'a pas les droits
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          localStorage.removeItem('admin_user');
        }
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 [FRONTEND] Tentative de connexion pour:', email);
      console.log('🔐 [FRONTEND] URL:', `${API_BASE_URL}/auth/login`);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          motDePasse: password,
        }),
      });

      console.log('🔐 [FRONTEND] Réponse status:', response.status);
      console.log('🔐 [FRONTEND] Réponse ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('🔐 [FRONTEND] Données reçues:', { 
          user: data.user?.email, 
          role: data.user?.role,
          hasToken: !!data.accessToken 
        });
        
        // Vérifier si l'utilisateur a les droits admin
        if (data.user && (data.user.role === 'admin' || data.user.role === 'super-admin')) {
          setUser(data.user);
          localStorage.setItem('admin_access_token', data.accessToken);
          localStorage.setItem('admin_refresh_token', data.refreshToken);
          localStorage.setItem('admin_user', JSON.stringify(data.user));
          console.log('✅ [FRONTEND] Connexion réussie pour admin');
          return true;
        } else {
          console.log('❌ [FRONTEND] Utilisateur sans droits admin. Role:', data.user?.role);
          throw new Error('Accès refusé. Droits administrateur requis.');
        }
      } else {
        let errorMessage = 'Erreur de connexion';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `Erreur HTTP ${response.status}`;
          console.log('❌ [FRONTEND] Erreur serveur:', errorMessage);
        } catch (e) {
          console.log('❌ [FRONTEND] Impossible de parser la réponse d\'erreur');
          errorMessage = `Erreur HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('💥 [FRONTEND] Erreur de connexion:', error);
      console.error('💥 [FRONTEND] Message:', error.message);
      console.error('💥 [FRONTEND] Stack:', error.stack);
      
      // Si c'est une erreur réseau
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('💥 [FRONTEND] Erreur réseau - Le serveur n\'est pas accessible');
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion internet et que l\'API est accessible.');
      }
      
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('admin_refresh_token');
      if (!refreshTokenValue) return false;

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_access_token', data.accessToken);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Erreur lors du refresh token:', error);
      logout();
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
