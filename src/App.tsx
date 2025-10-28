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
import AdminApp from './admin/AdminApp';
import Login from './admin/pages/Login';
import { AuthProvider } from './admin/context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Route pour le backoffice admin */}
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/profile" element={<AdminApp />} />
            <Route path="/settings" element={<AdminApp />} />
            
            {/* Route pour la page de login */}
            <Route path="/login" element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            } />
            
            {/* Routes pour les pages légales */}
            <Route path="/privacy-policy" element={
              <>
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
                <Header />
                <main>
                  <LegalInfo />
                </main>
                <Footer />
                <ThemeToggle />
              </>
            } />
            
            {/* Routes pour le site principal */}
            <Route path="/" element={
              <>
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