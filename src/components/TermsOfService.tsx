import React from 'react';
import { FileText, Scale, AlertCircle, Shield, CreditCard, Users } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-of-service">
      <div className="container-custom">
        {/* Header */}
        <div className="terms-header">
          <div className="terms-icon">
            <FileText size={48} color="#FFA800" />
          </div>
          <h1 className="terms-title">
            Conditions d'Utilisation
          </h1>
          <p className="terms-subtitle">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Introduction */}
        <div className="terms-section">
          <h2>1. Acceptation des Conditions</h2>
          <p>
            En utilisant l'application Ecopower, vous acceptez d'être lié par ces conditions d'utilisation. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>
        </div>

        {/* Service Description */}
        <div className="terms-section">
          <h2>2. Description du Service</h2>
          <p>
            Ecopower est une plateforme de gestion de consommation électrique qui permet aux propriétaires 
            et gestionnaires de biens immobiliers de :
          </p>
          <ul>
            <li>Suivre la consommation électrique en temps réel</li>
            <li>Générer des factures automatiquement</li>
            <li>Analyser les tendances de consommation</li>
            <li>Gérer les paiements des résidents</li>
            <li>Recevoir des notifications et alertes</li>
          </ul>
        </div>

        {/* User Accounts */}
        <div className="terms-section">
          <h2>3. Comptes Utilisateur</h2>
          <h3><Users className="icon" /> Création de Compte</h3>
          <p>
            Pour utiliser nos services, vous devez créer un compte en fournissant des informations 
            exactes et complètes. Vous êtes responsable de maintenir la confidentialité de votre compte.
          </p>
          
          <h3><Shield className="icon" /> Sécurité du Compte</h3>
          <p>
            Vous êtes responsable de toutes les activités qui se produisent sous votre compte. 
            Vous devez immédiatement nous notifier de toute utilisation non autorisée.
          </p>
        </div>

        {/* Payment Terms */}
        <div className="terms-section">
          <h2>4. Conditions de Paiement</h2>
          <h3><CreditCard className="icon" /> Abonnements</h3>
          <p>
            Nos services sont fournis sur la base d'abonnements payants. Les tarifs sont disponibles 
            sur notre site web et peuvent être modifiés avec un préavis de 30 jours.
          </p>
          
          <h3>Facturation</h3>
          <ul>
            <li>Les paiements sont dus à l'avance</li>
            <li>Les factures sont générées automatiquement</li>
            <li>Les paiements en retard peuvent entraîner la suspension du service</li>
            <li>Aucun remboursement pour les services déjà fournis</li>
          </ul>
        </div>

        {/* User Obligations */}
        <div className="terms-section">
          <h2>5. Obligations de l'Utilisateur</h2>
          <p>En utilisant Ecopower, vous vous engagez à :</p>
          <ul>
            <li>Fournir des informations exactes et à jour</li>
            <li>Respecter toutes les lois applicables</li>
            <li>Ne pas utiliser le service à des fins illégales</li>
            <li>Ne pas tenter de contourner les mesures de sécurité</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Maintenir la confidentialité des données d'autres utilisateurs</li>
          </ul>
        </div>

        {/* Prohibited Uses */}
        <div className="terms-section">
          <h2>6. Utilisations Interdites</h2>
          <p>Il est interdit d'utiliser Ecopower pour :</p>
          <ul>
            <li>Des activités illégales ou non autorisées</li>
            <li>Transmettre des virus ou codes malveillants</li>
            <li>Collecter des informations sur d'autres utilisateurs</li>
            <li>Interférer avec le fonctionnement du service</li>
            <li>Utiliser des robots ou scripts automatisés</li>
            <li>Violer les droits de propriété intellectuelle</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div className="terms-section">
          <h2>7. Propriété Intellectuelle</h2>
          <p>
            Ecopower et son contenu sont protégés par les lois sur la propriété intellectuelle. 
            Vous ne pouvez pas copier, modifier, distribuer ou créer des œuvres dérivées sans 
            notre autorisation écrite.
          </p>
        </div>

        {/* Privacy */}
        <div className="terms-section">
          <h2>8. Confidentialité</h2>
          <p>
            Votre vie privée est importante pour nous. Notre collecte et utilisation de vos 
            données personnelles sont régies par notre 
            <a href="/privacy-policy" style={{ color: '#FFA800', textDecoration: 'none' }}>
              Politique de Confidentialité
            </a>.
          </p>
        </div>

        {/* Service Availability */}
        <div className="terms-section">
          <h2>9. Disponibilité du Service</h2>
          <p>
            Nous nous efforçons de maintenir le service disponible 24h/24, 7j/7, mais nous ne 
            garantissons pas une disponibilité ininterrompue. Nous nous réservons le droit de 
            suspendre temporairement le service pour maintenance.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="terms-section">
          <h2>10. Limitation de Responsabilité</h2>
          <p>
            Dans la mesure permise par la loi, Ecopower ne sera pas responsable des dommages 
            indirects, consécutifs, spéciaux ou punitifs résultant de l'utilisation de notre service.
          </p>
        </div>

        {/* Indemnification */}
        <div className="terms-section">
          <h2>11. Indemnisation</h2>
          <p>
            Vous acceptez d'indemniser et de dégager Ecopower de toute responsabilité concernant 
            les réclamations résultant de votre utilisation du service ou de votre violation de 
            ces conditions.
          </p>
        </div>

        {/* Termination */}
        <div className="terms-section">
          <h2>12. Résiliation</h2>
          <p>
            Nous pouvons suspendre ou résilier votre compte à tout moment pour violation de ces 
            conditions. Vous pouvez également résilier votre compte à tout moment en nous contactant.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="terms-section">
          <h2>13. Modifications des Conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
            importantes seront communiquées par e-mail ou via l'application.
          </p>
        </div>

        {/* Governing Law */}
        <div className="terms-section">
          <h2>14. Droit Applicable</h2>
          <p>
            Ces conditions sont régies par les lois de la République Togolaise. Tout litige sera 
            soumis à la juridiction des tribunaux de Lomé.
          </p>
        </div>

        {/* Contact */}
        <div className="terms-section">
          <h2>15. Contact</h2>
          <p>
            Pour toute question concernant ces conditions d'utilisation, contactez-nous :
          </p>
          <div className="contact-info">
            <p><strong>Email :</strong> konouluc0@gmail.com</p>
            <p><strong>Téléphone :</strong> +228 97240460</p>
            <p><strong>Adresse :</strong> Lomé, Togo</p>
            <p><strong>Site web :</strong> https://ecologis-web.vercel.app/</p>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="legal-notice">
          <AlertCircle className="icon" />
          <p>
            Ces conditions d'utilisation constituent un accord légal contraignant. 
            Veuillez les lire attentivement avant d'utiliser notre service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
