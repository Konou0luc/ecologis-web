import React from 'react';
import { FileText, AlertCircle, Shield, CreditCard, Users } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-left">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={40} className="text-[#FFA800]" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-left">
              Conditions d'Utilisation
            </h1>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base text-left">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            1. Acceptation des Conditions
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            En utilisant l'application Ecopower, vous acceptez d'être lié par ces conditions d'utilisation. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>
        </section>

        {/* Service Description */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            2. Description du Service
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Ecopower est une plateforme de gestion de consommation électrique qui permet aux propriétaires 
            et gestionnaires de biens immobiliers de :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left">Suivre la consommation électrique en temps réel</li>
            <li className="pl-2 text-left">Générer des factures automatiquement</li>
            <li className="pl-2 text-left">Analyser les tendances de consommation</li>
            <li className="pl-2 text-left">Gérer les paiements des résidents</li>
            <li className="pl-2 text-left">Recevoir des notifications et alertes</li>
          </ul>
        </section>

        {/* User Accounts */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-left">
            3. Comptes Utilisateur
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Users size={20} className="text-[#FFA800]" />
              Création de Compte
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
              Pour utiliser nos services, vous devez créer un compte en fournissant des informations 
              exactes et complètes. Vous êtes responsable de maintenir la confidentialité de votre compte.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Shield size={20} className="text-[#FFA800]" />
              Sécurité du Compte
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
              Vous êtes responsable de toutes les activités qui se produisent sous votre compte. 
              Vous devez immédiatement nous notifier de toute utilisation non autorisée.
            </p>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-left">
            4. Conditions de Paiement
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <CreditCard size={20} className="text-[#FFA800]" />
              Abonnements
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
              Nos services sont fournis sur la base d'abonnements payants. Les tarifs sont disponibles 
              sur notre site web et peuvent être modifiés avec un préavis de 30 jours.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left">
              Facturation
            </h3>
            <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
              <li className="pl-2 text-left">Les paiements sont dus à l'avance</li>
              <li className="pl-2 text-left">Les factures sont générées automatiquement</li>
              <li className="pl-2 text-left">Les paiements en retard peuvent entraîner la suspension du service</li>
              <li className="pl-2 text-left">Aucun remboursement pour les services déjà fournis</li>
            </ul>
          </div>
        </section>

        {/* User Obligations */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            5. Obligations de l'Utilisateur
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            En utilisant Ecopower, vous vous engagez à :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left">Fournir des informations exactes et à jour</li>
            <li className="pl-2 text-left">Respecter toutes les lois applicables</li>
            <li className="pl-2 text-left">Ne pas utiliser le service à des fins illégales</li>
            <li className="pl-2 text-left">Ne pas tenter de contourner les mesures de sécurité</li>
            <li className="pl-2 text-left">Respecter les droits de propriété intellectuelle</li>
            <li className="pl-2 text-left">Maintenir la confidentialité des données d'autres utilisateurs</li>
          </ul>
        </section>

        {/* Prohibited Uses */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            6. Utilisations Interdites
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Il est interdit d'utiliser Ecopower pour :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left">Des activités illégales ou non autorisées</li>
            <li className="pl-2 text-left">Transmettre des virus ou codes malveillants</li>
            <li className="pl-2 text-left">Collecter des informations sur d'autres utilisateurs</li>
            <li className="pl-2 text-left">Interférer avec le fonctionnement du service</li>
            <li className="pl-2 text-left">Utiliser des robots ou scripts automatisés</li>
            <li className="pl-2 text-left">Violer les droits de propriété intellectuelle</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            7. Propriété Intellectuelle
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Ecopower et son contenu sont protégés par les lois sur la propriété intellectuelle. 
            Vous ne pouvez pas copier, modifier, distribuer ou créer des œuvres dérivées sans 
            notre autorisation écrite.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            8. Confidentialité
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Votre vie privée est importante pour nous. Notre collecte et utilisation de vos 
            données personnelles sont régies par notre{' '}
            <a 
              href="/privacy-policy" 
              className="text-[#FFA800] hover:underline transition-colors"
            >
              Politique de Confidentialité
            </a>.
          </p>
        </section>

        {/* Service Availability */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            9. Disponibilité du Service
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Nous nous efforçons de maintenir le service disponible 24h/24, 7j/7, mais nous ne 
            garantissons pas une disponibilité ininterrompue. Nous nous réservons le droit de 
            suspendre temporairement le service pour maintenance.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            10. Limitation de Responsabilité
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Dans la mesure permise par la loi, Ecopower ne sera pas responsable des dommages 
            indirects, consécutifs, spéciaux ou punitifs résultant de l'utilisation de notre service.
          </p>
        </section>

        {/* Indemnification */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            11. Indemnisation
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Vous acceptez d'indemniser et de dégager Ecopower de toute responsabilité concernant 
            les réclamations résultant de votre utilisation du service ou de votre violation de 
            ces conditions.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            12. Résiliation
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Nous pouvons suspendre ou résilier votre compte à tout moment pour violation de ces 
            conditions. Vous pouvez également résilier votre compte à tout moment en nous contactant.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            13. Modifications des Conditions
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
            importantes seront communiquées par e-mail ou via l'application.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            14. Droit Applicable
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Ces conditions sont régies par les lois de la République Togolaise. Tout litige sera 
            soumis à la juridiction des tribunaux de Lomé.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            15. Contact
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 text-left">
            Pour toute question concernant ces conditions d'utilisation, contactez-nous :
          </p>
          <div className="space-y-3 text-[var(--color-text-secondary)]">
            <p className="text-left">
              <strong className="text-[var(--color-text-primary)]">Email :</strong> konouluc0@gmail.com
            </p>
            <p className="text-left">
              <strong className="text-[var(--color-text-primary)]">Téléphone :</strong> +228 97240460
            </p>
            <p className="text-left">
              <strong className="text-[var(--color-text-primary)]">Adresse :</strong> Lomé, Togo
            </p>
            <p className="text-left">
              <strong className="text-[var(--color-text-primary)]">Site web :</strong>{' '}
              <a 
                href="https://ecologis-web.vercel.app/" 
                className="text-[#FFA800] hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ecologis-web.vercel.app/
              </a>
            </p>
          </div>
        </section>

        {/* Legal Notice */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[var(--color-card-bg)] rounded-lg border border-[var(--color-border)]">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-[#FFA800] flex-shrink-0 mt-1" />
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
              Ces conditions d'utilisation constituent un accord légal contraignant. 
              Veuillez les lire attentivement avant d'utiliser notre service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
