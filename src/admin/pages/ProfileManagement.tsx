import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Shield, 
  Key, 
  Camera,
  Save,
  Edit3,
  Check,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import './ProfileManagement.css';

interface AdminProfile {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
  };
  role: string;
  dateCreation: string;
  derniereConnexion: string;
  avatar?: string;
  preferences: {
    theme: 'dark' | 'light';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    langue: string;
  };
}

const ProfileManagement: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: {
      rue: '',
      ville: '',
      codePostal: '',
      pays: ''
    },
    preferences: {
      theme: 'dark' as 'dark' | 'light',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      langue: 'fr'
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler le chargement du profil admin
      const mockProfile: AdminProfile = {
        _id: 'admin-1',
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@ecologis.tg',
        telephone: '+228 90 12 34 56',
        adresse: {
          rue: '123 Avenue de la Paix',
          ville: 'Lomé',
          codePostal: 'BP 1234',
          pays: 'Togo'
        },
        role: 'Super Admin',
        dateCreation: '2024-01-15T10:30:00Z',
        derniereConnexion: '2024-12-19T14:25:00Z',
        avatar: '',
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          langue: 'fr'
        }
      };

      setProfile(mockProfile);
      setFormData({
        nom: mockProfile.nom,
        prenom: mockProfile.prenom,
        email: mockProfile.email,
        telephone: mockProfile.telephone || '',
        adresse: mockProfile.adresse || {
          rue: '',
          ville: '',
          codePostal: '',
          pays: ''
        },
        preferences: mockProfile.preferences
      });
    } catch (err) {
      setError('Erreur lors du chargement du profil');
      console.error('Erreur profil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProfile(prev => prev ? {
        ...prev,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        preferences: formData.preferences
      } : null);
      
      setEditing(false);
      setSuccess('Profil mis à jour avec succès');
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Simuler le changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      setSuccess('Mot de passe modifié avec succès');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <User size={48} />
        <h3>Erreur de chargement</h3>
        <p>Impossible de charger le profil administrateur.</p>
        <button onClick={loadProfile}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="profile-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles et paramètres de compte</p>
        </div>
        <div className="header-actions">
          {editing ? (
            <div className="action-buttons">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    nom: profile.nom,
                    prenom: profile.prenom,
                    email: profile.email,
                    telephone: profile.telephone || '',
                    adresse: {
                      rue: profile.adresse?.rue || '',
                      ville: profile.adresse?.ville || '',
                      codePostal: profile.adresse?.codePostal || '',
                      pays: profile.adresse?.pays || ''
                    },
                    preferences: profile.preferences
                  });
                }}
              >
                <X size={20} />
                <span>Annuler</span>
              </button>
              <button 
                className="save-btn"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? (
                  <div className="spinning">
                    <Save size={20} />
                  </div>
                ) : (
                  <Check size={20} />
                )}
                <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
              </button>
            </div>
          ) : (
            <button 
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              <Edit3 size={20} />
              <span>Modifier</span>
            </button>
          )}
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

      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-container">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  <User size={48} />
                </div>
              )}
              {editing && (
                <button className="avatar-upload">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="avatar-info">
              <h2>{profile.prenom} {profile.nom}</h2>
              <p className="role">{profile.role}</p>
              <p className="email">{profile.email}</p>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">{formatDate(profile.dateCreation)}</div>
              <div className="stat-label">Membre depuis</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{formatDate(profile.derniereConnexion)}</div>
              <div className="stat-label">Dernière connexion</div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="profile-sections">
          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <User size={24} />
              <h3>Informations personnelles</h3>
            </div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="profile-section">
            <div className="section-header">
              <MapPin size={24} />
              <h3>Adresse</h3>
            </div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Rue</label>
                  <input
                    type="text"
                    value={formData.adresse.rue}
                    onChange={(e) => handleInputChange('adresse.rue', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    value={formData.adresse.ville}
                    onChange={(e) => handleInputChange('adresse.ville', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input
                    type="text"
                    value={formData.adresse.codePostal}
                    onChange={(e) => handleInputChange('adresse.codePostal', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
                <div className="form-group">
                  <label>Pays</label>
                  <input
                    type="text"
                    value={formData.adresse.pays}
                    onChange={(e) => handleInputChange('adresse.pays', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="profile-section">
            <div className="section-header">
              <Shield size={24} />
              <h3>Sécurité</h3>
            </div>
            <div className="section-content">
              <div className="security-actions">
                <button 
                  className="security-btn"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  <Key size={20} />
                  <span>Changer le mot de passe</span>
                </button>
              </div>

              {showPasswordForm && (
                <div className="password-form">
                  <h4>Changer le mot de passe</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Mot de passe actuel</label>
                      <div className="password-input">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            currentPassword: e.target.value
                          }))}
                          placeholder="Entrez votre mot de passe actuel"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="password-toggle"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Nouveau mot de passe</label>
                      <div className="password-input">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          placeholder="Entrez votre nouveau mot de passe"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="password-toggle"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Confirmer le mot de passe</label>
                      <div className="password-input">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            confirmPassword: e.target.value
                          }))}
                          placeholder="Confirmez votre nouveau mot de passe"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="password-toggle"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="password-actions">
                    <button 
                      className="cancel-btn"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                    >
                      <X size={20} />
                      <span>Annuler</span>
                    </button>
                    <button 
                      className="save-btn"
                      onClick={handleChangePassword}
                      disabled={saving}
                    >
                      {saving ? (
                        <div className="spinning">
                          <Save size={20} />
                        </div>
                      ) : (
                        <Check size={20} />
                      )}
                      <span>{saving ? 'Changement...' : 'Changer'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="profile-section">
            <div className="section-header">
              <Calendar size={24} />
              <h3>Préférences</h3>
            </div>
            <div className="section-content">
              <div className="preferences-grid">
                <div className="preference-group">
                  <label>Thème</label>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => handleInputChange('preferences.theme', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  >
                    <option value="dark">Sombre</option>
                    <option value="light">Clair</option>
                  </select>
                </div>
                <div className="preference-group">
                  <label>Langue</label>
                  <select
                    value={formData.preferences.langue}
                    onChange={(e) => handleInputChange('preferences.langue', e.target.value)}
                    disabled={!editing}
                    className={editing ? 'editable' : ''}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="notifications-section">
                <h4>Notifications</h4>
                <div className="notification-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.email}
                      onChange={(e) => handleInputChange('preferences.notifications.email', e.target.checked)}
                      disabled={!editing}
                    />
                    <span>Notifications par email</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.push}
                      onChange={(e) => handleInputChange('preferences.notifications.push', e.target.checked)}
                      disabled={!editing}
                    />
                    <span>Notifications push</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.sms}
                      onChange={(e) => handleInputChange('preferences.notifications.sms', e.target.checked)}
                      disabled={!editing}
                    />
                    <span>Notifications SMS</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
