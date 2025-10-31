import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Globe, Clock, Users, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Shield },
    { id: 'data-collection', title: 'Données collectées', icon: Database },
    { id: 'data-usage', title: 'Utilisation des données', icon: Eye },
    { id: 'data-sharing', title: 'Partage de données', icon: Users },
    { id: 'data-security', title: 'Sécurité des données', icon: Lock },
    { id: 'user-rights', title: 'Vos droits', icon: UserCheck },
    { id: 'data-retention', title: 'Conservation des données', icon: Clock },
    { id: 'cookies', title: 'Cookies', icon: Globe },
    { id: 'children', title: 'Protection des mineurs', icon: Shield },
    { id: 'transfers', title: 'Transferts internationaux', icon: Globe },
    { id: 'changes', title: 'Modifications', icon: AlertTriangle },
    { id: 'contact', title: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.privacy-section');
      let current = '';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          current = section.id;
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="privacy-policy">
      {/* Page Header */}
      <div className="privacy-header">
        <div className="header-content">
          <div className="header-text">
            <div className="title-with-icon">
              <Shield size={32} />
              <h1>Politique de Confidentialité</h1>
            </div>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="privacy-container">
        {/* Sidebar Navigation - Desktop Only */}
        <aside className="privacy-sidebar">
          <div className="sidebar-header">
            <h3>Navigation</h3>
          </div>
          <nav className="sidebar-nav">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <Icon size={16} />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="privacy-main">

          {/* Introduction */}
          <div id="introduction" className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Chez Ecopower, nous nous engageons à protéger votre vie privée et vos données personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, stockons 
              et protégeons vos informations lorsque vous utilisez notre application mobile et nos services.
            </p>
            <p>
              En utilisant Ecopower, vous acceptez les pratiques décrites dans cette politique de confidentialité.
            </p>
          </div>

          {/* Data Collection */}
          <div id="data-collection" className="privacy-section">
            <h2>2. Données que nous collectons</h2>
            <p>Nous collectons différents types de données pour vous fournir nos services :</p>
            
            <div className="data-list">
              <div className="data-item">
                <h3>Données d'identification</h3>
                <ul>
                  <li>Nom complet</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse physique</li>
                </ul>
              </div>

              <div className="data-item">
                <h3>Données de compte</h3>
                <ul>
                  <li>Nom d'utilisateur</li>
                  <li>Mot de passe (chiffré)</li>
                  <li>Préférences de compte</li>
                  <li>Paramètres de notification</li>
                </ul>
              </div>

              <div className="data-item">
                <h3>Données d'utilisation</h3>
                <ul>
                  <li>Consommation électrique</li>
                  <li>Données de facturation</li>
                  <li>Historique des paiements</li>
                  <li>Statistiques d'utilisation</li>
                </ul>
              </div>

              <div className="data-item">
                <h3>Données techniques</h3>
                <ul>
                  <li>Adresse IP</li>
                  <li>Type d'appareil</li>
                  <li>Système d'exploitation</li>
                  <li>Données de localisation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div id="data-usage" className="privacy-section">
            <h2>3. Comment nous utilisons vos données</h2>
            <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>
            
            <ul className="usage-list">
              <li><strong>Fourniture de services :</strong> Gérer votre compte, générer des factures et fournir un support client</li>
              <li><strong>Communication :</strong> Envoyer des notifications importantes et répondre à vos demandes</li>
              <li><strong>Amélioration des services :</strong> Analyser l'utilisation et développer de nouvelles fonctionnalités</li>
              <li><strong>Sécurité et conformité :</strong> Protéger contre la fraude et respecter nos obligations légales</li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div id="data-sharing" className="privacy-section">
            <h2>4. Partage de données</h2>
            <p>
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, 
              sauf dans les cas suivants :
            </p>
            
            <ul className="sharing-list">
              <li><strong>Prestataires de services :</strong> Partenaires de confiance qui nous aident à fournir nos services</li>
              <li><strong>Obligations légales :</strong> Si la loi l'exige ou pour protéger nos droits</li>
              <li><strong>Consentement :</strong> Avec votre consentement explicite</li>
            </ul>
          </div>

          {/* Data Security */}
          <div id="data-security" className="privacy-section">
            <h2>5. Sécurité des données</h2>
            <p>
              Nous mettons en place des mesures de sécurité robustes pour protéger vos données :
            </p>
            
            <ul className="security-list">
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue de la sécurité</li>
              <li>Formation du personnel sur la protection des données</li>
              <li>Sauvegardes sécurisées</li>
            </ul>
          </div>

          {/* User Rights */}
          <div id="user-rights" className="privacy-section">
            <h2>6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            
            <ul className="rights-list">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div id="data-retention" className="privacy-section">
            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités 
              pour lesquelles elles ont été collectées :
            </p>
            
            <ul className="retention-list">
              <li><strong>Données de compte :</strong> 2 ans après la clôture de votre compte</li>
              <li><strong>Données de facturation :</strong> 7 ans conformément à la législation togolaise</li>
              <li><strong>Données d'utilisation :</strong> 1 an pour l'amélioration de nos services</li>
            </ul>
          </div>

          {/* Cookies */}
          <div id="cookies" className="privacy-section">
            <h2>8. Cookies et technologies similaires</h2>
            <p>
              Notre application mobile peut utiliser des technologies similaires aux cookies pour :
            </p>
            
            <ul className="cookies-list">
              <li>Mémoriser vos préférences</li>
              <li>Améliorer les performances</li>
              <li>Analyser l'utilisation de l'application</li>
              <li>Assurer la sécurité</li>
            </ul>
          </div>

          {/* Children Privacy */}
          <div id="children" className="privacy-section">
            <h2>9. Protection des mineurs</h2>
            <p>
              Notre service n'est pas destiné aux enfants de moins de 16 ans. Nous ne collectons 
              pas sciemment de données personnelles d'enfants de moins de 16 ans.
            </p>
          </div>

          {/* International Transfers */}
          <div id="transfers" className="privacy-section">
            <h2>10. Transferts internationaux</h2>
            <p>
              Vos données peuvent être transférées et traitées dans des pays autres que le Togo. 
              Nous nous assurons que ces transferts respectent les lois applicables en matière 
              de protection des données.
            </p>
          </div>

          {/* Changes */}
          <div id="changes" className="privacy-section">
            <h2>11. Modifications de cette politique</h2>
            <p>
              Nous pouvons modifier cette politique de confidentialité de temps à autre. 
              Nous vous informerons de tout changement important par e-mail ou via l'application.
            </p>
          </div>

          {/* Contact */}
          <div id="contact" className="privacy-section">
            <h2>12. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
              contactez-nous :
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={20} />
                <span>konouluc0@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>+228 97240460</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>Lomé, Togo</span>
              </div>
              <div className="contact-item">
                <Globe size={20} />
                <span>https://ecologis-web.vercel.app/</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;