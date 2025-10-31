import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Download, Play } from 'lucide-react';
import ImageModal from './ImageModal';
import './MobileApp.css';

const MobileApp: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Organiser les captures par catégorie
  const screenshots = {
    tableau_de_bord: [
      { src: '/assets/screens/dashboard.png', title: 'Tableau de bord principal', description: 'Vue d\'ensemble de votre consommation énergétique' },
      { src: '/assets/screens/dashboard1.png', title: 'Tableau de bord détaillé', description: 'Analyse approfondie des données' },
      { src: '/assets/screens/dashboard_gerant.png', title: 'Interface gérant', description: 'Gestion complète pour les administrateurs' },
      { src: '/assets/screens/dashboard_gerant1.png', title: 'Tableau de bord gérant avancé', description: 'Outils de supervision avancés' }
    ],
    consommation: [
      { src: '/assets/screens/consommation.png', title: 'Suivi consommation', description: 'Monitoring en temps réel' },
      { src: '/assets/screens/consommation1.png', title: 'Analyse détaillée', description: 'Historique et tendances' }
    ],
    facturation: [
      { src: '/assets/screens/facture.png', title: 'Facturation', description: 'Gestion des factures énergétiques' },
      { src: '/assets/screens/facture1.png', title: 'Détail facture', description: 'Analyse des coûts' },
      { src: '/assets/screens/facture2.png', title: 'Historique factures', description: 'Archives complètes' },
      { src: '/assets/screens/facture3.png', title: 'Paiements', description: 'Suivi des règlements' },
      { src: '/assets/screens/facture4.png', title: 'Rapports financiers', description: 'Analyses économiques' }
    ],
    gestion: [
      { src: '/assets/screens/gestion_residents.png', title: 'Gestion résidents', description: 'Administration des utilisateurs' },
      { src: '/assets/screens/gestion_residents1.png', title: 'Profil résident', description: 'Informations détaillées' },
      { src: '/assets/screens/gestion_residents2.png', title: 'Liste résidents', description: 'Vue d\'ensemble' },
      { src: '/assets/screens/gestion_factures.png', title: 'Gestion factures', description: 'Administration facturation' },
      { src: '/assets/screens/gestion_factures1.png', title: 'Création facture', description: 'Nouvelle facture' },
      { src: '/assets/screens/gestion_factures2.png', title: 'Modification facture', description: 'Édition des factures' },
      { src: '/assets/screens/gestion_factures3.png', title: 'Validation facture', description: 'Processus d\'approbation' },
      { src: '/assets/screens/gestion_factures4.png', title: 'Archives factures', description: 'Historique complet' }
    ],
    messagerie: [
      { src: '/assets/screens/messagerie.png', title: 'Messagerie', description: 'Communication interne' },
      { src: '/assets/screens/gestion_messagerie.png', title: 'Gestion messages', description: 'Administration des communications' },
      { src: '/assets/screens/gestion_messagerie1.png', title: 'Conversations', description: 'Historique des échanges' }
    ],
    releves: [
      { src: '/assets/screens/gestion_releves.png', title: 'Gestion relevés', description: 'Administration des mesures' },
      { src: '/assets/screens/gestion_releves1.png', title: 'Nouveau relevé', description: 'Saisie des données' },
      { src: '/assets/screens/gestion_releves2.png', title: 'Historique relevés', description: 'Archives des mesures' },
      { src: '/assets/screens/gestion_releves3.png', title: 'Validation relevés', description: 'Contrôle qualité' }
    ],
    profil: [
      { src: '/assets/screens/profile.png', title: 'Profil utilisateur', description: 'Informations personnelles' },
      { src: '/assets/screens/profile1.png', title: 'Paramètres compte', description: 'Configuration utilisateur' },
      { src: '/assets/screens/profile2.png', title: 'Préférences', description: 'Personnalisation' },
      { src: '/assets/screens/gerant_profile.png', title: 'Profil gérant', description: 'Interface administrateur' },
      { src: '/assets/screens/gerant_profile2.png', title: 'Paramètres gérant', description: 'Configuration avancée' },
      { src: '/assets/screens/gerant_profile3.png', title: 'Sécurité', description: 'Gestion des accès' },
      { src: '/assets/screens/gerant_profile4.png', title: 'Notifications', description: 'Préférences alertes' },
      { src: '/assets/screens/gerant_profile5.png', title: 'Support', description: 'Aide et assistance' }
    ]
  };

  const categories = Object.keys(screenshots);
  const currentCategory = categories[currentSlide];
  const currentScreenshots = screenshots[currentCategory as keyof typeof screenshots];

  // Fonction pour traduire les noms de catégories
  const getCategoryTitle = (category: string) => {
    const translations: { [key: string]: string } = {
      'tableau_de_bord': 'Tableau de bord',
      'consommation': 'Consommation',
      'facturation': 'Facturation',
      'gestion': 'Gestion',
      'messagerie': 'Messagerie',
      'releves': 'Relevés',
      'profil': 'Profil'
    };
    return translations[category] || category;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageClick = (screenshot: { src: string; title: string; description: string }) => {
    setSelectedImage(screenshot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="mobile-app-section">
      <div className="container">
        <div className="mobile-app-header">
          <div className="mobile-app-icon">
            <Smartphone size={48} />
          </div>
          <h2 className="mobile-app-title">Application Mobile</h2>
          <p className="mobile-app-description">
            Découvrez l'expérience Ecopower sur mobile avec une interface intuitive et des fonctionnalités complètes
          </p>
        </div>

        <div className="mobile-app-showcase">
          <div className="app-categories">
            <h3 className="category-title">{getCategoryTitle(currentCategory)}</h3>
            <div className="category-nav">
              <button className="nav-btn prev" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </button>
              <button className="nav-btn next" onClick={nextSlide}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="screenshots-gallery">
            <div className="screenshots-container">
              {currentScreenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item" onClick={() => handleImageClick(screenshot)}>
                  <div className="screenshot-frame">
                    <img 
                      src={screenshot.src} 
                      alt={screenshot.title}
                      className="screenshot-image"
                      loading="lazy"
                    />
                    <div className="screenshot-overlay">
                      <div className="screenshot-info">
                        <h4 className="screenshot-title">{screenshot.title}</h4>
                        <p className="screenshot-description">{screenshot.description}</p>
                      </div>
                      <div className="screenshot-actions">
                        <button className="action-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(screenshot);
                        }}>
                          <Play size={16} />
                        </button>
                        <button className="action-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(screenshot);
                        }}>
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="category-indicators">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                {getCategoryTitle(category)}
              </button>
            ))}
          </div>
        </div>

        <div className="mobile-app-features">
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Smartphone size={24} />
              </div>
              <h4>Interface Intuitive</h4>
              <p>Design moderne et ergonomique pour une expérience utilisateur optimale</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Play size={24} />
              </div>
              <h4>Temps Réel</h4>
              <p>Monitoring instantané de votre consommation énergétique</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Download size={24} />
              </div>
              <h4>Données Synchronisées</h4>
              <p>Synchronisation automatique entre tous vos appareils</p>
            </div>
          </div>
        </div>

        <div className="mobile-app-cta">
          <h3>Téléchargez l'application Ecopower</h3>
          <p>Disponible sur iOS et Android</p>
          <div className="download-buttons">
            <button className="download-btn ios">
              <Smartphone size={20} />
              <span>Télécharger pour iOS</span>
            </button>
            <button className="download-btn android">
              <Smartphone size={20} />
              <span>Télécharger pour Android</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal pour afficher l'image en taille réelle */}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      )}
    </section>
  );
};

export default MobileApp;
