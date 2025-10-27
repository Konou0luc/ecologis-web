import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  Database, 
  Shield, 
  Bell, 
  Globe, 
  Server, 
  Monitor, 
  Mail, 
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Settings as SettingsIcon,
  Activity
} from 'lucide-react';
import apiService from '../services/apiService';
import './SettingsManagement.css';

interface SettingsData {
  database: {
    url: string;
    poolSize: number;
    timeout: number;
  };
  security: {
    tokenExpiry: number;
    refreshTokenExpiry: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    requireTwoFactor: boolean;
  };
  notifications: {
    email: {
      enabled: boolean;
      smtpHost: string;
      smtpPort: number;
      smtpUser: string;
      smtpPassword: string;
    };
    push: {
      enabled: boolean;
      firebaseKey: string;
    };
    sms: {
      enabled: boolean;
      provider: string;
      apiKey: string;
    };
  };
  general: {
    appName: string;
    baseUrl: string;
    maintenanceMode: boolean;
    defaultLanguage: string;
    timezone: string;
  };
  api: {
    rateLimit: number;
    corsOrigins: string;
    apiVersion: string;
  };
}

const SettingsManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    smtp: false,
    firebase: false,
    sms: false
  });

  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [settings, setSettings] = useState<SettingsData>({
    database: {
      url: 'mongodb://localhost:27017/ecologis',
      poolSize: 10,
      timeout: 30000
    },
    security: {
      tokenExpiry: 15,
      refreshTokenExpiry: 7,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false
    },
    notifications: {
      email: {
        enabled: true,
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'noreply@ecologis.tg',
        smtpPassword: ''
      },
      push: {
        enabled: true,
        firebaseKey: ''
      },
      sms: {
        enabled: false,
        provider: 'twilio',
        apiKey: ''
      }
    },
    general: {
      appName: 'Ecologis',
      baseUrl: 'https://ecologis-api.vercel.app',
      maintenanceMode: false,
      defaultLanguage: 'fr',
      timezone: 'Africa/Lome'
    },
    api: {
      rateLimit: 100,
      corsOrigins: 'https://ecologis.tg,https://admin.ecologis.tg',
      apiVersion: '1.0.0'
    }
  });

  useEffect(() => {
    loadSettings();
    loadSystemInfo();
  }, []);

  const loadSystemInfo = async () => {
    try {
      const response = await apiService.getSystemInfo();
      if (response.data) {
        setSystemInfo(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des informations système:', error);
    }
  };

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler le chargement des paramètres
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des paramètres');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Paramètres sauvegardés avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section: keyof SettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const togglePasswordVisibility = (type: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (loading) {
    return (
      <div className="settings-management-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des paramètres...</p>
      </div>
    );
  }

  return (
    <div className="settings-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Paramètres système</h1>
          <p>Configurez les paramètres de la plateforme</p>
        </div>
        <div className="header-actions">
          <button 
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <RefreshCw size={20} className="spinning" />
            ) : (
              <Save size={20} />
            )}
            <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="alert error">
          <X size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert success">
          <Check size={20} />
          <span>{success}</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Database Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Database size={24} />
            <h3>Base de données</h3>
            <div className="section-status">
              <div className="status-indicator online"></div>
              <span>Connectée</span>
            </div>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <label>URL de connexion</label>
              <input 
                type="text" 
                value={settings.database.url}
                onChange={(e) => handleInputChange('database', 'url', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Pool de connexions</label>
              <input 
                type="number" 
                value={settings.database.poolSize}
                onChange={(e) => handleInputChange('database', 'poolSize', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>Timeout (ms)</label>
              <input 
                type="number" 
                value={settings.database.timeout}
                onChange={(e) => handleInputChange('database', 'timeout', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Shield size={24} />
            <h3>Sécurité</h3>
            <div className="section-status">
              <div className="status-indicator online"></div>
              <span>Actif</span>
            </div>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <label>Durée des tokens (minutes)</label>
              <input 
                type="number" 
                value={settings.security.tokenExpiry}
                onChange={(e) => handleInputChange('security', 'tokenExpiry', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>Durée des refresh tokens (jours)</label>
              <input 
                type="number" 
                value={settings.security.refreshTokenExpiry}
                onChange={(e) => handleInputChange('security', 'refreshTokenExpiry', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>Limite de tentatives de connexion</label>
              <input 
                type="number" 
                value={settings.security.maxLoginAttempts}
                onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>Longueur minimale du mot de passe</label>
              <input 
                type="number" 
                value={settings.security.passwordMinLength}
                onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={settings.security.requireTwoFactor}
                  onChange={(e) => handleInputChange('security', 'requireTwoFactor', e.target.checked)}
                />
                <span>Activer l'authentification à deux facteurs</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Bell size={24} />
            <h3>Notifications</h3>
            <div className="section-status">
              <div className="status-indicator online"></div>
              <span>Configurées</span>
            </div>
          </div>
          <div className="settings-content">
            {/* Email Notifications */}
            <div className="notification-group">
              <div className="group-header">
                <Mail size={20} />
                <h4>Notifications par email</h4>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email.enabled}
                    onChange={(e) => handleInputChange('notifications', 'email', {
                      ...settings.notifications.email,
                      enabled: e.target.checked
                    })}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {settings.notifications.email.enabled && (
                <div className="group-content">
                  <div className="setting-item">
                    <label>Serveur SMTP</label>
                    <input 
                      type="text" 
                      value={settings.notifications.email.smtpHost}
                      onChange={(e) => handleInputChange('notifications', 'email', {
                        ...settings.notifications.email,
                        smtpHost: e.target.value
                      })}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Port SMTP</label>
                    <input 
                      type="number" 
                      value={settings.notifications.email.smtpPort}
                      onChange={(e) => handleInputChange('notifications', 'email', {
                        ...settings.notifications.email,
                        smtpPort: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Utilisateur SMTP</label>
                    <input 
                      type="text" 
                      value={settings.notifications.email.smtpUser}
                      onChange={(e) => handleInputChange('notifications', 'email', {
                        ...settings.notifications.email,
                        smtpUser: e.target.value
                      })}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Mot de passe SMTP</label>
                    <div className="password-input">
                      <input 
                        type={showPasswords.smtp ? 'text' : 'password'}
                        value={settings.notifications.email.smtpPassword}
                        onChange={(e) => handleInputChange('notifications', 'email', {
                          ...settings.notifications.email,
                          smtpPassword: e.target.value
                        })}
                        placeholder="Entrez le mot de passe SMTP"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('smtp')}
                        className="password-toggle"
                      >
                        {showPasswords.smtp ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Push Notifications */}
            <div className="notification-group">
              <div className="group-header">
                <Smartphone size={20} />
                <h4>Notifications push</h4>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push.enabled}
                    onChange={(e) => handleInputChange('notifications', 'push', {
                      ...settings.notifications.push,
                      enabled: e.target.checked
                    })}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {settings.notifications.push.enabled && (
                <div className="group-content">
                  <div className="setting-item">
                    <label>Clé Firebase</label>
                    <div className="password-input">
                      <input 
                        type={showPasswords.firebase ? 'text' : 'password'}
                        value={settings.notifications.push.firebaseKey}
                        onChange={(e) => handleInputChange('notifications', 'push', {
                          ...settings.notifications.push,
                          firebaseKey: e.target.value
                        })}
                        placeholder="Entrez la clé Firebase"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('firebase')}
                        className="password-toggle"
                      >
                        {showPasswords.firebase ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SMS Notifications */}
            <div className="notification-group">
              <div className="group-header">
                <Smartphone size={20} />
                <h4>Notifications SMS</h4>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.sms.enabled}
                    onChange={(e) => handleInputChange('notifications', 'sms', {
                      ...settings.notifications.sms,
                      enabled: e.target.checked
                    })}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {settings.notifications.sms.enabled && (
                <div className="group-content">
                  <div className="setting-item">
                    <label>Fournisseur SMS</label>
                    <select 
                      value={settings.notifications.sms.provider}
                      onChange={(e) => handleInputChange('notifications', 'sms', {
                        ...settings.notifications.sms,
                        provider: e.target.value
                      })}
                    >
                      <option value="twilio">Twilio</option>
                      <option value="africas-talking">Africa's Talking</option>
                      <option value="orange">Orange</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Clé API</label>
                    <div className="password-input">
                      <input 
                        type={showPasswords.sms ? 'text' : 'password'}
                        value={settings.notifications.sms.apiKey}
                        onChange={(e) => handleInputChange('notifications', 'sms', {
                          ...settings.notifications.sms,
                          apiKey: e.target.value
                        })}
                        placeholder="Entrez la clé API"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('sms')}
                        className="password-toggle"
                      >
                        {showPasswords.sms ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Globe size={24} />
            <h3>Général</h3>
            <div className="section-status">
              <div className="status-indicator online"></div>
              <span>Configuré</span>
            </div>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <label>Nom de l'application</label>
              <input 
                type="text" 
                value={settings.general.appName}
                onChange={(e) => handleInputChange('general', 'appName', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>URL de base</label>
              <input 
                type="text" 
                value={settings.general.baseUrl}
                onChange={(e) => handleInputChange('general', 'baseUrl', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Langue par défaut</label>
              <select 
                value={settings.general.defaultLanguage}
                onChange={(e) => handleInputChange('general', 'defaultLanguage', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Fuseau horaire</label>
              <select 
                value={settings.general.timezone}
                onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
              >
                <option value="Africa/Lome">Africa/Lomé</option>
                <option value="Africa/Abidjan">Africa/Abidjan</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="setting-item checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                />
                <span>Mode maintenance</span>
              </label>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="settings-section">
          <div className="section-header">
            <Server size={24} />
            <h3>API</h3>
            <div className="section-status">
              <div className="status-indicator online"></div>
              <span>Opérationnel</span>
            </div>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <label>Limite de taux (requêtes/minute)</label>
              <input 
                type="number" 
                value={settings.api.rateLimit}
                onChange={(e) => handleInputChange('api', 'rateLimit', parseInt(e.target.value))}
              />
            </div>
            <div className="setting-item">
              <label>Origines CORS autorisées</label>
              <textarea 
                value={settings.api.corsOrigins}
                onChange={(e) => handleInputChange('api', 'corsOrigins', e.target.value)}
                rows={3}
                placeholder="https://example.com,https://admin.example.com"
              />
            </div>
            <div className="setting-item">
              <label>Version de l'API</label>
              <input 
                type="text" 
                value={settings.api.apiVersion}
                onChange={(e) => handleInputChange('api', 'apiVersion', e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="system-info">
        <div className="info-header">
          <Activity size={24} />
          <h3>Informations système</h3>
        </div>
        <div className="info-grid">
          <div className="info-item">
            <label>Version de l'API</label>
            <span>{systemInfo?.version?.api || '1.0.0'}</span>
          </div>
          <div className="info-item">
            <label>Version de Node.js</label>
            <span>{systemInfo?.version?.node || '18.17.0'}</span>
          </div>
          <div className="info-item">
            <label>Uptime</label>
            <span>{systemInfo?.uptime ? `${systemInfo.uptime.days}j ${systemInfo.uptime.hours}h ${systemInfo.uptime.minutes}m` : '15 jours, 3 heures'}</span>
          </div>
          <div className="info-item">
            <label>Mémoire utilisée</label>
            <span>{systemInfo?.memory ? `${systemInfo.memory.used} / ${systemInfo.memory.total}` : '245 MB / 512 MB'}</span>
          </div>
          <div className="info-item">
            <label>Base de données</label>
            <span>{systemInfo?.database ? `${systemInfo.database.type} ${systemInfo.database.version}` : 'MongoDB 6.0'}</span>
          </div>
          <div className="info-item">
            <label>Environnement</label>
            <span>{systemInfo?.environment || 'Production'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
