import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  Database, 
  Shield, 
  Bell, 
  Globe, 
  Server, 
  Mail, 
  Smartphone,
  Eye,
  EyeOff,
  Check,
  X,
  Activity
} from 'lucide-react';
import apiService from '../services/apiService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';

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
      appName: 'Ecopower',
      baseUrl: 'https://ecopower-api.vercel.app',
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
    } catch {
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
    } catch {
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

  const handleNestedInputChange = (section: keyof SettingsData, subsection: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value
        }
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
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres système</h1>
          <p className="text-sm text-gray-500">Configurez les paramètres de la plateforme</p>
        </div>
        <AdminButton onClick={handleSave} disabled={saving}>
            {saving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Sauvegarde...
            </>
            ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </>
            )}
        </AdminButton>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <X className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Database Settings */}
        <AdminCard>
          <AdminCardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <AdminCardTitle className="text-left">Base de données</AdminCardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Connectée</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div>
              <label htmlFor="db-url" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                URL de connexion
              </label>
              <input 
                id="db-url"
                type="text" 
                value={settings.database.url}
                onChange={(e) => handleInputChange('database', 'url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="db-pool-size" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Pool de connexions
              </label>
              <input 
                id="db-pool-size"
                type="number" 
                value={settings.database.poolSize}
                onChange={(e) => handleInputChange('database', 'poolSize', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="db-timeout" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Timeout (ms)
              </label>
              <input 
                id="db-timeout"
                type="number" 
                value={settings.database.timeout}
                onChange={(e) => handleInputChange('database', 'timeout', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </AdminCardContent>
        </AdminCard>

        {/* Security Settings */}
        <AdminCard>
          <AdminCardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <AdminCardTitle className="text-left">Sécurité</AdminCardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Actif</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div>
              <label htmlFor="token-expiry" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Durée des tokens (minutes)
              </label>
              <input 
                id="token-expiry"
                type="number" 
                value={settings.security.tokenExpiry}
                onChange={(e) => handleInputChange('security', 'tokenExpiry', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="refresh-token-expiry" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Durée des refresh tokens (jours)
              </label>
              <input 
                id="refresh-token-expiry"
                type="number" 
                value={settings.security.refreshTokenExpiry}
                onChange={(e) => handleInputChange('security', 'refreshTokenExpiry', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="max-login-attempts" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Limite de tentatives de connexion
              </label>
              <input 
                id="max-login-attempts"
                type="number" 
                value={settings.security.maxLoginAttempts}
                onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="password-min-length" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Longueur minimale du mot de passe
              </label>
              <input 
                id="password-min-length"
                type="number" 
                value={settings.security.passwordMinLength}
                onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="flex items-center">
                <input 
                  id="require-two-factor"
                  type="checkbox" 
                  checked={settings.security.requireTwoFactor}
                  onChange={(e) => handleInputChange('security', 'requireTwoFactor', e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
              <label htmlFor="require-two-factor" className="ml-2 text-sm font-medium text-gray-700 text-left">
                Activer l'authentification à deux facteurs
              </label>
            </div>
          </AdminCardContent>
        </AdminCard>

        {/* Notifications Settings */}
        <AdminCard>
          <AdminCardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <AdminCardTitle className="text-left">Notifications</AdminCardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Configurées</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCardHeader>
          <AdminCardContent className="space-y-6">
            {/* Email Notifications */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 text-left">Notifications par email</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email.enabled}
                    onChange={(e) => handleNestedInputChange('notifications', 'email', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              {settings.notifications.email.enabled && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Serveur SMTP
                    </label>
                    <input 
                      id="smtp-host"
                      type="text" 
                      value={settings.notifications.email.smtpHost}
                      onChange={(e) => handleNestedInputChange('notifications', 'email', 'smtpHost', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Port SMTP
                    </label>
                    <input 
                      id="smtp-port"
                      type="number" 
                      value={settings.notifications.email.smtpPort}
                      onChange={(e) => handleNestedInputChange('notifications', 'email', 'smtpPort', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="smtp-user" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Utilisateur SMTP
                    </label>
                    <input 
                      id="smtp-user"
                      type="text" 
                      value={settings.notifications.email.smtpUser}
                      onChange={(e) => handleNestedInputChange('notifications', 'email', 'smtpUser', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Mot de passe SMTP
                    </label>
                    <div className="relative">
                      <input 
                        id="smtp-password"
                        type={showPasswords.smtp ? 'text' : 'password'}
                        value={settings.notifications.email.smtpPassword}
                        onChange={(e) => handleNestedInputChange('notifications', 'email', 'smtpPassword', e.target.value)}
                        placeholder="Entrez le mot de passe SMTP"
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('smtp')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.smtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Push Notifications */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 text-left">Notifications push</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push.enabled}
                    onChange={(e) => handleNestedInputChange('notifications', 'push', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              {settings.notifications.push.enabled && (
                <div className="mt-4">
                  <label htmlFor="firebase-key" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Clé Firebase
                  </label>
                  <div className="relative">
                      <input 
                        id="firebase-key"
                        type={showPasswords.firebase ? 'text' : 'password'}
                        value={settings.notifications.push.firebaseKey}
                      onChange={(e) => handleNestedInputChange('notifications', 'push', 'firebaseKey', e.target.value)}
                        placeholder="Entrez la clé Firebase"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('firebase')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                      {showPasswords.firebase ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                  </div>
                </div>
              )}
            </div>

            {/* SMS Notifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 text-left">Notifications SMS</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.sms.enabled}
                    onChange={(e) => handleNestedInputChange('notifications', 'sms', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              {settings.notifications.sms.enabled && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="sms-provider" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Fournisseur SMS
                    </label>
                    <select 
                      id="sms-provider"
                      value={settings.notifications.sms.provider}
                      onChange={(e) => handleNestedInputChange('notifications', 'sms', 'provider', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="twilio">Twilio</option>
                      <option value="africas-talking">Africa's Talking</option>
                      <option value="orange">Orange</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sms-api-key" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Clé API
                    </label>
                    <div className="relative">
                      <input 
                        id="sms-api-key"
                        type={showPasswords.sms ? 'text' : 'password'}
                        value={settings.notifications.sms.apiKey}
                        onChange={(e) => handleNestedInputChange('notifications', 'sms', 'apiKey', e.target.value)}
                        placeholder="Entrez la clé API"
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('sms')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.sms ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AdminCardContent>
        </AdminCard>

        {/* General Settings */}
        <AdminCard>
          <AdminCardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <AdminCardTitle className="text-left">Général</AdminCardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Configuré</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div>
              <label htmlFor="app-name" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Nom de l'application
              </label>
              <input 
                id="app-name"
                type="text" 
                value={settings.general.appName}
                onChange={(e) => handleInputChange('general', 'appName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="base-url" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                URL de base
              </label>
              <input 
                id="base-url"
                type="text" 
                value={settings.general.baseUrl}
                onChange={(e) => handleInputChange('general', 'baseUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="default-language" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Langue par défaut
              </label>
              <select 
                id="default-language"
                value={settings.general.defaultLanguage}
                onChange={(e) => handleInputChange('general', 'defaultLanguage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Fuseau horaire
              </label>
              <select 
                id="timezone"
                value={settings.general.timezone}
                onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="Africa/Lome">Africa/Lomé</option>
                <option value="Africa/Abidjan">Africa/Abidjan</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="flex items-center">
                <input 
                  id="maintenance-mode"
                  type="checkbox" 
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
              <label htmlFor="maintenance-mode" className="ml-2 text-sm font-medium text-gray-700 text-left">
                Mode maintenance
              </label>
            </div>
          </AdminCardContent>
        </AdminCard>

        {/* API Settings */}
        <AdminCard>
          <AdminCardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <AdminCardTitle className="text-left">API</AdminCardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Opérationnel</span>
                  </div>
                </div>
              </div>
            </div>
          </AdminCardHeader>
          <AdminCardContent className="space-y-4">
            <div>
              <label htmlFor="rate-limit" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Limite de taux (requêtes/minute)
              </label>
              <input 
                id="rate-limit"
                type="number" 
                value={settings.api.rateLimit}
                onChange={(e) => handleInputChange('api', 'rateLimit', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="cors-origins" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Origines CORS autorisées
              </label>
              <textarea 
                id="cors-origins"
                value={settings.api.corsOrigins}
                onChange={(e) => handleInputChange('api', 'corsOrigins', e.target.value)}
                rows={3}
                placeholder="https://example.com,https://admin.example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="api-version" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Version de l'API
              </label>
              <input 
                id="api-version"
                type="text" 
                value={settings.api.apiVersion}
                onChange={(e) => handleInputChange('api', 'apiVersion', e.target.value)}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </AdminCardContent>
        </AdminCard>
      </div>

      {/* System Information */}
      <AdminCard>
        <AdminCardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-left">
              <AdminCardTitle className="text-left">Informations système</AdminCardTitle>
        </div>
          </div>
        </AdminCardHeader>
        <AdminCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Version de l'API</label>
              <span className="text-base font-semibold text-gray-900">{systemInfo?.version?.api || '1.0.0'}</span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Version de Node.js</label>
              <span className="text-base font-semibold text-gray-900">{systemInfo?.version?.node || '18.17.0'}</span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Uptime</label>
              <span className="text-base font-semibold text-gray-900">
                {systemInfo?.uptime ? `${systemInfo.uptime.days}j ${systemInfo.uptime.hours}h ${systemInfo.uptime.minutes}m` : '15 jours, 3 heures'}
              </span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Mémoire utilisée</label>
              <span className="text-base font-semibold text-gray-900">
                {systemInfo?.memory ? `${systemInfo.memory.used} / ${systemInfo.memory.total}` : '245 MB / 512 MB'}
              </span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Base de données</label>
              <span className="text-base font-semibold text-gray-900">
                {systemInfo?.database ? `${systemInfo.database.type} ${systemInfo.database.version}` : 'MongoDB 6.0'}
              </span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1 text-left">Environnement</label>
              <span className="text-base font-semibold text-gray-900">{systemInfo?.environment || 'Production'}</span>
        </div>
      </div>
        </AdminCardContent>
      </AdminCard>
    </div>
  );
};

export default SettingsManagement;
