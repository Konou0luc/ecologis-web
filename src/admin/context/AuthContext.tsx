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

// Utiliser le proxy en développement pour éviter les problèmes CORS
// Le proxy redirige /auth et /admin vers l'API Vercel
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? '' // Utiliser le proxy setupProxy.js
  : 'https://ecopower-api.vercel.app';

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
      // Construire l'URL : utiliser le proxy en dev, URL directe en prod
      const url = API_BASE_URL ? `${API_BASE_URL}/auth/login` : '/auth/login';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          motDePasse: password,
        }),
        credentials: 'same-origin', // Important pour le proxy
      });
      
      // Vérifier le Content-Type avant de parser
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      // Lire la réponse (texte ou JSON)
      let data: any;
      let responseText: string | null = null;
      
      if (isJson) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('❌ [FRONTEND] Erreur de parsing JSON:', parseError);
          throw new Error('Réponse JSON invalide du serveur');
        }
      } else {
        // Si ce n'est pas du JSON, lire le texte
        responseText = await response.text();
        console.error('❌ [FRONTEND] Réponse non-JSON reçue:', {
          status: response.status,
          contentType,
          preview: responseText.substring(0, 200)
        });
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Token d\'accès requis ou expiré');
        }
        
        throw new Error('Le serveur a retourné une réponse invalide. Vérifiez que l\'API est correctement configurée.');
      }

      if (response.ok) {
        // Vérifier si l'utilisateur a les droits admin
        if (data.user && (data.user.role === 'admin' || data.user.role === 'super-admin')) {
          setUser(data.user);
          localStorage.setItem('admin_access_token', data.accessToken);
          localStorage.setItem('admin_refresh_token', data.refreshToken);
          localStorage.setItem('admin_user', JSON.stringify(data.user));
          return true;
        } else {
          throw new Error('Accès refusé. Droits administrateur requis.');
        }
      } else {
        // Erreur HTTP
        const errorMessage = data?.message || `Erreur HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error.message);
      
      // Si c'est une erreur réseau
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
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

      const url = API_BASE_URL ? `${API_BASE_URL}/auth/refresh` : '/auth/refresh';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
        }),
        credentials: 'same-origin',
      });

      // Vérifier le Content-Type avant de parser
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (response.ok && isJson) {
        try {
        const data = await response.json();
        localStorage.setItem('admin_access_token', data.accessToken);
        return true;
        } catch (parseError) {
          console.error('Erreur de parsing JSON lors du refresh token:', parseError);
          logout();
          return false;
        }
      } else {
        if (!isJson) {
          const text = await response.text();
          console.error('Réponse non-JSON lors du refresh token:', text.substring(0, 200));
        }
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
