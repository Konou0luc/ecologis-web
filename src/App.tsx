import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import MobileApp from './components/MobileApp';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import LegalInfo from './components/LegalInfo';
import GuideRapide from './components/GuideRapide';
import AdminApp from './admin/AdminApp';
import Login from './admin/pages/Login';
import { AuthProvider } from './admin/context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import SEO from './components/SEO';
import { generateHomePageSchema, generateBreadcrumbSchema, generateWebPageSchema } from './utils/seoUtils';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route pour le backoffice admin */}
            <Route path="/admin/*" element={
              <>
                <SEO
                  title="Administration | Ecopower"
                  description="Espace d'administration Ecopower"
                  canonical="/admin"
                  noindex={true}
                />
                <AdminApp />
              </>
            } />
            <Route path="/profile" element={
              <>
                <SEO
                  title="Profil | Ecopower"
                  description="Gérez votre profil Ecopower"
                  canonical="/profile"
                  noindex={true}
                />
                <AdminApp />
              </>
            } />
            <Route path="/settings" element={
              <>
                <SEO
                  title="Paramètres | Ecopower"
                  description="Paramètres de votre compte Ecopower"
                  canonical="/settings"
                  noindex={true}
                />
                <AdminApp />
              </>
            } />
            
            {/* Route pour la page de login */}
            <Route path="/login" element={
              <>
                <SEO
                  title="Connexion | Ecopower"
                  description="Connectez-vous à votre espace Ecopower"
                  canonical="/login"
                  noindex={true}
                />
              <AuthProvider>
                <Login />
              </AuthProvider>
              </>
            } />
            
            {/* Routes pour les pages légales */}
            <Route path="/privacy-policy" element={
              <>
                <SEO
                  title="Politique de Confidentialité | Ecopower"
                  description="Politique de confidentialité d'Ecopower. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD et aux lois togolaises."
                  canonical="/privacy-policy"
                  keywords="politique de confidentialité, protection des données, RGPD, vie privée, données personnelles, Ecopower"
                  jsonLd={[
                    generateWebPageSchema(
                      "Politique de Confidentialité - Ecopower",
                      "Politique de confidentialité d'Ecopower. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
                      "/privacy-policy"
                    ),
                    generateBreadcrumbSchema([
                      { name: "Accueil", url: "/" },
                      { name: "Politique de Confidentialité", url: "/privacy-policy" }
                    ])
                  ]}
                />
                <Header />
                <main>
                  <PrivacyPolicy />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            <Route path="/terms-of-service" element={
              <>
                <SEO
                  title="Conditions d'Utilisation | Ecopower"
                  description="Conditions générales d'utilisation de la plateforme Ecopower. Consultez les termes et conditions qui régissent l'utilisation de nos services de gestion de consommation électrique."
                  canonical="/terms-of-service"
                  keywords="conditions d'utilisation, CGU, termes de service, conditions générales, Ecopower, législation"
                  jsonLd={[
                    generateWebPageSchema(
                      "Conditions d'Utilisation - Ecopower",
                      "Conditions générales d'utilisation de la plateforme Ecopower. Consultez les termes et conditions qui régissent l'utilisation de nos services.",
                      "/terms-of-service"
                    ),
                    generateBreadcrumbSchema([
                      { name: "Accueil", url: "/" },
                      { name: "Conditions d'Utilisation", url: "/terms-of-service" }
                    ])
                  ]}
                />
                <Header />
                <main>
                  <TermsOfService />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            <Route path="/legal-info" element={
              <>
                <SEO
                  title="Informations Légales | Ecopower"
                  description="Informations légales et mentions légales d'Ecopower. Coordonnées du développeur, adresse et informations de contact."
                  canonical="/legal-info"
                  keywords="informations légales, mentions légales, entreprise, contact, Ecopower, Togo"
                  jsonLd={[
                    generateWebPageSchema(
                      "Informations Légales - Ecopower",
                      "Informations légales et mentions légales d'Ecopower. Coordonnées du développeur, adresse et informations de contact.",
                      "/legal-info"
                    ),
                    generateBreadcrumbSchema([
                      { name: "Accueil", url: "/" },
                      { name: "Informations Légales", url: "/legal-info" }
                    ])
                  ]}
                />
                <Header />
                <main>
                  <LegalInfo />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            <Route path="/guide-rapide" element={
              <>
                <SEO
                  title="Guide Rapide - Comment utiliser Ecopower | Tutoriel"
                  description="Guide rapide et tutoriel complet pour utiliser Ecopower. Découvrez comment gérer votre consommation électrique, créer des factures, ajouter des résidents et optimiser vos coûts énergétiques."
                  canonical="/guide-rapide"
                  keywords="guide rapide, tutoriel, aide, documentation, comment utiliser Ecopower, guide utilisateur, formation"
                  jsonLd={[
                    generateWebPageSchema(
                      "Guide Rapide - Ecopower",
                      "Guide rapide et tutoriel complet pour utiliser Ecopower. Découvrez comment gérer votre consommation électrique efficacement.",
                      "/guide-rapide"
                    ),
                    generateBreadcrumbSchema([
                      { name: "Accueil", url: "/" },
                      { name: "Guide Rapide", url: "/guide-rapide" }
                    ])
                  ]}
                />
                <Header />
                <main>
                  <GuideRapide />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            
            {/* Routes pour le site principal */}
            <Route path="/" element={
              <>
                <SEO
                  title="Ecopower - Gestion de Consommation Électrique | Solution Intelligente au Togo"
                  description="Application simple et efficace pour gérer votre consommation électrique au Togo. Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle sur vos dépenses."
                  canonical="/"
                  keywords="ecopower, gestion électrique, factures, consommation, énergie, Togo, Lomé, gestion résidentielle, suivi consommation, facturation automatique, gestion énergétique, économie d'énergie, consommation électrique Togo"
                  jsonLd={generateHomePageSchema()}
                />
                <Header />
                <main>
                  <Hero />
                  <Features />
                  <Pricing />
                  <Benefits />
                  <MobileApp />
                  <Contact />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            <Route path="/*" element={
              <>
                <SEO
                  title="Ecopower - Gestion de Consommation Électrique | Solution Intelligente au Togo"
                  description="Application simple et efficace pour gérer votre consommation électrique au Togo. Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle sur vos dépenses."
                  canonical="/"
                  keywords="ecopower, gestion électrique, factures, consommation, énergie, Togo, Lomé"
                />
                <Header />
                <main>
                  <Hero />
                  <Features />
                  <Pricing />
                  <Benefits />
                  <MobileApp />
                  <Contact />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;