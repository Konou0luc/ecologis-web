import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle, Globe, Clock, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-left">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={40} className="text-[#FFA800]" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-left">
              Politique de Confidentialité
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
            1. Introduction
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Chez Ecopower, nous nous engageons à protéger votre vie privée et vos données personnelles. 
            Cette politique de confidentialité explique comment nous collectons, utilisons, stockons 
            et protégeons vos informations lorsque vous utilisez notre application mobile et nos services.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left mt-4">
            En utilisant Ecopower, vous acceptez les pratiques décrites dans cette politique de confidentialité.
          </p>
        </section>

        {/* Data Collection */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            2. Données que nous collectons
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Nous collectons différents types de données pour vous fournir nos services :
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Database size={20} className="text-[#FFA800]" />
              Données d'identification
            </h3>
            <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
              <li className="pl-2 text-left">Nom complet</li>
              <li className="pl-2 text-left">Adresse e-mail</li>
              <li className="pl-2 text-left">Numéro de téléphone</li>
              <li className="pl-2 text-left">Adresse physique</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Database size={20} className="text-[#FFA800]" />
              Données de compte
            </h3>
            <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
              <li className="pl-2 text-left">Nom d'utilisateur</li>
              <li className="pl-2 text-left">Mot de passe (chiffré)</li>
              <li className="pl-2 text-left">Préférences de compte</li>
              <li className="pl-2 text-left">Paramètres de notification</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Database size={20} className="text-[#FFA800]" />
              Données d'utilisation
            </h3>
            <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
              <li className="pl-2 text-left">Consommation électrique</li>
              <li className="pl-2 text-left">Données de facturation</li>
              <li className="pl-2 text-left">Historique des paiements</li>
              <li className="pl-2 text-left">Statistiques d'utilisation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-left flex items-center gap-2">
              <Database size={20} className="text-[#FFA800]" />
              Données techniques
            </h3>
            <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
              <li className="pl-2 text-left">Adresse IP</li>
              <li className="pl-2 text-left">Type d'appareil</li>
              <li className="pl-2 text-left">Système d'exploitation</li>
              <li className="pl-2 text-left">Données de localisation</li>
            </ul>
          </div>
        </section>

        {/* Data Usage */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            3. Comment nous utilisons vos données
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Nous utilisons vos données personnelles pour les finalités suivantes :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left"><strong>Fourniture de services :</strong> Gérer votre compte, générer des factures et fournir un support client</li>
            <li className="pl-2 text-left"><strong>Communication :</strong> Envoyer des notifications importantes et répondre à vos demandes</li>
            <li className="pl-2 text-left"><strong>Amélioration des services :</strong> Analyser l'utilisation et développer de nouvelles fonctionnalités</li>
            <li className="pl-2 text-left"><strong>Sécurité et conformité :</strong> Protéger contre la fraude et respecter nos obligations légales</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            4. Partage de données
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, 
            sauf dans les cas suivants :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left"><strong>Prestataires de services :</strong> Partenaires de confiance qui nous aident à fournir nos services</li>
            <li className="pl-2 text-left"><strong>Obligations légales :</strong> Si la loi l'exige ou pour protéger nos droits</li>
            <li className="pl-2 text-left"><strong>Consentement :</strong> Avec votre consentement explicite</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            5. Sécurité des données
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Nous mettons en place des mesures de sécurité robustes pour protéger vos données :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left">Chiffrement des données sensibles</li>
            <li className="pl-2 text-left">Accès restreint aux données personnelles</li>
            <li className="pl-2 text-left">Surveillance continue de la sécurité</li>
            <li className="pl-2 text-left">Formation du personnel sur la protection des données</li>
            <li className="pl-2 text-left">Sauvegardes sécurisées</li>
          </ul>
        </section>

        {/* User Rights */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            6. Vos droits
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left"><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
            <li className="pl-2 text-left"><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
            <li className="pl-2 text-left"><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
            <li className="pl-2 text-left"><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
            <li className="pl-2 text-left"><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
            <li className="pl-2 text-left"><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            7. Conservation des données
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités 
            pour lesquelles elles ont été collectées :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left"><strong>Données de compte :</strong> 2 ans après la clôture de votre compte</li>
            <li className="pl-2 text-left"><strong>Données de facturation :</strong> 7 ans conformément à la législation togolaise</li>
            <li className="pl-2 text-left"><strong>Données d'utilisation :</strong> 1 an pour l'amélioration de nos services</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            8. Cookies et technologies similaires
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-left">
            Notre application mobile peut utiliser des technologies similaires aux cookies pour :
          </p>
          <ul className="list-disc list-outside space-y-2 text-[var(--color-text-secondary)] ml-6 text-left">
            <li className="pl-2 text-left">Mémoriser vos préférences</li>
            <li className="pl-2 text-left">Améliorer les performances</li>
            <li className="pl-2 text-left">Analyser l'utilisation de l'application</li>
            <li className="pl-2 text-left">Assurer la sécurité</li>
          </ul>
        </section>

        {/* Children Privacy */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            9. Protection des mineurs
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Notre service n'est pas destiné aux enfants de moins de 16 ans. Nous ne collectons 
            pas sciemment de données personnelles d'enfants de moins de 16 ans.
          </p>
        </section>

        {/* International Transfers */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            10. Transferts internationaux
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Vos données peuvent être transférées et traitées dans des pays autres que le Togo. 
            Nous nous assurons que ces transferts respectent les lois applicables en matière 
            de protection des données.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            11. Modifications de cette politique
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-left">
            Nous pouvons modifier cette politique de confidentialité de temps à autre. 
            Nous vous informerons de tout changement important par e-mail ou via l'application.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-[var(--color-border)]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
            12. Contact
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 text-left">
            Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
            contactez-nous :
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
              Cette politique de confidentialité constitue un document légal important. 
              Veuillez la lire attentivement pour comprendre comment nous protégeons vos données personnelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
