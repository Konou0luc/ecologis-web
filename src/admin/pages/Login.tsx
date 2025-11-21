import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationContainer from '../../components/NotificationContainer';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { notifications, removeNotification, showError, showSuccess, showWarning, showInfo } = useNotifications();

  // Notification de bienvenue au chargement de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      showInfo('Bienvenue', 'Connectez-vous à votre espace administrateur Ecopower.');
    }, 1000);

    return () => clearTimeout(timer);
  }, [showInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation des champs
    if (!email || !password) {
      showWarning('Champs requis', 'Veuillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Email invalide', 'Veuillez saisir une adresse email valide.');
      setLoading(false);
      return;
    }

    // Validation de la longueur du mot de passe
    if (password.length < 6) {
      showWarning('Mot de passe trop court', 'Le mot de passe doit contenir au moins 6 caractères.');
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        showSuccess('Connexion réussie', 'Vous êtes maintenant connecté à votre compte administrateur.');
        // Redirection après un court délai pour laisser le temps de voir la notification
        // Utiliser navigate au lieu de window.location.href pour rester dans l'application React
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true });
        }, 1500);
      } else {
        showError('Échec de la connexion', 'Email ou mot de passe incorrect, ou accès administrateur requis.');
      }
    } catch (err: any) {
      console.error('Erreur de connexion:', err.message);
      // Gestion des erreurs spécifiques du serveur
      let errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
      let errorTitle = 'Erreur de connexion';
      
      if (err.response) {
        // Erreur HTTP du serveur
        const status = err.response.status;
        const data = err.response.data;
        
        switch (status) {
          case 401:
            errorTitle = 'Authentification échouée';
            errorMessage = data?.message || 'Email ou mot de passe incorrect.';
            break;
          case 403:
            errorTitle = 'Accès refusé';
            errorMessage = 'Vous n\'avez pas les droits d\'accès administrateur.';
            break;
          case 404:
            errorTitle = 'Service indisponible';
            errorMessage = 'Le service d\'authentification est temporairement indisponible.';
            break;
          case 429:
            errorTitle = 'Trop de tentatives';
            errorMessage = 'Trop de tentatives de connexion. Veuillez attendre quelques minutes.';
            break;
          case 500:
            errorTitle = 'Erreur serveur';
            errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = data?.message || `Erreur serveur (${status}). Veuillez réessayer.`;
        }
      } else if (err.request) {
        // Problème de réseau
        errorTitle = 'Problème de connexion';
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
      } else {
        // Autre erreur
        errorMessage = err.message || 'Une erreur inattendue s\'est produite.';
      }
      
      showError(errorTitle, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NotificationContainer 
        notifications={notifications}
        onRemove={removeNotification}
      />
      <div className="modern-login-container">
        <div className="login-left-section">
        <div className="login-form-container">
          {/* Logo */}
          <div className="login-brand">
            <div className="brand-icon">
              <Zap size={24} />
            </div>
            <span className="brand-text">Ecopower</span>
          </div>

          {/* Welcome Message */}
          <div className="welcome-section">
            <h1 className="welcome-title">Holla, Welcome Back</h1>
            <p className="welcome-subtitle">Hey, welcome back to your special place</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modern-login-form">
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="stanley@gmail.com"
                required
                disabled={loading}
                className="modern-input"
              />
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="........."
                  required
                  disabled={loading}
                  className="modern-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="modern-signin-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="login-footer-link">
            <span>Don't have an account? </span>
            <a href="#" className="signup-link">Sign Up</a>
          </div>
        </div>
      </div>

      <div className="login-right-section">
        <div className="illustration-container">
          {/* Character */}
          <div className="floating-character">
            <div className="character-body">
              <div className="character-head"></div>
              <div className="character-torso"></div>
              <div className="character-bag"></div>
            </div>
          </div>

          {/* Smartphone */}
          <div className="smartphone-container">
            <div className="smartphone">
              <div className="phone-screen">
                <div className="fingerprint-icon">
                  <div className="fingerprint-animation">
                    <div className="scan-circle"></div>
                    <div className="scan-square"></div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="phone-text">Please tap your finger to your phone</div>
                <div className="phone-controls">
                  <div className="brightness-icon"></div>
                  <div className="menu-icon"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Bubble */}
          <div className="success-bubble">
            <CheckCircle size={24} />
          </div>

          {/* Security Lock */}
          <div className="security-lock">
            <Shield size={48} />
          </div>

          {/* Clouds */}
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
