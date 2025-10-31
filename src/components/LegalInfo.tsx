import React from 'react';
import { Info, Mail, Phone, MapPin, Globe, Shield, CreditCard, Users } from 'lucide-react';

const LegalInfo: React.FC = () => {
  return (
    <div className="legal-info">
      <div className="container-custom">
        {/* Header */}
        <div className="legal-header">
          <div className="legal-icon">
            <Info size={48} color="#FFA800" />
          </div>
          <h1 className="legal-title">
            Informations Légales
          </h1>
          <p className="legal-subtitle">
            Informations requises pour Google Play Store
          </p>
        </div>

        {/* Company Information */}
        <div className="legal-section">
          <h2>Informations de l'Entreprise</h2>
          <div className="info-grid">
            <div className="info-card">
              <Globe className="icon" />
              <h3>Nom de l'Application</h3>
              <p>Ecopower</p>
            </div>
            <div className="info-card">
              <Users className="icon" />
              <h3>Développeur</h3>
              <p>Ecopower Technologies</p>
            </div>
            <div className="info-card">
              <MapPin className="icon" />
              <h3>Pays/Région</h3>
              <p>Togo, Afrique de l'Ouest</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="legal-section">
          <h2>Informations de Contact</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <Mail className="icon" />
              <h3>Email de Support</h3>
              <p>konouluc0@gmail.com</p>
            </div>
            <div className="contact-card">
              <Phone className="icon" />
              <h3>Téléphone</h3>
              <p>+228 97240460</p>
            </div>
            <div className="contact-card">
              <Globe className="icon" />
              <h3>Site Web</h3>
              <p>https://ecologis-web.vercel.app/</p>
            </div>
            <div className="contact-card">
              <MapPin className="icon" />
              <h3>Adresse</h3>
              <p>Lomé, Togo</p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="legal-section">
          <h2>Informations de l'Application</h2>
          <div className="app-info">
            <div className="app-details">
              <h3>Nom de l'App (30 caractères max)</h3>
              <p className="app-name">Ecopower</p>
            </div>
            <div className="app-details">
              <h3>Courte Description (80 caractères max)</h3>
              <p className="app-short-desc">Gestion intelligente de consommation électrique pour propriétaires</p>
            </div>
            <div className="app-details">
              <h3>Description Longue (4000 caractères max)</h3>
              <div className="app-long-desc">
                <p>
                  <strong>Ecopower - Révolutionnez votre gestion d'énergie</strong>
                </p>
                <p>
                  Ecopower est la solution complète qui transforme votre gestion de consommation électrique 
                  en avantage concurrentiel. Conçue spécialement pour les propriétaires et gestionnaires 
                  de biens immobiliers au Togo, notre application mobile vous offre un contrôle total sur 
                  votre consommation énergétique.
                </p>
                <p>
                  <strong>Fonctionnalités principales :</strong>
                </p>
                <ul>
                  <li>📊 Suivi en temps réel de la consommation électrique</li>
                  <li>🧾 Génération automatique de factures détaillées</li>
                  <li>📈 Analyses et rapports personnalisés</li>
                  <li>💰 Gestion des paiements et recouvrements</li>
                  <li>🔔 Notifications intelligentes et alertes</li>
                  <li>📱 Interface moderne et intuitive</li>
                  <li>🌍 Support multilingue (Français, Anglais)</li>
                </ul>
                <p>
                  <strong>Avantages :</strong>
                </p>
                <ul>
                  <li>300% ROI moyen dès les premières semaines</li>
                  <li>85% de gain de temps sur la gestion administrative</li>
                  <li>99.9% de disponibilité garantie</li>
                  <li>Déploiement en 24h</li>
                </ul>
                <p>
                  <strong>Plans d'abonnement :</strong>
                </p>
                <ul>
                  <li>Basic : 166 FCFA/mois - Idéal pour petites propriétés</li>
                  <li>Premium : 650 FCFA/mois - Parfait pour propriétés moyennes</li>
                  <li>Enterprise : 800 FCFA/mois - Pour grandes propriétés</li>
                </ul>
                <p>
                  Rejoignez les propriétaires leaders qui ont déjà fait le choix de l'excellence avec Ecopower. 
                  Téléchargez maintenant et transformez votre gestion énergétique !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="legal-section">
          <h2>Données Collectées</h2>
          <div className="data-info">
            <div className="data-category">
              <Shield className="icon" />
              <h3>Données Personnelles</h3>
              <ul>
                <li>Nom complet</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Adresse physique</li>
              </ul>
            </div>
            <div className="data-category">
              <CreditCard className="icon" />
              <h3>Données Financières</h3>
              <ul>
                <li>Consommation électrique</li>
                <li>Données de facturation</li>
                <li>Historique des paiements</li>
                <li>Informations de paiement (sécurisées)</li>
              </ul>
            </div>
            <div className="data-category">
              <Globe className="icon" />
              <h3>Données Techniques</h3>
              <ul>
                <li>Adresse IP</li>
                <li>Type d'appareil</li>
                <li>Système d'exploitation</li>
                <li>Données d'utilisation de l'app</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="legal-section">
          <h2>Permissions de l'Application</h2>
          <div className="permissions-info">
            <div className="permission-item">
              <h3>📱 Notifications</h3>
              <p>Pour envoyer des alertes de consommation et rappels de paiement</p>
            </div>
            <div className="permission-item">
              <h3>📊 Stockage</h3>
              <p>Pour sauvegarder les données de consommation et paramètres</p>
            </div>
            <div className="permission-item">
              <h3>🌐 Internet</h3>
              <p>Pour synchroniser les données et accéder aux services cloud</p>
            </div>
            <div className="permission-item">
              <h3>📧 E-mail</h3>
              <p>Pour envoyer des factures et notifications par e-mail</p>
            </div>
          </div>
        </div>

        {/* Content Rating */}
        <div className="legal-section">
          <h2>Classification du Contenu</h2>
          <div className="content-rating">
            <p><strong>Classification :</strong> Tout public</p>
            <p><strong>Contenu :</strong> Aucun contenu inapproprié</p>
            <p><strong>Publicités :</strong> Aucune publicité tierce</p>
            <p><strong>Paiements :</strong> Paiements intégrés pour abonnements</p>
          </div>
        </div>

        {/* Legal Links */}
        <div className="legal-section">
          <h2>Liens Légaux</h2>
          <div className="legal-links">
            <a href="/privacy-policy" className="legal-link">
              <Shield className="icon" />
              Politique de Confidentialité
            </a>
            <a href="/terms-of-service" className="legal-link">
              <Info className="icon" />
              Conditions d'Utilisation
            </a>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="compliance-notice">
          <Shield className="icon" />
          <p>
            Cette application est conforme aux exigences de Google Play Store et aux lois 
            togolaises en vigueur en matière de protection des données.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;
